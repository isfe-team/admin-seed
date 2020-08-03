import '@/polyfills'
import Vue from 'vue'
import Login from './Login.vue'
import '@/components/registerAntDesignVueComponents'
import './login.less'
import { i18n, defaultLocale } from '@/components/common/i18n/setup'
import withI18n from '@/components/common//i18n/withI18n'
import store from '@/store'

Vue.config.productionTip = false
const config = window.config
const lang = config.lang ? config.lang : defaultLocale

const I18nApp = withI18n(Login)

new Vue({
  i18n,
  store,
  render () {
    return <I18nApp lang={lang} />
  }
}).$mount('#login')
