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
      <AMenuItem v-if="menu.childList.length === 0" :key="menu.url">
        <AIcon :type="menu.icon" />
        <span class="menu-title">{{ menu.name }}</span>
      </AMenuItem>
      <ASubMenu :key="menu.url" v-else>
        <span slot="title" class="menu-title-wrapper">
          <AIcon :type="menu.icon" />
          <span class="menu-title">{{ menu.name }}</span>
        </span>
        <template v-for="subMenu in menu.childList">
          <AMenuItem v-if="subMenu.childList.length === 0" :key="subMenu.url">
            <AIcon :type="subMenu.icon" />
            <span class="menu-title">{{ subMenu.name }}</span>
          </AMenuItem>
          <ASubMenu :key="subMenu.url" v-else>
            <span slot="title" class="menu-title-wrapper">
              <AIcon :type="subMenu.icon" />
              <span class="menu-title">{{ subMenu.name }}</span>
            </span>
            <AMenuItem v-for="grandMenu in subMenu.childList" :key="grandMenu.url">
              {{ grandMenu.name }}
            </AMenuItem>
          </ASubMenu>
        </template>
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
      console.log(data)
      const keypath = reverse(data.keyPath).join('::')
      this.$router.push({
        name: keypath
      })
    },
    calcMenuRouter () {
      const routeArr = this.$route.name.split('::')
      this.selectedKeys = [ routeArr[routeArr.length - 1] ]
      const [ firstRoute, SecondRoute ] = routeArr
      this.defaultOpenKeys = SecondRoute ? [ SecondRoute, firstRoute ] : [ firstRoute ]
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
