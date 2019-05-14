import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import routerConfig from './config'

Vue.use(Router)

const router = new Router(routerConfig)

router.beforeEach((to, from, next) => {
  const notOnline = localStorage.getItem('$$online') !== '1'
  if (notOnline) {
    const noNeedAuth = to.meta.noNeedAuth
    if (!noNeedAuth) {
      next({ name: 'login' })
      return
    }
  }
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done(true)
})

export default router
