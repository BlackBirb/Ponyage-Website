const store = require("../store").default
const accounts = require('./accounts')
const articles = require('./articles')

module.exports = {
  accounts,
  articles,
  authenticate(req, res, next) {
    if(!req.headers.hasOwnProperty('authorization'))
      return res.status(401).json({ e: "No authorization" })
    const token = req.headers['authorization']
    store.actions.checkSession(token)
      .then(data => {
        req.user = data
        next()
      })
      .catch(err => {
        switch(err) {
          case "invalid": {
            return res.status(401).json({ e: "Invalid token" })
          } 
          case "expired": {
            return res.status(440).json({ e: "Session expired" })
          }
          default: {
            res.status(500).json({ e: err })
          }
        }
      })
  }
}