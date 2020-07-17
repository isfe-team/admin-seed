import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    locale: null,
    antLocale: null
  },
  mutations: {
    SET_USER_INFO (state, o) {
      state.userInfo = o
    },
    SET_LOCALE (state, o) {
      state.locale = o
    },
    SET_ANT_LOCALE (state, o) {
      state.antLocale = o
    }
  },
  actions: {
    setLocale ({ commit }, o) {
      commit('SET_LOCALE', o)
    },
    setUserInfo ({ commit }, o) {
      commit('SET_USER_INFO', o)
    },
    setAntLocaleInfo ({ commit }, lang) {
      return import(
        `ant-design-vue/lib/locale-provider/${lang}`
      ).then((locale) => {
        commit('SET_ANT_LOCALE', locale)
      })
    }
  },
  getters: {
    userInfo: (state) => state.userInfo,
    locale: (state) => state.locale,
    antLocale: (state) => state.antLocale
  }
})
