import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import routerConfig from './config'

Vue.use(Router)

const router = new Router(routerConfig)

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (!sessionStorage.getItem('token') && to.name !== 'login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done(true)
})

export default router
