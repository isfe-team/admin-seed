<template>
  <AppHeader
    :userInfo="userInfo"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </AppHeader>
</template>

<script>
import AppHeader from './AppHeader'
import { mapGetters } from 'vuex'
export default {
  components: { AppHeader },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
