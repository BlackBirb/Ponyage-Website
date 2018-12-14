const store = require('../store').default

module.exports = {
  add (req, res) {
    const { title, description: content } = req.body
    let image = null
    let thumbnail = null
    if(req.files) {
      if(req.files.image) {
        image = req.files.image[0]
        if(req.files.thumbnail) {
          thumbnail = req.files.thumbnail[0]
        }
      }
    }
    const responseData = {}
    if(title) responseData.title = title
    if(content) responseData.content = content
    if(image) responseData.image = image.filename
    if(thumbnail) responseData.thumbnail = thumbnail.filename
    if(Object.keys(responseData).length < 1) 
      return res.status(400).json({ e: 'Invalid body'})
    console.log('new article',responseData)

    store.actions.article.add(responseData)

    res.status(200).json({
      success: true,
      ...responseData
    })
  },
  remove (req, res) {
    if(!req.body.hasOwnProperty('id'))
      return res.status(400).json({ e: 'Invalid body' })
    const { id } = req.body
    console.log('remove article ',id)
    let result = store.actions.article.remove(id)
    
    if(result) {
      res.status(200).json({
        success: true,
        removed: id
      })
    } else {
      res.status(500).json({
        e: 'Article doesn\'t exists'
      })
    }
  }
}