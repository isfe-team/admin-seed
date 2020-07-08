<!--
 * 基于 `APagination`，用于分页组件，能和 table 搭配使用，见 PQTable
 * props 见下面 props 注释
 *
 * events
 * @emits {currentChange} currentPage 改变时会触发，返回当前页
 * @emits {sizeChange} pageSize 改变时会触发，返回当前每页条数
 *
 * @TODOS optimize 最大页数小于当前页数，导致的两次 load（增加验证，但是感觉意义不大）
 -->
<template>
  <div class="pagination">
    <APagination
      class="pages"
      show-quick-jumper
      show-size-changer
      :current="currentPage"
      :pageSizeOptions="pageSizes"
      :page-size="selectedPageSize"
      :total="total"
      @change="handleCurrentChange"
      @showSizeChange="onShowSizeChange"
    />
  </div>
</template>

<script>
import toNumber from 'lodash/toNumber'
export default {
  name: 'Pagination',
  data () {
    return {
      selectedPageSize: toNumber(this.pageSize) || 10
    }
  },
  props: {
    // 每页显示条目个数
    pageSize: { type: [Number, String], default: 10 },
    // 每页显示个数选择器的选项设置
    pageSizes: { type: Array, default () { return [ '10', '20', '30', '40' ] } },
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
    },
    onShowSizeChange (currentPage, size) {
      this.$emit('size-change', size)
    }
  },
  watch: {
    pageSize (size) {
      this.selectedPageSize = toNumber(size)
    }
  }
}
</script>

<style scoped lang="less">
  .pagination {
    display: flex;
    width: 100%;
    justify-content: flex-end; // center;
    align-items: center;
    .pages {
      margin-left: 10px;
    }
  }
</style>
