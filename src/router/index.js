import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import routerConfig from './config'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router(routerConfig)

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done(true)
})

export default router
