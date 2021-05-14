<template>
  <PQTable
    ref="table"
    class="common-table"
    rowKey="key"
    :loadDataApi="getTableInfo"
    :operations="operations"
    :transformListData="transformListData"
    :initialPagination="{ currentPage: +$route.query.p || 1 }"
    :columns="columns"
    :query="query"
    :rowSelection="rowSelection"
    @operation="handleOperation"
    @loadedData="handleLoadedData"
    :stickHeaderX="true"
    :stickHeaderXWidth="1300"
  />
</template>

<script>
import { getTableInfo } from '@/apis/services/table'
import PQTable from '@/components/common/PQTable'
import { transformTo } from '@/i18n/setup'

export default {
  name: 'Table',
  components: { PQTable: PQTable },
  data () {
    return {
      query: '',
      getTableInfo,
      operations: [
        { type: 'edit', label: transformTo('common.edit') },
        { type: 'delete', label: transformTo('common.delete') }
      ],
      columns: [
        { title: transformTo('function.ruleNumber'), dataIndex: 'no', scopedSlots: { customRender: 'ellipsis-with-tooltip' } },
        { title: transformTo('function.discription'), dataIndex: 'description' },
        { title: transformTo('function.count'), dataIndex: 'callNo', needTotal: true, customRender: (text) => text + ' 次' },
        { title: transformTo('function.status'), dataIndex: 'status' },
        { title: transformTo('function.updatetime'), dataIndex: 'updatedAt' },
        { title: transformTo('common.operation'), dataIndex: 'operation', scopedSlots: { customRender: 'operation' } }
      ],
      rowSelection: {
        selectedRowKeys: [],
        onChange: (selectedRowKeys) => {
          this.rowSelection.selectedRowKeys = selectedRowKeys
        }
      }
    }
  },
  methods: {
    transformListData (xs) {
      return xs.result.data
    },
    handleOperation ({ type, record, index }) {
      this.$message.info(`type: ${type}, index: ${index}, record: ${JSON.stringify(record)}`)
    },
    handleLoadedData () {
      // 注意如果需要预置一些 selectedRowKeys，可以需要判断是否是初次加载
      this.rowSelection.selectedRowKeys = []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.common-table {
  /deep/ .pq-table {
    overflow: initial;
    flex: none;

    &.stick-header /deep/ table {
      width: auto;
    }

    // 解决固定表格列时固定部分的滚动条无法拖动
    .ant-table-fixed-left {
      height: calc(~"100% - 4px") !important;

      .ant-table-body-outer {
        height: calc(~"100% - 42px") !important;
        .ant-table-body-inner {
          max-height: initial !important;
        }
      }
    }
  }
}
</style>
