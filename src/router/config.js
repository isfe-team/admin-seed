import SimpleRouterWrapper from '@/components/common/SimpleRouterWrapper'
import NotFound from '@/components/abnormal_pages/NotFound'
import NoAuth from '@/components/abnormal_pages/NoAuth'
import ServerError from '@/components/abnormal_pages/ServerError'
import Overview from '@/components/Overview'

import Table from '@/components/function_pages/Table'
import SyncTable from '@/components/function_pages/SyncTable'
import Corn from '@/components/function_pages/Corn'
import Eggsplant from '@/components/function_pages/Eggsplant'
import EggsplantDetail from '@/components/function_pages/EggsplantDetail'

export default {
  routes: [
    {
      path: '/overview',
      name: 'overview',
      meta: { label: '概览', labelI18nKey: 'overview.overview' },
      component: Overview
    },
    {
      path: '/function-pages',
      name: '',
      component: SimpleRouterWrapper,
      meta: { label: '功能页', labelI18nKey: 'function.functions' },
      children: [
        {
          path: '',
          redirect: 'table'
        },
        {
          path: 'table',
          name: 'function-pages::table',
          component: Table,
          meta: { label: '表格', labelI18nKey: 'function.table' }
        },
        {
          path: 'sync-table',
          name: 'function-pages::sync-table',
          component: SyncTable,
          meta: { label: '固定数据表格', labelI18nKey: 'function.syncTable' }
        },
        {
          path: 'corn',
          name: 'function-pages::corn',
          component: Corn,
          meta: { label: '功能2', labelI18nKey: 'function.function2' }
        },
        {
          path: 'eggsplant',
          name: 'function-pages::eggsplant',
          component: SimpleRouterWrapper,
          meta: { label: '功能3', labelI18nKey: 'function.function3' },
          children: [
            {
              path: 'use',
              name: 'function-pages::eggsplant::use',
              component: Eggsplant,
              meta: { label: '功能3.1', labelI18nKey: 'function.function31' }
            },
            {
              path: 'detail',
              name: 'function-pages::eggsplant::detail',
              component: EggsplantDetail,
              meta: { label: '功能3.2', labelI18nKey: 'function.function32' }
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
      component: SimpleRouterWrapper,
      meta: { label: '异常页', labelI18nKey: 'abnormal.abnormal' },
      children: [
        {
          path: '403',
          name: 'abnormal-pages::no-auth',
          component: NoAuth,
          meta: { label: '403', labelI18nKey: 'abnormal.403' }
        },
        {
          path: '404',
          name: 'abnormal-pages::not-found',
          component: NotFound,
          meta: { label: '404', labelI18nKey: 'abnormal.404' }
        },
        {
          path: '500',
          name: 'abnormal-pages::serve-error',
          component: ServerError,
          meta: { label: '500', labelI18nKey: 'abnormal.500' }
        }
      ]
    },
    {
      path: '*',
      redirect: 'overview'
    }
  ]
}
