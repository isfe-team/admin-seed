// Be care, you should import this before `Components` if you use class component and import styles
// If not, some styles of ant-design-vue components will be strange.
import './index.less'
import '@/polyfills'
import Vue from 'vue'
import qs from 'qs'
import FullscreenSpin from '@/components/common/FullscreenSpin'
import { i18n, defaultLocale } from '@/i18n/setup'
import withI18n from '@/i18n/withI18n'
import '@/components/registerAntDesignVueComponents'
import VueDraggableResizable from 'vue-draggable-resizable'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'
import App from './App'

Vue.config.productionTip = false
Vue.component('vue-draggable-resizable', VueDraggableResizable)

const urlConfig = qs.parse(location.search.slice(1))
const lang = urlConfig.locale || defaultLocale

const I18nApp = withI18n(App, FullscreenSpin)
const app = window.x = new Vue({
  router,
  store,
  i18n,
  render () {
    return <I18nApp lang={lang} />
  } // h => h(App)
}).$mount('#app')

export default app
