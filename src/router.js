import Vue from 'vue'
import Router from 'vue-router'
import CommonWrapper from '@/components/common/common-wrapper'

import Eggsplant from '@/components/function_pages/eggsplant'
import Table from '@/components/function_pages/table'
import Corn from '@/components/function_pages/corn'
import EggsplantDatil from '@/components/function_pages/eggsplant-detail'

import NotFound from '@/components/abnormal_pages/not-found'
import NotAuthor from '@/components/abnormal_pages/not-author'
import ServeAbnormal from '@/components/abnormal_pages/serve-abnormal'

Vue.use(Router)

export const projectRouter = ({
  routes: [
    {
      path: '/function-pages',
      name: '',
      component: CommonWrapper,
      meta: { label: '功能' },
      children: [
        {
          path: '/',
          redirect: 'table'
        },
        {
          path: 'table',
          name: 'function-pages::table',
          component: Table,
          meta: { label: '表格' }
        },
        {
          path: 'corn',
          name: 'function-pages::corn',
          component: Corn,
          meta: { label: '功能2' }
        },
        {
          path: 'eggsplant',
          name: 'function-pages::eggsplant',
          component: CommonWrapper,
          meta: { label: '功能3' },
          children: [
            {
              path: 'use',
              name: 'function-pages::eggsplant::use',
              component: Eggsplant,
              meta: { label: '功能3.1' }
            },
            {
              path: 'detail',
              name: 'function-pages::eggsplant::detail',
              component: EggsplantDatil,
              meta: { label: '功能3.2' }
            }
          ]
        },
        {
          path: '*',
          redirect: 'table'
        }
      ]
    },
    {
      path: '/abnormal-pages',
      name: '',
      component: CommonWrapper,
      meta: { label: '异常页' },
      children: [
        {
          path: 'not-author',
          name: 'abnormal-pages::not-author',
          component: NotAuthor,
          meta: { label: '403' }
        },
        {
          path: 'not-found',
          name: 'abnormal-pages::not-found',
          component: NotFound,
          meta: { label: '404' }
        },
        {
          path: 'serve-abnormal',
          name: 'abnormal-pages::serve-abnormal',
          component: ServeAbnormal,
          meta: { label: '500' }
        }
      ]
    },
    {
      path: '*',
      redirect: './function-pages'
    }
  ]
})
export default new Router(projectRouter)
