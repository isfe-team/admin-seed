<template>
  <AMenu
    mode="inline"
    :default-open-keys="defaultOpenKeys"
    :selected-keys="selectedKeys"
    :inlineCollapsed="collapsed"
    class="app-menu"
    :inline-indent="26"
    @click="handleSelect"
    theme="dark">
    <template v-for="menu in menus">
      <ASubMenu :key="menu.url">
        <span slot="title" class="menu-title-wrapper">
          <AIcon :type="menu.icon" />
          <span class="menu-title">{{ menu.name }}</span>
        </span>
        <AMenuItem v-for="subMenu in menu.childList" :key="subMenu.url">
          {{ subMenu.name }}
        </AMenuItem>
      </ASubMenu>
    </template>
  </AMenu>
</template>

<script>
import assign from 'lodash/assign'
import reverse from 'lodash/reverse'
import menu from '@/menu.json'
export default {
  name: 'AppMenu',
  data () {
    return {
      defaultOpenKeys: [ ],
      selectedKeys: [ ],
      menus: assign({ }, menu.data[0].childList)
    }
  },
  watch: {
    $route (currentRoute) {
      console.log(currentRoute, 'currentRoute')
      this.calcMenuRouter()
    }
  },
  beforeMount () {
    this.calcMenuRouter()
  },
  props: [ 'collapsed' ],
  methods: {
    handleSelect (data) {
      const keypath = reverse(data.keyPath).join('::')
      this.$router.push({
        name: keypath
      })
    },
    calcMenuRouter () {
      const routeArr = this.$route.name.split('::')
      const [ firstRoute, SecondRoute ] = routeArr
      this.selectedKeys = [ SecondRoute ]
      this.defaultOpenKeys = [ firstRoute ]
    }
  }
}
</script>

<style scoped>
  .menu {
    width: 100%;
    height: 100%;
  }
</style>
