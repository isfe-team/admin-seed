import Vue from 'vue'
import Login from './Login.vue'
import './login.less'
import Antd from 'ant-design-vue'
import store from '@/store'

Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  store,
  render: h => h(Login)
}).$mount('#login')
