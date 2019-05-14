import login from './login'
import overview from './overview'
import error from './error'
import route from './route'

export default {
  main: {
    title: '后管种子项目'
  },
  login,
  overview,
  error,
  route,
  figure: {
    toMain: '回到首页'
  },
  table: {
    columns: [
      { title: '规则编号', dataIndex: 'no', scopedSlots: { customRender: 'ellipsis-with-tooltip' } },
      { title: '描述', dataIndex: 'description' },
      { title: '服务调用次数', dataIndex: 'callNo', needTotal: true, customRender: (text) => text + ' 次' },
      { title: '状态', dataIndex: 'status', needTotal: true },
      { title: '更新时间', dataIndex: 'updatedAt' },
      { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' } }
    ],
    operations: [
      { type: 'edit', label: '编辑' },
      { type: 'delete', label: '删除' }
    ]
  },
  403: {
    message: '抱歉，没有访问权限'
  },
  404: {
    message: '抱歉，你访问的页面不存在或正在开发'
  },
  500: {
    message: '抱歉，服务异常了'
  }
}
