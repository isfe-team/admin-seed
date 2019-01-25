<!--
  - 一个基于 ATable 通用的包含表格以及可选包含分页的表格组件
  - 可以基于该组件做各种定制（比如 XList），也可单独使用
  - @see http://tangjinzhou.gitee.io/ant-design-vue/components/table-cn
  -
  - @example
  - <PQTable :query="query" @load-data-api="api" :columns="columns"><Query /></PQTable>
  -
  - props 见下面 props
  -
  - slots
  - default 默认插槽 用于插入 query 部分
  -
  - events
  - @emits {loaded-data} loadData 完成时触发，返回转换后的列表数据
  - @emits {pagination-update} pagination 相关参数变化后触发（size-change 和 current-change），返回当前分页信息
  - @emits {operation} 某个操作点击时触发，返回操作类型和当前 record
  -
  - @todo
  - 增加 TextButton 和 AButton 控制
  - 去除 eslint-disable v-if/v-for、no-parsing-error 等
  - [ref](https://github.com/vuejs/eslint-plugin-vue/issues/665#issuecomment-447738204)
-->

<template>
  <div class="pq-table-wrapper">
    <slot name="query"></slot>
    <ATable
      class="pq-table"
      :class="{ 'table-layout-fixed': layoutFixed, 'table-single-line-mode': singleLineMode, 'stick-header': stickHeader }"
      :data-source="listData"
      :columns="columns"
      :pagination="false"
      :row-key="rowKey"
      size="middle"
      @change="handelChangeTable"
      v-bind="$attrs"
      :scroll="stickHeader ? { y: 'calc(100% - 46px)' } : false"
    >
      <!-- text: 当前行的值， record当前行数据 -->
      <template slot-scope="text, record, index" slot="component"></template>
      <template slot-scope="text" slot="time-without-hms">
        <ATooltip placement="topLeft" class="pq-table-tooltip" :title="text">{{ text | removeHMS }}</ATooltip>
      </template>
      <template slot-scope="text" slot="ellipsis-with-title">
        <span :title="text">{{ text }}</span>
      </template>
      <template slot-scope="text" slot="ellipsis-with-tooltip">
        <ATooltip placement="topLeft" class="pq-table-tooltip" :title="text">{{ text }}</ATooltip>
      </template>
      <template slot-scope="text, record" slot="operation">
        <div class="button-wrapper">
          <TextButton
            v-for="(operation, index) in noCollapsedOperations"
            v-if="typeof operation.exist === 'function' ? !!operation.exist(record) : true"
            :disabled="typeof operation.disabled === 'function' ? !!operation.disabled(record) : !!operation.disabled"
            :danger="typeof operation.danger === 'function' ? !!operation.danger(record) : !!operation.danger"
            :key="index"
            class="pq-operation-item"
            @click="emitOperation(operation, record)">
            {{ operation.label }}
          </TextButton>
         <!--  <AButton
            type="primary"
            size="small"
            v-for="(operation, index) in noCollapsedOperations"
            v-if="typeof operation.exist === 'function' ? !!operation.exist(record) : true"
            :disabled="typeof operation.disabled === 'function' ? !!operation.disabled(record) : !!operation.disabled"
            :key="index"
            class="pq-operation-item"
            @click="emitOperation(operation, record)">
            {{ operation.label }}
          </AButton> -->
          <ADropdown v-if="hasCollapsedOperation && showCollapsedOperation" class="pq-operation-item pq-operations-more pointer" :trigger="['click']">
            <span>更多&nbsp;<AIcon type="down" /></span>
            <AMenu slot="overlay">
              <!-- 需要使用 @click -->
              <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
              <AMenuItem
                v-for="(operation, index) in collapsedOperations"
                :key="index"
                v-if="typeof operation.exist === 'function' ? !!operation.exist(record) : true"
                :disabled="typeof operation.disabled === 'function' ? !!operation.disabled(record) : !!operation.disabled"
                @click="emitOperation(operation, record)">
                {{ operation.label }}
              </AMenuItem>
            </AMenu>
          </ADropdown>
        </div>
      </template>
    </ATable>
    <!-- v-show="listData.length !== 0" -->
    <Pagination
      v-if="withPagination && loadedInitialData"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :total="pagination.totalRows"
      :page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      class="pq-pagination">
    </Pagination>
  </div>
</template>

<script>
import assign from 'lodash/assign'
import clone from 'lodash/clone'
import cloneDeep from 'lodash/cloneDeep'
import identity from 'lodash/identity'
import Pagination from '@/components/common/Pagination'
import TextButton from '@/components/common/TextButton'
import { showErrorTip, removeHMS } from '@/utils/helpers'

/* constants，默认的页面大小 */
const DEFAULT_PAGE_SIZES = [ 10, 20, 50, 100 ]

export default {
  inheritAttrs: false,
  name: 'PQTable',
  data () {
    // 分页的默认数据
    const pagination = assign({ }, {
      currentPage: 1,
      totalRows: 0,
      pageSize: this.defaultPageSizes[0],
      pageSizes: this.defaultPageSizes
    }, this.initialPagination)

    return {
      pagination,
      loadedInitialData: false,
      listData: [ ]
    }
  },
  props: {
    // 初始分页数据
    initialPagination: { type: Object, default () { return { } } },
    // 默认每页显示条目数
    defaultPageSizes: {
      type: Array,
      default () { return clone(DEFAULT_PAGE_SIZES) }
    },
    // 是否带分页
    withPagination: { type: Boolean, default: true },
    // 表格的列数据
    // @see http://tangjinzhou.gitee.io/ant-design-vue/components/table-cn/#API
    // 可以增加 { scopedSlots: { customRender: 'ellipsis-with-title' } } 以及指定 width，实现 ellipsis + title 效果
    columns: { type: Array, default () { return [ ] } },
    // 是否在 mount 之后就加载数据
    loadDataOnMount: { type: Boolean, default: true },
    // 加载数据的接口
    loadDataApi: { type: Function, required: true },
    // 搜索条件/参数
    // 不需要 type 限制
    query: { default () { return '' } },
    // 加载完数据之后，对数据的转换逻辑
    transformListData: { type: Function, default: identity },
    getDataTotalCount: { type: Function, default (data) { return data.result.totalCount } },
    // 操作栏的名字，默认 "操作"
    operationLabel: { type: String, default: '操作' },
    // 操作列表，可以指定 collapsed 让这个操作在 "更多" 里面
    operations: { type: Array, default () { return [ ] } },
    // 是否显示 "更多" 操作列表
    showCollapsedOperation: { type: Boolean, default: true },
    // 是否固定布局，也就是增加 `table-layout: fixed`，默认 true
    layoutFixed: { type: Boolean, default: true },
    // 是否是单行模式，如果字数太多，变成单行，出现 ...
    // 加上 ellipsis-with-title，能支持出现 title
    singleLineMode: { type: Boolean, default: true },
    // rowKey，默认 id
    // @see http://tangjinzhou.gitee.io/ant-design-vue/components/table-cn/#API
    rowKey: { type: [ String, Function ], default: 'id' },
    // 是否支持可选择
    // @see https://tangjinzhou.gitee.io/ant-design-vue/components/table-cn/#rowSelection
    // @notice 暂时还没集成
    rowSelection: { type: [ Object, null ], default: null },
    // 固定表头，y 方向可滚动
    // 注意此时默认给的是 `100% - 46px`，但是这样导致表头高度最好是在一行，当然不止一行也没啥太大问题...
    stickHeader: { type: Boolean, default: true }
  },
  computed: {
    // 过滤列表的操作项
    collapsedOperations () {
      return this.operations.filter((x) => x.collapsed)
    },
    hasCollapsedOperation () {
      return this.collapsedOperations.length > 0
    },
    noCollapsedOperations () {
      return this.operations.filter((x) => !x.collapsed)
    }
  },
  components: { Pagination, TextButton },
  filters: {
    removeHMS
  },
  mounted () {
    Promise.resolve(
      this.loadDataOnMount ? this.loadData() : null
    ).finally(() => {
      this.loadedInitialData = true
    })
  },
  watch: {
    query () {
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
  },
  methods: {
    handelChangeTable (pagination, filters, sorter) {
      this.$emit('table-change', sorter)
    },
    // 重置分页数据
    resetPagination () {
      this.pagination.currentPage = 1
      this.pagination.totalRows = 0
    },
    emitOperation (operation, record) {
      // 因为如果是 @click.native 的话，哪怕是 disabled，仍旧会触发
      // 所以在这里再判断一次
      // 也可以不用 AMenu 的形式，但是还要改样式
      const disabled = !!(typeof operation.disabled === 'function' ? operation.disabled(record) : operation.disabled)

      if (disabled) {
        return
      }

      this.$emit('operation', assign({ }, { record }, {
        type: operation.type,
        listData: this.listData
      }))
    },
    // 根据分页信息和query要求加载列表数据
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
          this.$emit('loaded-data', { listData })
        }, (error) => {
          this.listData = [ ]
          this.resetPagination()
          showErrorTip(error, '查询列表数据失败')
        })
    },
    resetReload () {
      this.resetPagination()
      return this.loadData()
    },
    getCurrentPage () {
      return this.pagination.currentPage
    },
    getPagination () {
      return cloneDeep(this.pagination)
    },
    paginationUpdate () {
      // use `cloneDeep` to prevent change
      this.$emit('pagination-update', this.getPagination())
      this.loadData()
    },
    handleSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.paginationUpdate()
    },
    handleCurrentChange (currentPage) {
      if (this.pagination.currentPage === currentPage) {
        return
      }
      this.pagination.currentPage = currentPage
      this.paginationUpdate()
    }
  }
}
</script>

<style scoped lang="less">
  @import '~@/styles/vars.less';

  .pq-table-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .pq-table {
      flex: 1 1 auto;
      /* 最简单的办法，不然子级高度 100% 失效 */
      height: 100%;
      overflow: auto;
      border-top: 1px solid @border-color-base;

      &.table-layout-fixed /deep/ table {
        table-layout: fixed;
      }

      // 不然 不能换行
      &.stick-header /deep/ table {
        width: 100%;
      }

      // 给高度，不然 scroll: y 设置成相对的高度 不行
      &.stick-header {
        /deep/ .ant-spin-nested-loading,
        /deep/ .ant-spin-container,
        /deep/ .ant-table,
        /deep/ .ant-table-content,
        /deep/ .ant-table-scroll {
          height: 100%;
        }
      }

      /deep/ .ant-table-body > table > .ant-table-tbody > tr td,
      /deep/ .ant-table-body > table > .ant-table-tbody > tr th {
        padding: 10px 8px;
      }

      /deep/ .ant-table-body > table > .ant-table-tbody > tr td {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .pq-table-tooltip {
        // display: inline-block; 用了的话 stickHeader 且子表格会有问题
        // 不然会出乎你的意料，会跑到很后面去，如果很宽的话
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
      }
    }
    /deep/ .ant-table-row-expand-icon + .pq-table-tooltip {
      vertical-align: bottom;
    }
    .pq-pagination {
      flex: 0 0 @pagination-height;
      padding: 0 @padding-xs;
    }

    .button-wrapper {
      // remove extra space
      font-size: 0;
    }

    .pq-operation-item {
      margin-right: 10px;
      font-size: 14px;

      &:last-child {
        margin-right: 0
      }
    }

    .pq-operations-more {
      color: @primary-color;
    }
  }
</style>
