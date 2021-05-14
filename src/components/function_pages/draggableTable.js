const draggableTable = {
  data () {
    this.components = {
      header: {
        cell: (h, props, children) => {
          const { key, ...restProps } = props
          // eslint-disable-next-line no-shadow
          console.log(this, this.columns)
          const col = this.columns.find((col) => {
            const k = col.dataIndex || col.key
            return k === key
          })
          if (!col || !col.width || col.key === 'manipulate') {
            return h('th', { ...restProps }, [...children])
          }

          const dragProps = {
            key: col.dataIndex || col.key,
            class: 'table-draggable-handle',
            attrs: {
              w: 10,
              x: col.width,
              z: 1,
              axis: 'x',
              draggable: true,
              resizable: false
            },
            on: {
              dragging: (x) => {
                col.width = Math.max(x, 1)
              }
            }
          }
          const drag = h('vue-draggable-resizable', { ...dragProps })
          return h('th', { ...restProps, class: 'resize-table-th' }, [...children, drag])
        }
      }
    }
    return {
      tableHeight: 0
    }
  },
  mounted () {
    this.getScrollHeight()
    window.onresize = () => {
      this.getScrollHeight()
    }
  },
  methods: {
    // 获取列表滚动高度
    getScrollHeight () {
      const height = document.body.clientHeight || document.documentElement.clientHeight
      this.tableHeight = height - this.reduceHeight
    }
  }
}

export {
  // eslint-disable-next-line import/prefer-default-export
  draggableTable
}
