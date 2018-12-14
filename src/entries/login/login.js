import Vue from 'vue'
import Antd from 'ant-design-vue'
import Login from './Login.vue'
import './login.less'

Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  render: h => h(Login)
}).$mount('#login')
