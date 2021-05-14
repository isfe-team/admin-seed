import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo, getMenu, getLangs } from '@/apis/services/user'
import { transformTo } from '@/i18n/setup'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    menus: [],
    locale: null,
    antdLocale: null,
    languages: []
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
    },
    SET_LANGS_OPTIONS (state, o) {
      state.languages = o
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
        let menus = menuResponseData.data[0].childList
        function transformMenus (menus) {
          return menus.map((x) => {
            x.name = transformTo(x.labelI18nKey)
            if (x.childList && x.childList.length) {
              x.childList = transformMenus(x.childList)
            }
            return x
          })
        }
        menus = transformMenus(menus)
        commit('SET_MENU', menus)
        return menus
      })
    },
    loadLangs ({ commit }) {
      return getLangs().then((data) => {
        commit('SET_LANGS_OPTIONS', data)
        return data
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
