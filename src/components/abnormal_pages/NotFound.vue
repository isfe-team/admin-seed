<template>
  <div class="not-found">
    <img src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg" alt="">
    <div class="pages-title">
      <div>404</div>
      <div>抱歉，你访问的页面不存在或正在开发</div>
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
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
  }
  .pages-title {
    margin-left: 20px;
    font-size: 30px;
    text-align: center;
  }
</style>
