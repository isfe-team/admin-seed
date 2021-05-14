<template>
  <div>
    <AButton type="primary" @click="changeTable">{{$t('function.changeRable')}}</AButton>
    <PQTable
      ref="table"
      class="resource-management-table"
      rowKey="key"
      :bordered="true"
      :loadDataApi="getTableInfo"
      :operations="operations"
      :transformListData="transformListData"
      :getDataTotalCount="getDataTotalCount"
      :initialPagination="{ currentPage: +$route.query.p || 1 }"
      :columns="columns"
      :query="query"
      :components="components"
      @operation="handleOperation"
    />
  </div>
</template>

<script>
import clone from 'lodash/clone'
import PQTable from '@/components/common/PQTable'
import { transformTo } from '@/i18n/setup'
import { draggableTable } from './draggableTable'

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
  mixins: [draggableTable],
  data () {
    return {
      query: { },
      resultData: MOCK_LIST_DATA,
      operations: [
        { type: 'edit', label: transformTo('common.edit'), exist (record, index) { console.log('EXIST', record, index) } },
        { type: 'delete', label: transformTo('common.delete'), disabled (record, index) { console.log('DISABLED', record, index) } }
      ],
      columns: [
        { title: transformTo('function.ruleNumber'), dataIndex: 'no', scopedSlots: { customRender: 'ellipsis-with-tooltip' }, width: 100 },
        { title: transformTo('function.discription'), dataIndex: 'description', width: 100 },
        { title: transformTo('common.operation'), dataIndex: 'operation', scopedSlots: { customRender: 'operation' }, width: 100 }
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
              { key: 5, no: 'No 5', description: '今天' }
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
  .resource-management-table {
    margin-top: 20px;

    /deep/ .ant-table {
      .ant-table-thead > tr > th.resize-table-th {
        position: relative;
      }

      .table-draggable-handle {
        position: absolute;
        /* width: 10px !important; */
        height: 42px !important;
        top: 0px;
        left: auto !important;
        right: -5px;
        cursor: col-resize;
        touch-action: none;
        border: none;
        transform: none !important;
      }
    }
  }
</style>
