// Be care, you should import this before `Components` if you use class component and import styles
// If not, some styles of ant-design-vue components will be strange.
import './index.less'
import '@/polyfills'
import Vue from 'vue'
import qs from 'qs'
import '@/components/registerAntDesignVueComponents'
import App from './App'
import router from '@/router'
import store from '@/store'
import { i18n, defaultLocale } from '@/components/common/i18n/setup'
import withI18n from '@/components/common//i18n/withI18n'
import '@/registerServiceWorker'

Vue.config.productionTip = false
const config = window.config
const lang = config.lang ? config.lang : defaultLocale
const urlConfig = qs.parse(location.search.slice(1))
const injected = Boolean(urlConfig.injected) || false

// injected模式下给body增加样式
if (injected) {
  document.getElementsByTagName('body')[0].className = 'inject-body'
}

const I18nApp = withI18n(App)

new Vue({
  router,
  store,
  i18n,
  render () {
    return <I18nApp lang={lang} />
  }
}).$mount('#app')
