const store = require("../store").default
const token = require('../config.json').token

module.exports = {
  checkRegisterToken(req, res, next) {
    if(!req.body.hasOwnProperty('rt')) // registerToken
      return res.status(500).json({ e: "invalid token" })
    const { rt: registerToken } = req.body
    if(registerToken === token) 
      return next()
    return res.status(500).json({ e: "invalid token" })
  },
  register(req, res) {
    const { body } = req
    if(!body.hasOwnProperty('l') || !body.hasOwnProperty('p')) 
      return res.status(500).json({ e: 'invalid body' })
    const { l: login, p: password } = req.body
    store.actions.createUser({ login, password })
      .then(() =>
        store.actions.createSession(login)
      )
      .then(({ token, expiresAt }) => 
        res.status(200).json({
          success: true,
          token,
          expiresAt
        })
      )
      .catch(err => {
        if(err === 'exists') return res.status(500).json({ e: 'user already exists' })
        else console.log(err)
      })
  },
  login(req, res) {
    const { body } = req
    const credentials = {}
    if(body.hasOwnProperty('l') && body.hasOwnProperty('p')) {
      credentials.login = body.l
      credentials.password = body.p
    }
    else 
      return res.status(500).json({ e: 'invalid body' })
    
    store.actions.loginUser(credentials)
      .then(() =>
        store.actions.createSession(credentials.login)
      )
      .then(({ token, expiresAt }) => 
        res.status(200).json({
          success: true,
          token,
          expiresAt
        })
      )
      .catch(err => {
        if(err === false)
          return res.status(500).json({
            e: 'invalid login or password'
          })
        else console.log(err)
      })
  }
}