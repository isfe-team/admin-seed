<template>
  <div>
    <AButton type="primary" @click="changeTable">切换数据</AButton>
    <PQTable
      ref="table"
      class="resource-management-table"
      :load-data-api="getRoleTable"
      :operations="operations"
      :transform-list-data="transformListData"
      :get-data-total-count="getDataTotalCount"
      :initial-pagination="{ currentPage: +$route.query.p || 1 }"
      :columns="columns"
      :query="query"
      row-key="key">
    </PQTable>
  </div>
</template>

<script>
import clone from 'lodash/clone'
import PQTable from '@/components/common/PQTable'
import { getRoleTable } from '@/apis/services/table'

const defaultInfo = {
  message: 1,
  result: {
    totalCount: 10,
    data: [
      { key: 1, no: 'No 1', description: '很好' },
      { key: 2, no: 'No 21', description: '今天' }
    ]
  }
}
export default {
  name: 'Broccoli',
  components: { PQTable: PQTable },
  data () {
    return {
      query: { },
      resultData: defaultInfo,
      getRoleTable,
      operations: [
        { type: 'edit', label: '编辑' },
        { type: 'delete', label: '删除' }
      ],
      columns: [
        { title: '规则编号', dataIndex: 'no' },
        { title: '描述', dataIndex: 'description' },
        { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' } }
      ]
    }
  },
  methods: {
    transformListData (xs) {
      return xs.result.data
    },
    // getTableInfo (pageNo, pageSize) {
    //   return Promise.resolve(clone(this.resultData))
    // },
    changeTable () {
      if (this.resultData.message === 1) {
        this.resultData = {
          message: 2,
          result: {
            totalCount: 10,
            data: [
              { key: 1, no: 'No 1', description: '很好' },
              { key: 2, no: 'No 2', description: '今天' },
              { key: 3, no: 'No 3', description: '今天' },
              { key: 4, no: 'No 4', description: '今天' },
              { key: 5, no: 'No 5', description: '今天' }
            ]
          }
        }
      } else {
        this.resultData = clone(defaultInfo)
      }
      this.$refs.table.loadData()
    },
    getDataTotalCount (xs) {
      return xs.result.totalCount
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .resource-management-table {
    margin-top: 20px;
  }
</style>
