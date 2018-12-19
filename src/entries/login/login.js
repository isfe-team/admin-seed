import Vue from 'vue'
import Login from './Login.vue'
import '@/components/registerAntDesignVueComponents'
import './login.less'

Vue.config.productionTip = false

new Vue({
  render: h => h(Login)
}).$mount('#login')
