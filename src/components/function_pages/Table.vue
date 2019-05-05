<!-- 仍然可以采用 jsx 模式 -->
<template>
  <PQTable
    ref="table"
    class="resource-management-table"
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
  />
</template>

<script>
import { getTableInfo } from '@/apis/services/table'
import PQTable from '@/components/common/PQTable'
export default {
  name: 'Table',
  components: { PQTable: PQTable },
  data () {
    return {
      query: '',
      getTableInfo,
      operations: [
        { type: 'edit', label: '编辑' },
        { type: 'delete', label: '删除' }
      ],
      columns: [
        { title: '规则编号', dataIndex: 'no', scopedSlots: { customRender: 'ellipsis-with-tooltip' } },
        { title: '描述', dataIndex: 'description' },
        { title: '服务调用次数', dataIndex: 'callNo', needTotal: true, customRender: (text) => text + ' 次' },
        { title: '状态', dataIndex: 'status', needTotal: true },
        { title: '更新时间', dataIndex: 'updatedAt' },
        { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' } }
      ],
      rowSelection: {
        selectedRowKeys: [],
        onChange: (selectedRowKeys) => {
          console.log('selected', selectedRowKeys)
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
<style scoped>
</style>
