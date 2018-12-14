<!--
  -
  - 用于分页组件，能和 table 搭配使用，见 PQTable
  -
  - props 见下面 props 注释
  -
  - events
  - @emits {current-change} currentPage 改变时会触发，返回当前页
  - @emits {size-change} pageSize 改变时会触发，返回当前每页条数
-->
<template>
  <div class="pagination">
    <APagination
      show-quick-jumper
      :current="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="total"
      @change="handleCurrentChange"
      class="pages"
    />
  </div>
</template>

<script>
// @TODOS optimize 最大页数小于当前页数，导致的两次 load
export default {
  name: 'Pagination',
  data () {
    return {
      selectedPageSize: this.pageSize || 10
    }
  },
  props: {
    // 每页显示条目个数
    pageSize: { type: Number, default: 10 },
    // 每页显示个数选择器的选项设置
    pageSizes: { type: Array, default () { return [ ] } },
    // 总条目数
    total: { type: Number, default: 0 },
    // 当前页数
    currentPage: { type: Number, default: 1 }
  },
  methods: {
    handleCurrentChange (currentPage) {
      this.$emit('current-change', currentPage)
    },
    first () {
      this.$emit('current-change', 1)
    }
  },
  watch: {
    pageSize (size) {
      this.selectedPageSize = size
    },
    selectedPageSize (size) {
      this.$emit('size-change', size)
    }
  }
}
</script>

<style scoped lang="less">
  .pagination {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    .pages {
      margin-left: 10px;
    }
  }
</style>
