<!--一个最简单的 wrapper，用于包裹一个 router-view-->
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

<style scoped>
  .router-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
