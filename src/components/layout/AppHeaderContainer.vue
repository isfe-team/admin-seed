<!--
 - header content of app | bqliu
 -->

<template>
  <AppHeader :user-info="userInfo" v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import AppHeader from './AppHeader'
import { mapState } from 'vuex'

export default {
  name: 'AppHeaderContainer',
  components: {
    AppHeader
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>
