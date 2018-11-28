import Vue from 'vue'
import Router from 'vue-router'
import CommonWrapper from '@/components/common/common-wrapper'

import Eggsplant from '@/components/vegetables/eggsplant'
import Broccoli from '@/components/vegetables/broccoli'
import Corn from '@/components/vegetables/corn'

import Apple from '@/components/fruit/apple'
import Banana from '@/components/fruit/banana'
import Orange from '@/components/fruit/orange'

Vue.use(Router)

export const projectRouter = ({
  routes: [
    {
      path: '/vegetables',
      name: '',
      component: CommonWrapper,
      children: [
        {
          path: '/',
          redirect: 'broccoli'
        },
        {
          path: 'broccoli',
          name: 'vegetables::broccoli',
          component: Broccoli
        },
        {
          path: 'corn',
          name: 'vegetables::corn',
          component: Corn
        },
        {
          path: 'eggsplant',
          name: 'vegetables::eggsplant',
          component: Eggsplant
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
      children: [
        {
          path: 'apple',
          name: 'fruit::apple',
          component: Apple
        },
        {
          path: 'banana',
          name: 'fruit::banana',
          component: Banana
        },
        {
          path: 'orange',
          name: 'fruit::orange',
          component: Orange
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
