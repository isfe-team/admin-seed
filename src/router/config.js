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
          meta: { labelI18nKey: 'overview.overview' },
          component: () => import(/* webpackChunkName: 'overview' */ '@/components/Overview')
        },
        {
          path: 'function-pages',
          name: '',
          component: SimpleRouterWrapper,
          meta: { labelId: 'function-pages', labelI18nKey: 'function.functions' },
          children: [
            {
              path: '',
              redirect: 'table'
            },
            {
              path: 'table',
              name: 'function-pages::table',
              meta: { labelI18nKey: 'function.table' },
              component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/Table')
            },
            {
              path: 'sync-table',
              name: 'function-pages::sync-table',
              meta: { labelI18nKey: 'function.syncTable' },
              component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/SyncTable')
            },
            {
              path: 'corn',
              name: 'function-pages::corn',
              meta: { label: '功能2', labelI18nKey: 'function.function2' },
              component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/Corn')
            },
            {
              path: 'eggsplant',
              name: 'function-pages::eggsplant',
              meta: { labelI18nKey: 'function.function3' },
              component: SimpleRouterWrapper,
              children: [
                {
                  path: 'use',
                  name: 'function-pages::eggsplant::use',
                  meta: { labelI18nKey: 'function.function31' },
                  component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/Eggsplant')
                },
                {
                  path: 'detail',
                  name: 'function-pages::eggsplant::detail',
                  meta: { labelI18nKey: 'function.function32' },
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
          meta: { labelId: 'abnormal-pages', labelI18nKey: 'abnormal.abnormal' },
          component: SimpleRouterWrapper,
          children: [
            {
              path: '403',
              name: 'abnormal-pages::no-auth',
              meta: { labelI18nKey: 'abnormal.403' },
              component: NoAuth
            },
            {
              path: '404',
              name: 'abnormal-pages::not-found',
              meta: { labelI18nKey: 'abnormal.404' },
              component: NotFound
            },
            {
              path: '500',
              name: 'abnormal-pages::serve-error',
              meta: { labelI18nKey: 'abnormal.500' },
              component: ServerError
            }
          ]
        },
        // 可以选择留这个还是留下面的
        {
          path: '*',
          redirect: '/overview'
        }
      ]
    },
    {
      path: '*',
      redirect: '/overview'
    }
  ]
}
