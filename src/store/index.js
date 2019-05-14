import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo, getMenu } from '@/apis/services/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    menus: [],
    locale: null,
    antdLocale: null
  },
  mutations: {
    SET_USER_INFO (state, o) {
      state.userInfo = o
    },
    SET_MENU (state, o) {
      state.menus = o
    },
    SET_LOCALE (state, o) {
      state.locale = o
    },
    SET_ANTD_LOCALE (state, o) {
      state.antdLocale = o
    }
  },
  actions: {
    loadUserInfo ({ commit }) {
      return getUserInfo().then((user) => {
        commit('SET_USER_INFO', user)
        return user
      })
    },
    loadMenuData ({ commit }, lang) {
      return getMenu(lang).then((menuResponseData) => {
        const menus = menuResponseData.data[0].childList
        commit('SET_MENU', menus)
        return menus
      })
    },
    loadAntdLocale ({ commit }, lang) {
      return import(
        /* webpackInclude: /[a-z]{2}_[A-Z]{2}\.js$/ */
        /* webpackChunkName: "antd-locale-[request]" */
        `ant-design-vue/lib/locale-provider/${lang}.js`
      ).then((locale) => {
        commit('SET_ANTD_LOCALE', locale.default)
      })
    }
  }
})
