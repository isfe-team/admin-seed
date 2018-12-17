<template>
  <div class="overview-wrapper">
    <ACard title="页面整体布局">
      <p>总体左右布局</p>
      <p>左边上下布局，上为logo，下为menu</p>
      <p>右边上下布局，上为header，下为content</p>
    </ACard>
    <ACard title="主要使用的技术">
      <a href="http://doc.vue-js.com/v2/guide/">Vue2.0</a>
      <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce/">ant-design-vue</a>
      <a href="http://lesscss.org/#">less</a>
      <a href="https://www.kancloud.cn/yunye/axios/234845">axios</a>
      <a href="https://www.lodashjs.com/docs/4.17.5.html">lodash</a>
    </ACard>
    <ACard title="满足的大致需求">
      <p>从登录到具体业务开发到退出</p>
      <p>菜单暂时只适用于一级、二级、三级</p>
      <p>基于路由进行页面跳转</p>
    </ACard>
  </div>
</template>

<script>
export default {
  name: 'Overview',
  data () {
    return { }
  }
}
</script>

<style scoped lang="less">
  .overview-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 20px;
    /deep/ .ant-card {
      width: 400px;
      max-height: 260px;
      overflow-y: auto;
      margin-right: 20px;
      text-align: center;
      a {
        display: block;
      }
    }
  }
</style>
