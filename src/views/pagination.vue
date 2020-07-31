<template>
  <a-pagination v-model="current" :total="50" show-less-items />
</template>
<script>
export default {
  data () {
    return {
      current: 2
    }
  }
}
</script>
