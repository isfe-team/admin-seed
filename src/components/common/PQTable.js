/*!
 * 一个基于 ATable 通用的包含表格以及可选包含分页的表格组件
 * 可以基于该组件做各种定制（比如 XList），也可单独使用
 * @see http://tangjinzhou.gitee.io/ant-design-vue/components/table-cn
 * @see https://stackoverflow.com/questions/43702591/how-to-use-template-scope-in-vue-jsx
 *
 * @example
 * <PQTable :query="query" @load-data-api="api" :columns="columns"><Query /></PQTable>
 *
 * props 见下面 props
 *
 * slots
 * default 默认插槽 用于插入 query 部分
 *
 * events
 * @emits {loaded-data} loadData 完成时触发，返回转换后的列表数据
 * @emits {pagination-update} pagination 相关参数变化后触发（size-change 和 current-change），返回当前分页信息
 * @emits {operation} 某个操作点击时触发，返回操作类型和当前 record
 *
 * @todo
 * - 增加 TextButton 和 AButton 控制
 */

import Vue from 'vue'
import { Component, Prop, Watch, Emit } from 'vue-property-decorator'
import assign from 'lodash/assign'
import clone from 'lodash/clone'
import cloneDeep from 'lodash/cloneDeep'
import identity from 'lodash/identity'
import isFunction from 'lodash/isFunction'
import { Table, Tooltip } from 'ant-design-vue'
import Pagination from '@/components/common/Pagination'
import TextButton from '@/components/common/TextButton'
import { showErrorTip, removeHMS } from '@/utils/helpers'
import './PQTable.less'

/* constants，默认的页面大小 */
const DEFAULT_PAGE_SIZES = [ '10', '20', '50', '100' ]

@Component({
  inheritAttrs: false
})
class PQTable extends Vue {
  pagination = { }
  loadedInitialData = false
  listData = [ ]

  created () {
    // 分页的默认数据
    const pagination = assign({ }, {
      currentPage: 1,
      totalRows: 0,
      pageSize: this.defaultPageSizes[0],
      pageSizes: this.defaultPageSizes
    }, this.initialPagination)

    this.pagination = pagination
  }

  // 初始分页数据
  @Prop({ type: Object, default () { return { } } }) initialPagination
  // 默认每页显示条目数
  @Prop({ type: Array, default () { return clone(DEFAULT_PAGE_SIZES) } }) defaultPageSizes
  // 是否带分页
  @Prop({ type: Boolean, default: true }) withPagination
  // 表格的列数据
  // @see http://tangjinzhou.gitee.io/ant-design-vue/components/table-cn/#API
  // 可以增加 { scopedSlots: { customRender: 'ellipsis-with-title' } } 以及指定 width，实现 ellipsis + title 效果
  @Prop({ type: Array, default () { return [ ] } }) columns
  // 是否在 mount 之后就加载数据
  @Prop({ type: Boolean, default: true }) loadDataOnMount
  // 加载数据的接口
  @Prop({ type: Function, required: true }) loadDataApi
  // 搜索条件/参数，不需要 type 限制
  @Prop({ default: '' }) query
  // 加载完数据之后，对数据的转换逻辑
  @Prop({ type: Function, default: identity }) transformListData
  // 如何获取 totalCount
  @Prop({ type: Function, default (data) { return data.result.totalCount } }) getDataTotalCount
  // 操作栏的名字，默认 "操作"
  @Prop({ type: String, default: '操作' }) operationLabel
  // 操作列表，可以指定 collapsed 让这个操作在 "更多" 里面
  @Prop({ type: Array, default () { return [ ] } }) operations
  // 是否显示 "更多" 操作列表
  @Prop({ type: Boolean, default: true }) showCollapsedOperation
  // 是否固定布局，也就是增加 `table-layout: fixed`，默认 true
  @Prop({ type: Boolean, default: true }) layoutFixed
  // 是否是单行模式，如果字数太多，变成单行，出现 ...
  // 加上 ellipsis-with-title，能支持出现 title
  @Prop({ type: Boolean, default: true }) singleLineMode
  // rowKey，默认 id. @see http://tangjinzhou.gitee.io/ant-design-vue/components/table-cn/#API
  @Prop({ type: [ String, Function ], default: 'id' }) rowKey
  // 是否支持可选择
  // @see https://tangjinzhou.gitee.io/ant-design-vue/components/table-cn/#rowSelection
  // @notice 暂时还没集成
  @Prop({ type: [ Object, null ], default: null }) rowSelection
  // 固定表头，y 方向可滚动
  // 注意此时默认给的是 `100% - 46px`，但是这样导致表头高度最好是在一行，当然不止一行也没啥太大问题...
  @Prop({ type: Boolean, default: true }) stickHeader

  // 过滤列表的操作项
  get collapsedOperations () {
    return this.operations.filter((x) => x.collapsed)
  }

  get hasCollapsedOperation () {
    return this.collapsedOperations.length > 0
  }

  get noCollapsedOperations () {
    return this.operations.filter((x) => !x.collapsed)
  }

  mounted () {
    Promise.resolve(
      this.loadDataOnMount ? this.loadData() : null
    ).finally(() => {
      this.loadedInitialData = true
    })
  }

  @Watch('query')
  handleQueryChange () {
    // 防止最开始重复 load
    // 也可以按需动态 `$watch`
    if (!this.loadedInitialData) {
      return
    }
    if (this.pagination.currentPage !== 1) {
      this.pagination.currentPage = 1
    }
    this.loadData()
  }

  @Emit('table-change')
  handelChangeTable (pagination, filters, sorter) {
    return sorter
  }

  // 重置分页数据
  resetPagination () {
    this.pagination.currentPage = 1
    this.pagination.totalRows = 0
  }

  @Emit('operation')
  emitOperation (operation, record) {
    // 因为如果是 @click.native 的话，哪怕是 disabled，仍旧会触发
    // 所以在这里再判断一次
    // 也可以不用 AMenu 的形式，但是还要改样式
    const disabled = !!(typeof operation.disabled === 'function' ? operation.disabled(record) : operation.disabled)

    if (disabled) { return }

    return assign({ }, { record }, {
      type: operation.type,
      listData: this.listData
    })
  }

  // 根据分页信息和query要求加载列表数据
  @Emit('loaded-data')
  loadData () {
    // this.listData = [ ]
    return this.loadDataApi(this.pagination.currentPage, this.pagination.pageSize)
      .then((data) => {
        const totalCount = this.getDataTotalCount(data)
        this.pagination.totalRows = totalCount
        // 解决删除最后一页的最后一条数据时，没有触发change事件重新load的问题
        const maxPage = Math.ceil(totalCount / this.pagination.pageSize)
        if (maxPage > 0 && maxPage < this.pagination.currentPage) {
          return this.handleCurrentChange(maxPage)
        }
        const listData = this.transformListData(data)
        this.listData = listData
        return { listData }
      }, (error) => {
        this.listData = [ ]
        this.resetPagination()
        showErrorTip(error, '查询列表数据失败')
      })
  }

  resetReload () {
    this.resetPagination()
    return this.loadData()
  }

  getCurrentPage () {
    return this.pagination.currentPage
  }

  getPagination () {
    return cloneDeep(this.pagination)
  }

  paginationUpdate () {
    // use `cloneDeep` to prevent change
    this.$emit('pagination-update', this.getPagination())
    this.loadData()
  }

  handlePageSizeChange (pageSize) {
    this.pagination.pageSize = pageSize
    this.paginationUpdate()
  }

  handleCurrentChange (currentPage) {
    if (this.pagination.currentPage === currentPage) {
      return
    }
    this.pagination.currentPage = currentPage
    this.paginationUpdate()
  }

  render () {
    const tableClass = {
      'pq-table-core': true,
      'table-layout-fixed': this.layoutFixed,
      'table-single-line-mode': this.singleLineMode,
      'stick-header': this.stickHeader
    }
    let TablePagination = null

    function toBoolean (fnOrBoolean, ...args) {
      if (isFunction(fnOrBoolean)) {
        return !!fnOrBoolean.apply(this, args)
      }
      return !!fnOrBoolean
    }

    const OperationsRenderer = (text, record, index) => {
      const noCollapsedOperations = this.noCollapsedOperations.filter((x) => isFunction(x.exist) ? toBoolean(x.exist, record, index) : true)
      const Buttons = noCollapsedOperations.map((operation, index) => {
        const disabled = toBoolean(operation.disabled)
        const danger = toBoolean(operation.danger)
        return (
          <TextButton
            key={index}
            class='pq-table-operation-item'
            disabled={disabled}
            danger={danger}
            onClick={this.emitOperation.bind(this, operation, record)}
          >{operation.label}</TextButton>
        )
      })

      if (!this.hasCollapsedOperation || !this.showCollapsedOperation) {
        return Buttons
      }

      const Overlay = this.collapsedOperations.filter((operation) => toBoolean(operation.exist))
        .map((operation) => {
          const disabled = toBoolean(operation.disabled)
          return (
            <Menu.MenuItem key={index} disabled={disabled} onClick={this.emitOperation.bind(this, operation, record)}>
              {operation.label}
            </Menu.MenuItem>
          )
        })

      const Dropdown = (
        <Dropdown class='pq-table-operation-item pq-table-operations-more pointer' trigger={['click']}>
          <span>更多&nbsp;<AIcon type="down" /></span>
          <Menu slot='overlay'>{Overlay}</Menu>
        </Dropdown>
      )

      return [Buttons, Dropdown]
    }

    if (this.withPagination && this.loadedInitialData) {
      TablePagination = (
        <Pagination
          onPageSizeChange={this.handlePageSizeChange}
          onCurrentChange={this.handleCurrentChange}
          currentPage={this.pagination.currentPage}
          total={this.pagination.totalRows}
          pageSize={this.pagination.pageSize}
          pageSizes={this.pagination.pageSizes}
          class="pq-table-pagination"
        />
      )
    }

    const scopedSlots = {
      // default is useless
      default: () => null,
      component: (text, record, index) => null,
      'time-without-hms': (text) => <Tooltip placement='topLeft' class='pq-table-tooltip' title={text}>{removeHMS(text)}</Tooltip>,
      'ellipsis-with-title': (text) => <span title={text}>{text}</span>,
      'ellipsis-with-tooltip': (text) => <Tooltip placement='topLeft' class='pq-table-tooltip' title={text}>{text}</Tooltip>,
      'operation': (text, record, index) => <OperationsRenderer text={text} record={record} index={index} />
    }
    return (
      <div class="pq-table">
        {this.$slots.query}
        <Table
          class={tableClass}
          dataSource={this.listData}
          columns={this.columns}
          pagination={false}
          rowKey={this.rowKey}
          size="middle"
          onChange={this.handelChangeTable}
          scroll={this.stickHeader ? { y: 'calc(100% - 46px)' } : false}
          {...{ props: this.$attrs }}
          scopedSlots={scopedSlots}
        >
        </Table>
        {TablePagination}
      </div>
    )
  }
}

export default PQTable
