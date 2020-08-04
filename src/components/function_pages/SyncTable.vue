<template>
  <div class="sync-table-wrapper">
    <PQTable
      ref="table"
      rowKey="key"
      class="sync-table"
      :loadDataApi="getTableInfo"
      :operations="operations"
      :transformListData="transformListData"
      :getDataTotalCount="getDataTotalCount"
      :initialPagination="{ currentPage: +$route.query.p || 1 }"
      :columns="columns"
      :showTextButton="false"
      :query="query"
      @operation="handleOperation"
    >
      <div slot="query" class="table-query">
        <AButton type="primary" @click="changeTable">{{$t('function.changeRable')}}</AButton>
      </div>
      <!-- 用户在自己的组件自定义slot -->
      <div slot="user-defined" slot-scope="{ text }">
        <a href="">{{text}}</a>
      </div>
    </PQTable>
  </div>
</template>

<script>
import clone from 'lodash/clone'
import PQTable from '@/components/common/PQTable'
import { transformTo } from '@/components/common/i18n/setup'

const MOCK_LIST_DATA = {
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
  name: 'SyncTable',
  components: { PQTable: PQTable },
  data () {
    return {
      query: { },
      resultData: MOCK_LIST_DATA,
      operations: [
        { type: 'edit', label: transformTo('common.edit'), exist (record, index) { return true } },
        { type: 'delete', label: transformTo('common.delete'), disabled (record, index) { return false }, danger () { return true } }
      ],
      columns: [
        { title: transformTo('function.ruleNumber'), dataIndex: 'no', scopedSlots: { customRender: 'user-defined' } },
        { title: transformTo('function.discription'), dataIndex: 'description' },
        { title: transformTo('common.operation'), dataIndex: 'operation', scopedSlots: { customRender: 'operation' } }
      ]
    }
  },
  methods: {
    transformListData (xs) {
      return xs.result.data
    },
    getTableInfo (pageNo, pageSize) {
      return Promise.resolve(clone(this.resultData))
    },
    handleOperation ({ type, record, index }) {
      this.$message.info(`type: ${type}, index: ${index}, record: ${JSON.stringify(record)}`)
    },
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
              { key: 5, no: 'No 5', description: '今天' },
              { key: 51, no: 'No 5', description: '今天' },
              { key: 52, no: 'No 5', description: '今天' },
              { key: 53, no: 'No 5', description: '今天' },
              { key: 54, no: 'No 5', description: '今天' },
              { key: 55, no: 'No 5', description: '今天' },
              { key: 56, no: 'No 5', description: '今天' },
              { key: 57, no: 'No 5', description: '今天' },
              { key: 58, no: 'No 5', description: '今天' },
              { key: 59, no: 'No 5', description: '今天' },
              { key: 50, no: 'No 5', description: '今天' },
              { key: 60, no: 'No 5', description: '今天' }
            ]
          }
        }
      } else {
        this.resultData = clone(MOCK_LIST_DATA)
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
<style scoped lang="less">
  .sync-table-wrapper {
    height: 100%;
    .table-query {
      margin-bottom: 20px;
    }
  }
</style>
