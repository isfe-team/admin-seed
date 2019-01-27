import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import routerConfig from './config'
import 'nprogress/nprogress.css'
import { axiosArr } from '@/apis'

Vue.use(Router)

const router = new Router(routerConfig)

router.beforeEach((to, from, next) => {
  if (axiosArr) {
    axiosArr.forEach((cancel, index) => {
      cancel()
      axiosArr.splice(index, 1)
    })
  }
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done(true)
})

export default router
