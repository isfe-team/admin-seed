import Vue from 'vue'
import Router from 'vue-router'
import CommonWrapper from '@/components/common/CommonWrapper'

import Eggsplant from '@/components/vegetables/Eggsplant'
import Broccoli from '@/components/vegetables/Broccoli'
import Corn from '@/components/vegetables/Corn'
import EggsplantDatil from '@/components/vegetables/EggsplantDetail'

import Apple from '@/components/fruit/Apple'
import Banana from '@/components/fruit/Banana'
import Orange from '@/components/fruit/Orange'

Vue.use(Router)

export const projectRouter = ({
  routes: [
    {
      path: '/vegetables',
      name: '',
      component: CommonWrapper,
      meta: { label: '蔬菜' },
      children: [
        {
          path: '/',
          redirect: 'broccoli'
        },
        {
          path: 'broccoli',
          name: 'vegetables::broccoli',
          component: Broccoli,
          meta: { label: '西兰花' }
        },
        {
          path: 'corn',
          name: 'vegetables::corn',
          component: Corn,
          meta: { label: '玉米' }
        },
        {
          path: 'eggsplant',
          name: 'vegetables::eggsplant',
          component: CommonWrapper,
          meta: { label: '茄子' },
          children: [
            {
              path: 'use',
              name: 'vegetables::eggsplant::use',
              component: Eggsplant,
              meta: { label: '用处' }
            },
            {
              path: 'detail',
              name: 'vegetables::eggsplant::detail',
              component: EggsplantDatil,
              meta: { label: '简介' }
            }
          ]
        },
        {
          path: '*',
          redirect: 'broccoli'
        }
      ]
    },
    {
      path: '/fruit',
      name: '',
      component: CommonWrapper,
      meta: { label: '水果' },
      children: [
        {
          path: 'apple',
          name: 'fruit::apple',
          component: Apple,
          meta: { label: '苹果' }
        },
        {
          path: 'banana',
          name: 'fruit::banana',
          component: Banana,
          meta: { label: '香蕉' }
        },
        {
          path: 'orange',
          name: 'fruit::orange',
          component: Orange,
          meta: { label: '橘子' }
        }
      ]
    },
    {
      path: '*',
      redirect: './vegetables'
    }
  ]
})
export default new Router(projectRouter)
