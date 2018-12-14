const db = require("./db/db")
const fs = require("fs")
let timeout = null

module.exports = function(data) {
  return {
    resWithData (name) {
      return (req, res) => res.status(200).json(data[name]) 
    },
    updatePlayerCount (amount = null) {
      data.playerCount = amount
      if(timeout)
        clearTimeout(timeout)
      timeout = setTimeout(() => {
        data.playerCount = null
        timeout = null
      }, 60000)
    },
    createUser (credentials) {
      return db.register(credentials)
    },
    loginUser (credentials) {
      return db.login(credentials)
    },
    createSession (login) {
      return db.createSession(login)
    },
    checkSession (token) {
      return db.checkSession(token)
    },
    article: {
      getArticleID () {
        let id = 0
        data.articles.find(a => {
          id = a.id > id ? a.id : id
        })
        return id
      },
      getArticleDateNow () {
        return new Date().toISOString().split("T")[0]
      },
      add(article = {}) {
        if(!article.id) article.id = this.getArticleID() + 1
        // data.articles.push(article)
        let newFile = [
          ...data.articles,
          {
            id: this.getArticleID(),
            ...article,
            date: this.getArticleDateNow()
          }
        ]
        const string = JSON.stringify(newFile)
        fs.writeFileSync('./data/articles.json', string, err => console.log(err))
      },
      remove(id) {
        const article = data.articles.find(a => a.id === id)
        if(!article) return false
        let newFile = data.articles.filter(a => a.id !== id)
        for(const file of [ article.image, article.thumbnail ]) {
          console.log(file)
          if(file) 
            fs.unlink(`./public/static/img/articles/${file}`, 
             err => err ? console.log(`Error while deleting file "${file}": ${err}`) : null
            )
        }

        const string = JSON.stringify(newFile)
        fs.writeFileSync('./data/articles.json', string, err => console.log(err))
        return true
      }
    },
    version: {
      json(req, res) {
        res.status(200).json(data.versions)
      },
      text(req, res, opt) {
        let textBody = 'Arch DB-Version DB-MD5 Game-Version Game-MD5 UpdateURL'
        const columns = ["DBVersion", "DBMD5", "GameVersion", "GameMD5", "UpdateURL"]
        for(const [ arch, val ] of Object.entries(data.versions)) {
          textBody += opt.newLine + arch
          for(const column of columns) {
            textBody += opt.separator + (val[column] || opt.nullChar)
          }
        }

        return res.status(200)
          .send(textBody)
      },
      update(req, res) {
        if(!req.body) 
          return res.status(400).json({ e: 'invalid body' })
        // this feels weird...
        const string = JSON.stringify(req.body)
        // ooh it's sync so it won't read half written file... ok me, that's.. working
        fs.writeFileSync('./data/version.json', string, err => {
          console.log(err)
          return res.status(500).json({ e: err })
        })
        data.versions = req.body
        res.status(200).json({ updated: req.body })
      }
    }
  }
}