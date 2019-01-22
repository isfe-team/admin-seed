import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  mutations: {
    SET_USER_INFO (state, o) {
      state.userInfo = o
    }
  },
  actions: {
    setUserInfo ({ commit }, o) {
      commit('SET_USER_INFO', o)
    }
  }
})
