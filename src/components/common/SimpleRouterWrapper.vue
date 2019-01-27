<template>
  <div class="router-wrapper">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'SimpleRouterWrapper'
}
</script>

<style scoped lang="less">
  .router-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
