export default {
  login (state, payload) {
    state.logged = true
    state.username = payload.username
    state.token = payload.token
    localStorage.setItem('token', payload.token)
  },
  logout (state) {
    state.logged = false
    state.username = null
    state.token = null
    localStorage.setItem('token', null)
  },
  addArticle (state, payload) {
    let newArticles = [
      ...state.articles,
      payload
    ]
    state.articles = newArticles.sort((a, b) => a.id < b.id)
  },
  removeArticle (state, id) {
    let newArticles = state.articles.filter(a => a.id !== id)
    state.articles = newArticles
  },
  setArticles (state, payload) {
    if (payload === null) {
      state.articles = []
      state.articlesErrored = true
    } else
      state.articles = payload
  },
  setContactInfo (state, payload) {
    state.contact = payload
  },
  setContributors (state, payload) {
    state.contributors = payload
  },
  setDownload (state, payload) {
    state.downloadable = payload
  },
  setFAQ (state, payload) {
    state.faq = payload
  },
  dataErrored (state, payload = true) {
    state.dataErrored = payload
  },
  setServerStatus (state, payload) {
    state.serverStatus = payload
  },
  setHomeVid (state, payload) {
    if (payload === null) {
      state.homeVideo = null
      return
    }
    state.homeVideo = 'https://www.youtube.com/embed/' + payload
  },
  setVersionData (state, payload) {
    if (!payload) {
      state.versionFile = payload
      return
    }
    const deepClone = {}
    for (const arch of Object.keys(payload)) {
      deepClone[arch] = Object.assign({}, payload[arch])
    }

    state.versionFile = deepClone
  }
}
