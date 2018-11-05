// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store'
// import registerServiceWorker from './registerServiceWorker'

import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#536bc3',
    secondary: '#5279c2'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
// registerServiceWorker()

const token = localStorage.getItem('token')
if (token) {
  store.dispatch('login', { token })
    .catch(err => {
      console.log('error while loggin in using token in local storage:')
      console.error(err)
    })
}

store.dispatch('loadMainData')
store.dispatch('getPonyCount')

let lastUpdate = Date.now()
window.addEventListener('focus', evn => {
  if ((Date.now() - lastUpdate) >= 60000) { // max every minute
    lastUpdate = Date.now()
    store.dispatch('getPonyCount')
  }
})
