// Be care, you should import this before `Components` if you use class component and import styles
// If not, some styles of ant-design-vue components will be strange.
import './index.less'
import '@/polyfills'
import Vue from 'vue'
import '@/components/registerAntDesignVueComponents'
import App from './App'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
