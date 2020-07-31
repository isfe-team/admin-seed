import Vue from 'vue'
import App from './app.vue'
import store from '@/store'
import router from '@/router'
import antd from 'ant-design-vue'
import './styles/index.less'
Vue.use(antd)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
