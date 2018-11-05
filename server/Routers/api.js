const { Router } = require("express")
const multer = require("multer")
const store = require("../store").default
const middleware = require("../Middleware")

const storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, './public/static/img/articles')
  },
  filename: function (req, file, next) {
    next(null, `${Date.now()}-${file.fieldname === 'thumbnail' ? 'thumbnail_' : ''}${file.originalname}`)
  }
})

var upload = multer({ storage: storage })

const api = Router()

api.get("/ping", (req, res) => {
  res.status(200).json({
    pong: Date.now()
  })
})

api.get("/data/main", store.actions.resWithData('main'))
api.get("/data/articles", store.actions.resWithData('articles'))

api.post("/updatePlayerCount", (req, res) => {
  const { body } = req
  if(!body || !body.hasOwnProperty('playerCount') || isNaN(body.playerCount)) return res.status(400).json({ e: "Invalid body" })
  if(body.status !== 'horny dragon') return res.status(401).json({ e: "Heck you" })
  res.status(200).send(`Playercount set to ${body.playerCount}`)
  store.actions.updatePlayerCount(Number(body.playerCount))
})

api.get("/playerCount", (req, res) => {
  res.status(200).json({
    playerCount: store.data.playerCount
  })
})

api.post('/user/register', middleware.accounts.checkRegisterToken, middleware.accounts.register)

api.post('/user/login', middleware.accounts.login)

api.post("/user/token", middleware.authenticate, (req, res) => {
  res.status(200).json({
    ...req.user,
    success: true
  })
})

api.post("/test", middleware.authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    it: "worked!",
    timestamp: Date.now()
  })
})

api.post('/articles/add', 
  middleware.authenticate, 
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),
  middleware.articles.add)

api.delete('/articles/remove',
  middleware.authenticate,
  middleware.articles.remove)

module.exports = api