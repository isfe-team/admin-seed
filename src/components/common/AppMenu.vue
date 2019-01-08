<!--
 - 暂时使用的是 childList 为空，就认定是 MenuItem，但是这样的判断是不够的（假如集成权限配置）
 - 可以参考 docs/FAQ.md 的做法
 - @todo 层级处理改成递归（目前只支持三层），现在是由于之前多次改动，导致直接平铺处理的...
 -->

<template>
  <!-- 注意得 @openChange 而不是 @open-change -->
  <AMenu
    class="app-menu"
    mode="inline"
    :open-keys="openKeys"
    :selected-keys="selectedKeys"
    @openChange="handleMenuOpenChange"
    @click="handleSelect"
    theme="dark"
  >
    <template v-for="menu in menus">
      <AMenuItem v-if="menu.childList.length === 0" :key="menu.url">
        <AIcon :type="menu.icon" />
        <span class="menu-title">{{ menu.name }}</span>
      </AMenuItem>
      <ASubMenu :key="menu.url" v-else>
        <span slot="title" class="menu-title-wrapper">
          <AIcon v-if="menu.icon" :type="menu.icon" />
          <span class="menu-title">{{ menu.name }}</span>
        </span>
        <template v-for="subMenu in menu.childList">
          <AMenuItem v-if="subMenu.childList.length === 0" :key="subMenu.url">
            <AIcon v-if="subMenu.icon" :type="subMenu.icon" />
            <span class="menu-title">{{ subMenu.name }}</span>
          </AMenuItem>
          <ASubMenu :key="subMenu.url" v-else>
            <span slot="title" class="menu-title-wrapper">
              <AIcon v-if="subMenu.icon" :type="subMenu.icon" />
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
import reverse from 'lodash/reverse'
import menu from '@/menu.json'

export default {
  name: 'AppMenu',
  data () {
    return {
      openKeys: [ ],
      cachedOpenKeys: [ ],
      selectedKeys: [ ],
      menus: menu.data[0].childList
    }
  },
  props: {
    collapsed: {
      type: Boolean
    }
  },
  watch: {
    $route: {
      handler () {
        this.calcMenuRoute()
      },
      immediate: true
    },
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys
        this.openKeys = [ ]
        return
      }
      this.openKeys = this.cachedOpenKeys
    }
  },
  computed: {
    rootSubmenuKeys () {
      return this.menus.map((x) => x.url)
    }
  },
  methods: {
    handleSelect (data) {
      const keypath = reverse(data.keyPath).join('::')
      this.$router.push({
        name: keypath
      })
    },
    handleMenuOpenChange (openKeys) {
      const latestOpenKey = openKeys.find((key) => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [ latestOpenKey ] : [ ]
      }
    },
    calcMenuRoute () {
      const routes = this.$route.name.split('::')
      this.selectedKeys = [ routes[routes.length - 1] ]
      const [ firstRoute, secondRoute ] = routes
      const openKeys = secondRoute ? [ secondRoute, firstRoute ] : [ firstRoute ]

      if (this.collapsed) {
        this.cachedOpenKeys = openKeys
      } else {
        this.openKeys = openKeys
      }
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
