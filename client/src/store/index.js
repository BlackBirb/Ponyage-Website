import Vuex from 'vuex'
import Vue from 'vue'
import state from './State'
import mutations from './Mutations'
import actions from './Actions'
import getters from './Getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
