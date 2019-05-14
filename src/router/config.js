import SimpleRouterWrapper from '@/components/common/SimpleRouterWrapper'
import NotFound from '@/components/abnormal_pages/NotFound'
import NoAuth from '@/components/abnormal_pages/NoAuth'
import ServerError from '@/components/abnormal_pages/ServerError'

const commonRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: { noNeedAuth: true },
    component: () => import(/* webpackChunkName: 'login' */ '@/components/login/Login')
  },
  {
    path: '/403',
    name: 'no-auth',
    meta: { noNeedAuth: true },
    component: NoAuth
  },
  {
    path: '/404',
    name: 'not-found',
    meta: { noNeedAuth: true },
    component: NotFound
  },
  {
    path: '/500',
    name: 'serve-error',
    meta: { noNeedAuth: true },
    component: ServerError
  }
]

export default {
  routes: [
    ...commonRoutes,
    {
      path: '/',
      name: 'main',
      component: () => import(/* webpackChunkName: 'main' */ '@/entries/index/Main'),
      children: [
        {
          path: 'overview',
          name: 'overview',
          component: () => import(/* webpackChunkName: 'overview' */ '@/components/Overview')
        },
        {
          path: 'function-pages',
          name: '',
          component: SimpleRouterWrapper,
          meta: { labelId: 'function-pages' },
          children: [
            {
              path: '',
              redirect: 'table'
            },
            {
              path: 'table',
              name: 'function-pages::table',
              component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/Table')
            },
            {
              path: 'sync-table',
              name: 'function-pages::sync-table',
              component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/SyncTable')
            },
            {
              path: 'corn',
              name: 'function-pages::corn',
              component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/Corn')
            },
            {
              path: 'eggsplant',
              name: 'function-pages::eggsplant',
              component: SimpleRouterWrapper,
              children: [
                {
                  path: 'use',
                  name: 'function-pages::eggsplant::use',
                  component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/Eggsplant')
                },
                {
                  path: 'detail',
                  name: 'function-pages::eggsplant::detail',
                  component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/EggsplantDetail')
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
          path: 'abnormal-pages',
          name: '',
          meta: { labelId: 'abnormal-pages' },
          component: SimpleRouterWrapper,
          children: [
            {
              path: '403',
              name: 'abnormal-pages::no-auth',
              component: NoAuth
            },
            {
              path: '404',
              name: 'abnormal-pages::not-found',
              component: NotFound
            },
            {
              path: '500',
              name: 'abnormal-pages::serve-error',
              component: ServerError
            }
          ]
        },
        // 可以选择留这个还是留下面的
        {
          path: '*',
          redirect: '/abnormal-pages/404'
        }
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
}
