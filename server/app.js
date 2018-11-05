const express = require("express")
const bodyParser = require('body-parser')
const compression = require('compression')
const { static } = express
const path = require("path")
const API = require("./Routers/api")

const app = express()

app.disable('x-powered-by');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(compression())

app.use("/", static(path.resolve(__dirname, '../public/')))
app.use('/api', API)
app.use("*", static(path.resolve(__dirname, '../public/')))

module.exports = app
