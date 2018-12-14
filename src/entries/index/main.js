import Vue from 'vue'
import App from './App'
import router from '@/router'
import Antd from 'ant-design-vue'
import store from '@/store'
import '@/registerServiceWorker'
import './index.less'

Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
