<template>
  <PQTable
    ref="table"
    class="resource-management-table"
    :load-data-api="getTableInfo"
    :operations="operations"
    :transform-list-data="transformListData"
    :initial-pagination="{ currentPage: +$route.query.p || 1 }"
    :columns="columns"
    :query="query">
  </PQTable>
</template>

<script>
import { getTableInfo } from '@/utils/api'
import PQTable from '@/components/common/pq-table'
export default {
  name: 'Broccoli',
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
        { title: '规则编号', dataIndex: 'no' },
        { title: '描述', dataIndex: 'description' },
        { title: '服务调用次数', dataIndex: 'callNo', needTotal: true, customRender: (text) => text + ' 次' },
        { title: '状态', dataIndex: 'status', needTotal: true },
        { title: '更新时间', dataIndex: 'updatedAt' },
        { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' } }
      ]
    }
  },
  methods: {
    transformListData (xs) {
      return xs.result.data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
