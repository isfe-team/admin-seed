<template>
  <div class="serve-abnormal">
    <img src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg" alt="">
    <div class="pages-title">
      <div>500</div>
      <div>抱歉，服务异常了</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServeAbnormal',
  data () {
    return { }
  }
}
</script>

<style scoped>
  .serve-abnormal {
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
