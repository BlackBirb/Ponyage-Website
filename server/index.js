const config = require("./config.json")
const app = require("./app")

app.listen(config.port, () => console.log("App is listening on port " + config.port))
