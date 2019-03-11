/*!
 * 基于 `APagination`，用于分页组件，能和 table 搭配使用，见 PQTable
 * props 见下面 props 注释
 *
 * events
 * @emits {currentChange} currentPage 改变时会触发，返回当前页
 * @emits {sizeChange} pageSize 改变时会触发，返回当前每页条数
 *
 * @TODOS optimize 最大页数小于当前页数，导致的两次 load（增加验证，但是感觉意义不大）
 */

import Vue from 'vue'
import { Component, Emit, Watch, Prop } from 'vue-property-decorator'

const paginationStyle = {
  display: 'flex',
  'justify-content': 'flex-end',
  'align-items': 'center'
}
const paginationPagesStyle = { 'margin-right': '10px' }

@Component()
class Pagination extends Vue {
  // 每页显示条目个数
  @Prop({ type: [ Number, String ], default: 10 }) pageSize
  // 每页显示个数选择器的选项设置
  @Prop({ type: Array, default () { return [ '10', '20', '30', '40' ] } }) pageSizes
  // 总条目数
  @Prop({ type: Number, default: 0 }) total
  // 当前页数
  @Prop({ type: Number, default: 1 }) currentPage

  selectedPageSize = 10

  created () {
    this.selectedPageSize = +this.pageSize
  }

  @Emit('currentChange')
  handleCurrentChange (currentPage) { return currentPage }

  first () { this.handleCurrentChange(1) }

  @Watch('pageSize')
  onPageSizeChange (size) { this.selectedPageSize = +size }

  @Emit('pageSizeChange')
  onShowSizeChange (current, size) {
    return size
  }

  render () {
    return (
      <div style={paginationStyle}>
        <APagination
          style={paginationPagesStyle}
          showQuickJumper
          showSizeChanger
          current={this.currentPage}
          pageSize={this.selectedPageSize}
          pageSizeOptions={this.pageSizes}
          total={this.total}
          onChange={this.handleCurrentChange}
          onShowSizeChange={this.onShowSizeChange}
        />
      </div>
    )
  }
}

export default Pagination
