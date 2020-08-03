import Vue from 'vue'
import Vuex from 'vuex'
import { getMenus } from '@/apis/services/user'
import qs from 'qs'

Vue.use(Vuex)
const urlConfig = qs.parse(location.search.slice(1))
const injected = Boolean(urlConfig.injected) || false

function dealMenu (menus) {
  return menus.map((x) => {
    // 判断是否有波浪号，有作为内嵌应用使用
    const backUrl = x.url
    const tildeIndex = backUrl.indexOf('~')
    if (tildeIndex !== -1) {
      const realUrl = x.url = backUrl.slice(0, tildeIndex)
      x.url = realUrl
      x.originUrl = backUrl
      x.vendorUrl = backUrl.slice(tildeIndex + 1) || window.config.dataBaiduUrl
    }
    if (x.childList.length) {
      x.childList = dealMenu(x.childList)
    }
    return x
  })
}

export default new Vuex.Store({
  state: {
    userInfo: null,
    locale: null,
    antLocale: null,
    menus: [],
    injected: injected
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
    },
    SET_MENUS (state, o) {
      state.menus = o
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
    },
    loadMenus ({ commit }, o) {
      return getMenus().then((menuResponse) => {
        const menus = dealMenu(menuResponse.data[0].childList)
        // 拿到菜单以后处理一下
        console.log(menus)
        commit('SET_MENUS', menus)
      })
    }
  },
  getters: {
    userInfo: (state) => state.userInfo,
    locale: (state) => state.locale,
    antLocale: (state) => state.antLocale,
    menus: (state) => state.menus,
    injected: (state) => state.injected
  }
})
