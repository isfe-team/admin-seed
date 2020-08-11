import SimpleRouterWrapper from '@/components/common/SimpleRouterWrapper'
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
      component: SimpleRouterWrapper,
      meta: { label: '所有组件' },
      children: [
        {
          path: '',
          redirect: 'table'
        },
        {
          path: 'table',
          name: 'function-pages::table',
          component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/Table'),
          meta: { label: 'mock表格' }
        },
        // {
        //   path: 'sync-table',
        //   name: 'function-pages::sync-table',
        //   component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/SyncTable'),
        //   meta: { label: '固定数据表格' }
        // },
        // {
        //   path: 'corn',
        //   name: 'function-pages::corn',
        //   component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/Corn'),
        //   meta: { label: '功能2' }
        // },
        // {
        //   path: 'eggsplant',
        //   name: 'function-pages::eggsplant',
        //   component: SimpleRouterWrapper,
        //   meta: { label: '功能3' },
        //   children: [
        //     {
        //       path: 'use',
        //       name: 'function-pages::eggsplant::use',
        //       component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/Eggsplant'),
        //       meta: { label: '功能3.1' }
        //     },
        //     {
        //       path: 'detail',
        //       name: 'function-pages::eggsplant::detail',
        //       component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/EggsplantDetail'),
        //       meta: { label: '功能3.2' }
        //     }
        //   ]
        // },
        {
          path: 'btns',
          name: 'function-pages::btns',
          meta: { label: '按钮组件' },
          component: () => import('@/views/btns.vue')
        },
        {
          path: 'steps',
          name: 'function-pages::steps',
          meta: { label: '步骤条组件' },
          component: () => import('@/views/steps.vue')
        },
        {
          path: 'dropmenu',
          name: 'function-pages::dropmenu',
          meta: { label: '下拉菜单' },
          component: () => import('@/views/dropmenu.vue')
        },
        {
          path: 'checkbox',
          name: 'function-pages::checkbox',
          meta: { label: '复选框组件' },
          component: () => import('@/views/checkbox.vue')
        },
        {
          path: 'datePicker',
          name: 'function-pages::datePicker',
          meta: { label: '日期选择框' },
          component: () => import('@/views/datePicker.vue')
        },

        {
          path: 'form',
          name: 'function-pages::form',
          meta: { label: '表单组件' },
          component: () => import('@/views/form.vue')
        },

        {
          path: 'cascader',
          name: 'function-pages::cascader',
          meta: { label: '级联选择' },
          component: () => import('@/views/cascader.vue')
        },
        {
          path: 'pagination',
          name: 'function-pages::pagination',
          meta: { label: '分页器组件' },
          component: () => import('@/views/pagination.vue')
        },

        {
          path: 'menu',
          name: 'function-pages::menu',
          meta: { label: '导航菜单' },
          component: () => import('@/views/menu.vue')
        },
        {
          path: 'input',
          name: 'function-pages::input',
          meta: { label: '输入框组件' },
          component: () => import('@/views/input.vue')
        },
        {
          path: 'rate',
          name: 'function-pages::rate',
          meta: { label: '评分组件' },
          component: () => import('@/views/rate.vue')
        },
        {
          path: 'radio',
          name: 'function-pages::radio',
          meta: { label: '单选框组件' },
          component: () => import('@/views/radio.vue')
        },
        {
          path: 'select',
          name: 'function-pages::select',
          meta: { label: '选择器组件' },
          component: () => import('@/views/select.vue')
        },

        {
          path: 'switch',
          name: 'function-pages::switch',
          meta: { label: '开关组件' },
          component: () => import('@/views/switch.vue')
        },

        {
          path: 'treeSelect',
          name: 'function-pages::treeSelect',
          meta: { label: '树选择组件' },
          component: () => import('@/views/treeSelect.vue')
        },
        {
          path: 'timePicker',
          name: 'function-pages::timePicker',
          meta: { label: '时间选择框' },
          component: () => import('@/views/timePicker.vue')
        },
        {
          path: 'transfer',
          name: 'function-pages::transfer',
          meta: { label: '穿梭框组件' },
          component: () => import('@/views/transfer.vue')
        },
        {
          path: 'upload',
          name: 'function-pages::upload',
          meta: { label: '文件上传' },
          component: () => import('@/views/upload.vue')
        },
        {
          path: 'avatar',
          name: 'function-pages::avatar',
          meta: { label: '头像组件' },
          component: () => import('@/views/avatar.vue')
        },
        {
          path: 'badge',
          name: 'function-pages::badge',
          meta: { label: '徽标数组件' },
          component: () => import('@/views/badge.vue')
        },
        {
          path: 'calendar',
          name: 'function-pages::calendar',
          meta: { label: '日历组件' },
          component: () => import('@/views/calendar.vue')
        },
        {
          path: 'card',
          name: 'function-pages::card',
          meta: { label: '卡片组件' },
          component: () => import('@/views/card.vue')
        },
        {
          path: 'collapse',
          name: 'function-pages::collapse',
          meta: { label: '折叠面板' },
          component: () => import('@/views/collapse.vue')
        },
        {
          path: 'list',
          name: 'function-pages::list',
          meta: { label: '列表组件' },
          component: () => import('@/views/list.vue')
        },
        {
          path: 'popover',
          name: 'function-pages::popover',
          meta: { label: '气泡卡片' },
          component: () => import('@/views/popover.vue')
        },

        {
          path: 'tableStyle',
          name: 'function-pages::tableStyle',
          meta: { label: '不同风格表格' },
          component: () => import('@/views/tableStyle.vue')
        },
        {
          path: 'tags',
          name: 'function-pages::tags',
          meta: { label: '标签页组件' },
          component: () => import('@/views/tags.vue')
        },
        {
          path: 'timeLine',
          name: 'function-pages::timeLine',
          meta: { label: '时间轴组件' },
          component: () => import('@/views/timeLine.vue')
        },
        {
          path: 'tree',
          name: 'function-pages::tree',
          meta: { label: '树形控件' },
          component: () => import('@/views/tree.vue')
        },
        {
          path: 'alert',
          name: 'function-pages::alert',
          meta: { label: '警告提示' },
          component: () => import('@/views/alert.vue')
        },
        {
          path: 'message',
          name: 'function-pages::message',
          meta: { label: '全局提示' },
          component: () => import('@/views/message.vue')
        },
        {
          path: 'notification',
          name: 'function-pages::notification',
          meta: { label: '通知提醒框' },
          component: () => import('@/views/notification.vue')
        },
        {
          path: 'progress',
          name: 'function-pages::progress',
          meta: { label: '进度条组件' },
          component: () => import('@/views/progress.vue')
        },
        {
          path: 'spin',
          name: 'function-pages::spin',
          meta: { label: '加载中组件' },
          component: () => import('@/views/spin.vue')
        },
        {
          path: 'modal',
          name: 'function-pages::modal',
          meta: { label: '对话框组件' },
          component: () => import('@/views/modal.vue')
        },
        {
          path: 'skeleton',
          name: 'function-pages::skeleton',
          meta: { label: '加载占位图' },
          component: () => import('@/views/skeleton.vue')
        },
        {
          path: 'anchor',
          name: 'function-pages::anchor',
          meta: { label: '锚点组件' },
          component: () => import('@/views/anchor.vue')
        },
        {
          path: 'divider',
          name: 'function-pages::divider',
          meta: { label: '分割线组件' },
          component: () => import('@/views/divider.vue')
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
      meta: { label: '异常页' },
      children: [
        {
          path: '403',
          name: 'abnormal-pages::403',
          component: NoAuth,
          meta: { label: '403' }
        },
        {
          path: '404',
          name: 'abnormal-pages::404',
          component: NotFound,
          meta: { label: '404' }
        },
        {
          path: '500',
          name: 'abnormal-pages::500',
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
