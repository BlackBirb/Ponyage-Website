const fs = require("fs")
const Actions = require("./actions")

function Store() {
  const data = {
    playerCount: null,
    main: require("../../data/main.json"),
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
    dataActions: {
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
      addArticle(article = {}) {
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
      removeArticle(id) {
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
    actions: Actions(data)
  }
}

const store = Store()

module.exports = {
  default: store,
  func: Store
}