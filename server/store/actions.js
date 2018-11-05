const db = require("./db/db")
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
    }
  }
}