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
        <span class="menu-title">{{ $t(menu.namekeyi18n) }}</span>
      </AMenuItem>
      <SubMenu v-else :menu="menu" :key="menu.url"></SubMenu>
    </template>
  </AMenu>
</template>

<script>
import reverse from 'lodash/reverse'
import SubMenu from './ASubMenu'
import { mapGetters } from 'vuex'
import { showErrorTip } from '@/utils/helpers'

function getItemByMenus (menus, url) {
  let item = null
  function findItem (menus, url) {
    menus.forEach((x) => {
      if (x.url === url) {
        item = x
      }
      if (x.childList.length) {
        findItem(x.childList, url)
      }
    })
    return item
  }
  return findItem(menus, url)
}
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
    ...mapGetters(['menus']),
    rootSubmenuKeys () {
      return this.menus.map((x) => x.url)
    }
  },
  methods: {
    handleSelect (data) {
      // 在所有菜单里面找到该项
      const selectItem = getItemByMenus(this.menus, data.key)
      if (!selectItem) {
        showErrorTip(null, '菜单配置有误')
        return
      }
      this.$route.params.selectItem = selectItem
      const keyPath = reverse(data.keyPath).join('::')
      if (selectItem.vendorUrl) {
        this.$router.push({
          name: keyPath,
          params: { selectItem: selectItem.vendorUrl }
        })
        return
      }
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
      // 找到该项
      const routes = this.$route.name.split('::')
      this.selectedKeys = [ routes[routes.length - 1] ]
      const selectItem = getItemByMenus(this.menus, this.selectedKeys[0])
      // 判断是不是内嵌的
      // if (selectItem.vendorUrl) {
      //   this.$router.push({
      //     name: keyPath,
      //     params: { selectItem: selectItem.vendorUrl }
      //   })
      //   return
      // }
      this.$route.params.selectItem = selectItem.vendorUrl
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
