const fs = require("fs")
const Actions = require("./actions")

function Store() {
  const data = {
    playerCount: null,
    main: require("../../data/main.json"),
    versions: require("../../data/version.json"),
    articles: require("../../data/articles.json")
  }

  // json data files reloading
  let ratelimit = false // fuc you fs
  fs.watch("./data/", (eventType, filename) => {
    if (ratelimit) return;
    ratelimit = true
    if (eventType === "change") {
      let path = `../../data/${filename}`
      delete require.cache[require.resolve(path)]
      try {
        let newData = require(path)
        data[filename.replace(/\.json$/gi, "")] = newData
      } catch (err) {
        console.error('failed to load new data from file', err)
      }
      console.log("New data from",filename,"loaded!")
    }
    setTimeout(() => ratelimit = false, 1000)
  })

  return {
    data,
    actions: Actions(data)
  }
}

const store = Store()

module.exports = {
  default: store,
  func: Store
}