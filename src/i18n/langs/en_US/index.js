import login from './login'
import overview from './overview'
import error from './error'
import route from './route'

export default {
  main: {
    title: 'Admin Seed'
  },
  login,
  overview,
  error,
  route,
  table: {
    columns: [
      { title: 'RuleNo', dataIndex: 'no', scopedSlots: { customRender: 'ellipsis-with-tooltip' } },
      { title: 'Desc', dataIndex: 'description' },
      { title: 'CallNo', dataIndex: 'callNo', needTotal: true, customRender: (text) => text + ' 次' },
      { title: 'Status', dataIndex: 'status', needTotal: true },
      { title: 'UpdatedAt', dataIndex: 'updatedAt' },
      { title: 'Operation', dataIndex: 'operation', scopedSlots: { customRender: 'operation' } }
    ],
    operations: [
      { type: 'edit', label: 'Edit' },
      { type: 'delete', label: 'Delete' }
    ]
  },
  figure: {
    toMain: 'To main'
  },
  403: {
    message: 'Sorry, forbidden.'
  },
  404: {
    message: 'Sorry, not found.'
  },
  500: {
    message: 'Sorry, exception.'
  }
}
