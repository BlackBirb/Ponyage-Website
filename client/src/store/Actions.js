import * as api from '../api'

function fixImagePath (name, path = '') {
  if (!name) return null
  if (name.startsWith('http')) return name
  return `/static/img${path}/${name}`
}

const avaibleIcons = new Map([
  [ 'discord', 'white' ],
  [ 'twitter', 'light-blue' ],
  [ 'facebook', 'light-blue' ],
  [ 'github', 'white' ],
  [ 'youtube', 'red' ],
  [ 'tumblr', 'white' ]
])

function addIcon (title) {
  if (avaibleIcons.has(title.toLowerCase()))
    return { name: `fab fa-${title.toLowerCase()}`, color: avaibleIcons.get(title.toLowerCase()) }
  return null
}

export default {
  logout ({ commit }) {
    // api call to logout
    commit('logout')
  },
  login ({ commit }, payload) {
    if (payload.token) {
      return api.loginWithToken(payload)
        .then(data => {
          commit('login', data)
        })
    } else if (payload.username && payload.password) {
      return api.login(payload)
        .then(data => {
          commit('login', data)
        })
    }
  },
  register ({ commit }, payload) {
    return api.register(payload).then(data => {
      commit('login', data)
      return data
    })
  },
  getPonyCount ({ commit }) {
    return api.getPlayerCount()
      .then(data => {
        if (!data.hasOwnProperty('playerCount') || isNaN(data.playerCount)) data.playerCount = null
        commit('setServerStatus', data.playerCount)
      })
      .catch(() => {
        commit('setServerStatus', null)
      })
  },

  addArticle ({ commit }, payload) {
    console.log(payload)
    if (payload.image)
      payload.image = fixImagePath(payload.image, '/articles')
    if (payload.thumbnail)
      payload.thumbnail = fixImagePath(payload.thumbnail)
    if (payload.date) {
      let date = new Date(payload.date)
      if (date)
        payload.date = date.toString().slice(0, 15).replace(' ', ', ')
    }
    commit('addArticle', payload)
  },

  removeArticle ({ commit }, payload) {
    return api.removeArticle(payload.id, payload.token)
      .then(() => {
        commit('removeArticle', payload.id)
      })
  },

  loadArticles ({ commit }) {
    return api.getArticles()
      .then(data => {
        commit(
          'setArticles',
          data.map((a) => {
            a.image = fixImagePath(a.image, '/articles')
            if (a.thumbnail)
              a.thumbnail = fixImagePath(a.thumbnail, '/articles')
            if (a.date) {
              let date = new Date(a.date)
              if (date)
                a.date = date.toString().slice(0, 15).replace(' ', ', ')
            }
            return a
          }).sort((a, b) => b.id - a.id)
        )
      })
      .catch(err => {
        console.log('News Fetch Error', err)
        commit('setArticles', null)
      })
  },

  loadMainData ({ commit }) {
    return api.getMainData()
      .then(data => {
        commit('setDownload', data.downloadable)

        commit('setContactInfo', data.contact.map((c, i) => {
          c.id = i
          let icon = addIcon(c.title)
          c.icon = icon ? icon.name : null
          return c
        }))

        commit(
          'setContributors',
          data.contributors.map((c, i) => {
            c.id = i
            c.icon = fixImagePath(c.icon, '/contributors')
            if (c.contact) {
              for (const contact of c.contact) {
                let icon = addIcon(contact.name)
                contact.name = icon.name
                contact.color = icon.color
              }
            }
            return c
          })
        )

        commit(
          'setFAQ',
          data.faq.map((q, i) => {
            q.id = i
            q.image = fixImagePath(q.image, '/faq')
            return q
          })
        )
        commit(
          'setHomeVid',
          data.homeVideo
        )
      })
      .catch(err => {
        console.error('Webpage loading error!', err)
        commit('dataErrored')
      })
  },
  loadVersionFile ({ commit }) {
    return api.loadVersionData()
      .then(data => {
        commit('setVersionData', data)
      })
      .catch((err) => {
        console.error('Failed loading version file!', err)
        commit('setVersionData', false)
      })
  },
  updateVersionFile ({ commit }, payload) {
    return api.updateVersionData(payload.data, payload.token)
      .then(data => {
        commit('setVersionData', data.updated)
      })
      .catch((err) => {
        throw err // wtf?
      })
  }
}
