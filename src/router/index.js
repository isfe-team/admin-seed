import Vue from 'vue'
import Router from 'vue-router'
import pick from 'lodash/pick'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routerConfig from './config'

Vue.use(Router)

const router = new Router(routerConfig)

function pickUsefulRouteInfo (route) {
  return pick(route, ['name', 'path', 'fullPath'])
}

router.beforeEach((to, from, next) => {
  console.log('ROUTER_BEFORE_EACH', to, from, next)
  parent.postMessage({
    type: 'ROUTER_BEFORE_EACH',
    payload: {
      // 需要Pick，不然有函数会出现问题
      to: pickUsefulRouteInfo(to),
      from: pickUsefulRouteInfo(from)
    }
  }, '*')
  NProgress.start()
  next()
})
router.afterEach((to, from) => {
  console.log('ROUTER_AFTER_EACH', to, from)
  parent.postMessage({
    type: 'ROUTER_AFTER_EACH',
    payload: {
      to: pickUsefulRouteInfo(to),
      from: pickUsefulRouteInfo(from)
    }
  }, '*')
  NProgress.done(true)
})

export default router
