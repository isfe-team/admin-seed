<!--
 * 暂时使用的是 childList 为空，就认定是 MenuItem，但是这样的判断是不够的（假如集成权限配置）
 * 可以参考 docs/FAQ.md 的做法
 * @todo 层级处理目前只支持三层（因为 openKeys 我只取了三层）
 -->
<template>
  <AMenu
    class="app-menu"
    :mode="mode"
    theme="dark"
    :openKeys="openKeys"
    :selectedKeys="selectedKeys"
    @openChange="handleMenuOpenChange"
    @click="handleSelect"
  >
    <template v-for="menu in menus">
      <AMenuItem class="menu-title-wrapper" v-if="menu.childList.length === 0" :key="menu.url">
        <AIcon :type="menu.icon" v-if="menu.icon" />
        <span class="menu-title">{{ menu.name }}</span>
      </AMenuItem>
      <SubMenu v-else :menu="menu" :key="menu.url"></SubMenu>
    </template>
  </AMenu>
</template>

<script>
import reverse from 'lodash/reverse'
import SubMenu from './ASubMenu'
export default {
  data () {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    }
  },
  components: { SubMenu },
  props: {
    menus: {
      type: Array,
      default () {
        return []
      }
    },
    mode: {
      type: String,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    $route () {
      this.calcMenuRoute()
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
      const keyPath = reverse(data.keyPath).join('::')
      this.$router.push({
        name: keyPath
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
      if (!this.$route.name) {
        return
      }
      const routes = this.$route.name.split('::')
      this.selectedKeys = [ routes[routes.length - 1] ]
      if (this.mode === 'horizontal') {
        this.openKeys = []
        return
      }
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
