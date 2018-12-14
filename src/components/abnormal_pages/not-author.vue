<template>
  <div class="not-author">
    <img src="https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg" alt="">
    <div class="pages-title">
      <div>403</div>
      <div>抱歉，没有访问权限</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return { }
  }
}
</script>

<style scoped>
  .not-author {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
  }
  .pages-title {
    margin-left: 20px;
    text-align: center;
    font-size: 30px;
  }
</style>
