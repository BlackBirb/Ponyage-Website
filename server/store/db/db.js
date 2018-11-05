const bcrypt = require('bcrypt')
const crypto = require("crypto")
const init = require("./initialize.js")

const saltRounds = 12
const autoSaltRounds = 10

const knex = require("knex")({
  client: 'sqlite3',
  connection: {
    filename: "./server/store/db/sqlite.db"
  },
  useNullAsDefault: true
});

init(knex)

const findUser = login => {
  return knex('users').select('*').where({ login })
    .then(row => {
      console.log(row)
      if(row[0]) return true
      throw false
    })
}

const genToken = (length = 32) => {
  return new Promise(resolve => {
    process.nextTick(() => { // make it async lmao
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const bytes = crypto.randomBytes(length)
      const res = new Array(length)
      let cursor = 0
      for(let i = 0; i<length; i++) {
        cursor += bytes[i]
        res[i] = chars[cursor % chars.length]
      }
      resolve(res.join(""))
    })
  })
}

module.exports = {
  register: credentials => {
    const { login, password } = credentials
    return new Promise((resolve, reject) => {
      knex('users').select('*').where({ login })
        .then(rows => {
          if(rows[0])
            return reject('exists')
          else {
            bcrypt.genSalt(saltRounds)
              .then(salt =>
                bcrypt.hash(password+salt, autoSaltRounds)
                  .then(hash => 
                    knex('users').insert({
                      login,
                      hash,
                      salt
                    })
                  )
              ) // callback hell with promises... kms
              .then(resolve)
              .catch(reject)
          }
        })
    })
  },
  login: credentials => {
    const { login, password } = credentials
    return knex('users').select('*').where({ login })
      .then( (rows) => {
        if(rows[0]) {
          const { hash, salt } = rows[0]
          return bcrypt.compare(password+salt, hash)
        }
        else throw false
      })
      .then(correct => {
        if(correct) return true
        throw false
      })
  },
  createSession: login => {
    const createdAt = Date.now()
    const expiresAt = createdAt + 24 *3600000 // 24h
    return new Promise((resolve, reject) => {
      genToken().then(token => {
        knex('sessions').select('*').where({ login })
          .then(rows => {
            console.log("Exists?", login, rows)
            if(rows[0])
              return knex('sessions').where({ login }).update({ createdAt, expiresAt, token })
            else
              return knex('sessions').insert({ login, createdAt, expiresAt, token })
          })
          .then(() => {
            resolve({ token, expiresAt })
          })
          .catch(reject)
      })
    })
  },
  checkSession: token => {
    const now = Date.now()
    return new Promise((resolve, reject) => {
      knex('sessions').select('*').where({ token })
        .then(rows => {
          if(!rows[0])
            return reject('invalid')
          if(rows[0].expiresAt < now)
            return reject('expired')
          resolve(rows[0])
        })
    })
  }
}