<template>
  <div>
    <h3>基础分页</h3>
    <a-pagination v-model="current" :total="50" show-less-items />
    <br />
    <br />
    <h3>更多分页</h3>
    <a-pagination :default-current="6" :total="500" />
    <br />
    <br />
    <h3>改变每页显示条目数</h3>
    <a-pagination show-size-changer :default-current="3" :total="500" />
    <div>
      <br />
      <br />
      <h3>快速跳转到某一页</h3>
      <a-pagination show-quick-jumper :default-current="2" :total="500" disabled show-less-items />
    </div>
    <br />
    <br />
    <h3>迷你版</h3>
    <a-pagination size="small" :total="50" :show-total="total => `Total ${total} items`" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      current: 1,
      pageSize: 10,
      total: 50
    }
  }
}
</script>
