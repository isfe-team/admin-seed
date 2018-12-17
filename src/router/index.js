import Vue from 'vue'
import Router from 'vue-router'
import CommonWrapper from '@/components/common/CommonWrapper'

import Eggsplant from '@/components/function_pages/Eggsplant'
import Table from '@/components/function_pages/Table'
import Corn from '@/components/function_pages/Corn'
import EggsplantDatil from '@/components/function_pages/EggsplantDetail'

import NotFound from '@/components/abnormal_pages/NotFound'
import NoAuth from '@/components/abnormal_pages/NoAuth'
import ServerError from '@/components/abnormal_pages/ServerError'

import Overview from '@/components/overview'

Vue.use(Router)

export const projectRouter = ({
  routes: [
    {
      path: '/overview',
      name: 'overview',
      meta: { label: '概览' },
      component: Overview
    },
    {
      path: '/function-pages',
      name: '',
      component: CommonWrapper,
      meta: { label: '功能页' },
      children: [
        {
          path: '',
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
          name: 'abnormal-pages::no-auth',
          component: NoAuth,
          meta: { label: '403' }
        },
        {
          path: 'not-found',
          name: 'abnormal-pages::not-found',
          component: NotFound,
          meta: { label: '404' }
        },
        {
          path: 'serve-error',
          name: 'abnormal-pages::serve-error',
          component: ServerError,
          meta: { label: '500' }
        }
      ]
    },
    {
      path: '*',
      redirect: { name: 'abnormal-pages::not-found' }
    }
  ]
})
export default new Router(projectRouter)
