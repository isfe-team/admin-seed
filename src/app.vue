<template>
<router-view></router-view>
</template>
<script>
export default {
  watch: {
    '$route' (value) {
      console.log(value)
    }
  }

}
</script>
