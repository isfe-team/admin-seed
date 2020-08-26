// import mainConponent from '@/components/common/mainConponent'
import NotFound from '@/components/abnormal_pages/NotFound'
import NoAuth from '@/components/abnormal_pages/NoAuth'
import ServerError from '@/components/abnormal_pages/ServerError'
import mainConponent from '@/views/layout'

export default {
  routes: [
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: () => import('@/views/auth/login')
    },
    {
      path: '/overview',
      name: 'overview',
      meta: { label: '概览', icon: 'bank' },
      component: () => import('@/components/Overview')
    },
    {
      path: '/comp-layout',
      name: '',
      meta: { label: '常用组件', icon: 'appstore' },
      component: mainConponent,
      redirect: '/comp-layout/btns',
      children: [
        {
          path: 'btns',
          name: 'comp-layout::btns',
          meta: { label: '按钮组件' },
          component: () => import('@/views/btns.vue')
        },

        {
          path: 'pagination',
          name: 'comp-layout::pagination',
          meta: { label: '分页器组件' },
          component: () => import('@/views/pagination.vue')
        },
        {
          path: 'badge',
          name: 'comp-layout::badge',
          meta: { label: '徽标数组件' },
          component: () => import('@/views/badge.vue')
        },

        {
          path: 'tags',
          name: 'comp-layout::tags',
          meta: { label: '标签页组件' },
          component: () => import('@/views/tags.vue')
        },
        {
          path: 'card',
          name: 'comp-layout::card',
          meta: { label: '卡片组件' },
          component: () => import('@/views/card.vue')
        },
        {
          path: 'list',
          name: 'comp-layout::list',
          meta: { label: '列表组件' },
          component: () => import('@/views/list.vue')
        },

        {
          path: 'modal',
          name: 'comp-layout::modal',
          meta: { label: '对话框组件' },
          component: () => import('@/views/modal.vue')
        }

      ]
    },
    {
      path: '/comp-tree',
      name: '',
      meta: { label: '树形组件', icon: 'apartment' },
      component: mainConponent,
      redirect: '/comp-tree/treeSelect',
      children: [
        {
          path: 'treeSelect',
          name: 'comp-tree::treeSelect',
          meta: { label: '树选择组件' },
          component: () => import('@/views/treeSelect.vue')
        },
        {
          path: 'tree',
          name: 'comp-tree::tree',
          meta: { label: '树形控件' },
          component: () => import('@/views/tree.vue')
        }
      ]
    },
    {
      path: '/comp-menu',
      name: '',
      meta: { label: '菜单类组件', icon: 'menu' },
      component: mainConponent,
      redirect: '/comp-menu/menu',
      children: [
        {
          path: 'menu',
          name: 'comp-menu::menu',
          meta: { label: '导航菜单' },
          component: () => import('@/views/menu.vue')
        },
        {
          path: 'dropmenu',
          name: 'comp-menu::dropmenu',
          meta: { label: '下拉菜单' },
          component: () => import('@/views/dropmenu.vue')
        }

      ]
    },

    {
      path: '/com-date',
      name: '',
      meta: { label: '日期时间相关', icon: 'schedule' },
      component: mainConponent,
      redirect: '/com-date/calendar',
      children: [
        {
          path: 'calendar',
          name: 'com-date::calendar',
          meta: { label: '日历组件' },
          component: () => import('@/views/calendar.vue')
        },
        {
          path: 'timePicker',
          name: 'com-date::timePicker',
          meta: { label: '时间选择框' },
          component: () => import('@/views/timePicker.vue')
        },
        {
          path: 'datePicker',
          name: 'com-date::datePicker',
          meta: { label: '日期选择框' },
          component: () => import('@/views/datePicker.vue')
        }

      ]
    },
    {
      path: '/comp-form',
      name: '',
      component: mainConponent,
      meta: { label: '表单相关组件', icon: 'file-protect' },
      redirect: '/comp-form/checkbox',
      children: [
        {
          path: 'checkbox',
          name: 'comp-form::checkbox',
          meta: { label: '复选框组件' },
          component: () => import('@/views/checkbox.vue')
        },

        {
          path: 'form',
          name: 'comp-form::form',
          meta: { label: '表单组件' },
          component: () => import('@/views/form.vue')
        },
        {
          path: 'input',
          name: 'comp-form::input',
          meta: { label: '输入框组件' },
          component: () => import('@/views/input.vue')
        },
        {
          path: 'radio',
          name: 'comp-form::radio',
          meta: { label: '单选框组件' },
          component: () => import('@/views/radio.vue')
        },

        {
          path: 'switch',
          name: 'comp-form::switch',
          meta: { label: '开关组件' },
          component: () => import('@/views/switch.vue')
        },

        {
          path: 'upload',
          name: 'comp-form::upload',
          meta: { label: '文件上传' },
          component: () => import('@/views/upload.vue')
        }
      ]
    },
    {
      path: '/comp-progress',
      name: '',
      component: mainConponent,
      meta: { label: '进度相关', icon: 'control' },
      redirect: '/comp-progress/timeLine',
      children: [
        {
          path: 'timeLine',
          name: 'comp-progress::timeLine',
          meta: { label: '时间轴组件' },
          component: () => import('@/views/timeLine.vue')
        },
        {
          path: 'progress',
          name: 'comp-progress::progress',
          meta: { label: '进度条组件' },
          component: () => import('@/views/progress.vue')
        }
      ]
    },
    {
      path: '/comp-select',
      name: '',
      component: mainConponent,
      meta: { label: '下拉选择相关', icon: 'select' },
      redirect: '/comp-select/select',
      children: [
        {
          path: 'select',
          name: 'comp-select::select',
          meta: { label: '选择器组件' },
          component: () => import('@/views/select.vue')
        },
        {
          path: 'cascader',
          name: 'comp-select::cascader',
          meta: { label: '级联选择' },
          component: () => import('@/views/cascader.vue')
        }
      ]
    },
    {
      path: '/comp-table',
      name: '',
      component: mainConponent,
      meta: { label: '表格组件', icon: 'table' },
      redirect: '/comp-table/mock-table',
      children: [
        {
          path: 'mock-table',
          name: 'comp-table::mock-table',
          component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/Table'),
          meta: { label: 'mock表格' }
        },
        {
          path: 'sync-table',
          name: 'comp-table::sync-table',
          component: () => import(/* webpackChunkName: 'function_components' */ '@/components/function_pages/SyncTable'),
          meta: { label: '固定数据表格' }
        },
        {
          path: 'table-style',
          name: 'comp-table::table-style',
          meta: { label: '不同风格表格' },
          component: () => import('@/views/table-style.vue')
        },
        {
          path: 'table-select',
          name: 'comp-table::table-select',
          meta: { label: '不同风格表格' },
          component: () => import('@/views/table-select.vue')
        }

      ]
    },
    {
      path: '/comp-tips',
      name: '',
      component: mainConponent,
      meta: { label: '提示相关', icon: 'tags' },
      redirect: '/comp-tips/notification',
      children: [
        {
          path: 'notification',
          name: 'comp-tips::notification',
          meta: { label: '通知提醒框' },
          component: () => import('@/views/notification.vue')
        },
        {
          path: 'popover',
          name: 'comp-tips::popover',
          meta: { label: '气泡卡片' },
          component: () => import('@/views/popover.vue')
        },
        {
          path: 'alert',
          name: 'comp-tips::alert',
          meta: { label: '警告提示' },
          component: () => import('@/views/alert.vue')
        },
        {
          path: 'message',
          name: 'comp-tips::message',
          meta: { label: '全局提示' },
          component: () => import('@/views/message.vue')
        },
        {
          path: 'spin',
          name: 'comp-tips::spin',
          meta: { label: '加载中组件' },
          component: () => import('@/views/spin.vue')
        }
      ]
    },
    {
      path: 'other',
      name: '',
      component: mainConponent,
      meta: { label: '其它组件', icon: 'user' },
      redirect: '/other',
      children: [
        {
          path: 'skeleton',
          name: 'other::skeleton',
          meta: { label: '加载占位图' },
          component: () => import('@/views/skeleton.vue')
        },
        {
          path: 'collapse',
          name: 'other::collapse',
          meta: { label: '折叠面板' },
          component: () => import('@/views/collapse.vue')
        },
        {
          path: 'anchor',
          name: 'other::anchor',
          meta: { label: '锚点组件' },
          component: () => import('@/views/anchor.vue')
        },
        {
          path: 'avatar',
          name: 'other::avatar',
          meta: { label: '头像组件' },
          component: () => import('@/views/avatar.vue')
        },
        {
          path: 'avatar-list',
          name: 'other::avatar-list',
          meta: { label: '头像列表' },
          component: () => import('@/views/avatar-list.vue')
        },
        {
          path: 'rate',
          name: 'other::rate',
          meta: { label: '评分组件' },
          component: () => import('@/views/rate.vue')
        },
        {
          path: 'transfer',
          name: 'other::transfer',
          meta: { label: '穿梭框组件' },
          component: () => import('@/views/transfer.vue')
        },
        {
          path: 'step',
          name: 'other::step',
          meta: { label: '步骤条' },
          component: () => import('@/views/step.vue')
        },
        {
          path: 'divider',
          name: 'other::divider',
          meta: { label: '分割线组件' },
          component: () => import('@/views/divider.vue')
        }

      ]
    },
    {
      path: '/abnormal-pages',
      name: '',
      component: mainConponent,
      meta: { label: '异常页', icon: 'user' },
      redirect: '/abnormal-pages/403',
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
