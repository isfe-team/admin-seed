import Vue from 'vue'
import '@/components/registerAntDesignVueComponents'
import App from './App'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'
import './index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
