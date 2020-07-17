
<template>
  <div class="overview-wrapper">
    <ACard :title="$t('overview.layoutTitle')">
      <p>{{$t('overview.layoutDescriptionTotal')}}</p>
      <p>{{$t('overview.layoutDescriptionLeft')}}</p>
      <p>{{$t('overview.layoutDescriptionRight')}}</p>
    </ACard>
    <ACard :title="$t('overview.techTitle')">
      <a href="http://doc.vue-js.com/v2/guide/">Vue2.0</a>
      <a href="https://cli.vuejs.org/">@vue/cli</a>
      <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce/">ant-design-vue</a>
      <a href="http://lesscss.org/#">less</a>
      <a href="https://github.com/axios/axios">axios</a>
      <a href="https://www.lodashjs.com/docs/4.17.5.html">lodash</a>
    </ACard>
    <ACard :title="$t('overview.demandTitle')">
      <p>{{$t('overview.demandDescription1')}}</p>
      <p>{{$t('overview.demandDescription2')}}</p>
      <p>{{$t('overview.demandDescription3')}}</p>
    </ACard>
  </div>
</template>

<script>
export default {
  name: 'Overview'
}
</script>

<style lang="less" scoped>
  .overview-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 20px;

    .ant-card {
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
