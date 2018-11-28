<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'CommonWrapper'
}
</script>

<style scoped lang="less">
  .wrapper {
    width: 100%;
    height: 100%;
  }
</style>
