import CommonWrapper from '@/components/common/CommonWrapper'
import NotFound from '@/components/abnormal_pages/NotFound'
import NoAuth from '@/components/abnormal_pages/NoAuth'
import ServerError from '@/components/abnormal_pages/ServerError'

export default {
  routes: [
    {
      path: '/overview',
      name: 'overview',
      meta: { label: '概览' },
      component: () => import(/* webpackChunkName: 'overview' */ '@/components/Overview')
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
          component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/Table'),
          meta: { label: '表格' }
        },
        {
          path: 'sync-table',
          name: 'function-pages::sync-table',
          component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/SyncTable'),
          meta: { label: '固定数据表格' }
        },
        {
          path: 'corn',
          name: 'function-pages::corn',
          component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/Corn'),
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
              component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/Eggsplant'),
              meta: { label: '功能3.1' }
            },
            {
              path: 'detail',
              name: 'function-pages::eggsplant::detail',
              component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/EggsplantDetail'),
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
          path: '403',
          name: 'abnormal-pages::no-auth',
          component: NoAuth,
          meta: { label: '403' }
        },
        {
          path: '404',
          name: 'abnormal-pages::not-found',
          component: NotFound,
          meta: { label: '404' }
        },
        {
          path: '500',
          name: 'abnormal-pages::serve-error',
          component: ServerError,
          meta: { label: '500' }
        }
      ]
    },
    {
      path: '*',
      redirect: 'overview' // { name: 'abnormal-pages::not-found' }
    }
  ]
}
