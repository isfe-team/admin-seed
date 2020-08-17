/*!
 * 暂时使用的是 childList 为空，就认定是 MenuItem，但是这样的判断是不够的（假如集成权限配置）
 * 可以参考 docs/FAQ.md 的做法
 * @todo 层级处理目前只支持三层（因为 openKeys 我只取了三层）
 */

import Vue from 'vue'
import reverse from 'lodash/reverse'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Menu, Icon } from 'ant-design-vue'

@Component()
class AppMenu extends Vue {
  openKeys = []
  // 父级收起，折叠，然后再展开，所以需要 cachedOpenKeys
  cachedOpenKeys = []
  selectedKeys = []

  @Prop({ type: Array, default: [] }) menus
  @Prop({ type: String, default: 'inline' }) mode
  @Prop(Boolean) collapsed

  get rootSubmenuKeys () {
    return this.menus.map((x) => x.url)
  }

  @Watch('$route', { immediate: true })
  handle$routeChange () {
    this.calcMenuRoute()
  }

  @Watch('collapsed')
  handleCollapsedChange (val) {
    if (val) {
      this.cachedOpenKeys = this.openKeys
      this.openKeys = []
      return
    }
    this.openKeys = this.cachedOpenKeys
  }
  handleClick (value) {
    console.log(value)
  }

  handleSelect (data) {
    console.log(data)
    const keyPath = reverse(data.keyPath).join('::')
    this.$router.push({
      name: keyPath
    })
  }

  handleMenuOpenChange (openKeys) {
    if (openKeys.includes('overview')) {
      this.$router.push({
        path: '/overview/main'
      })
    }
    const latestOpenKey = openKeys.find((key) => this.openKeys.indexOf(key) === -1)
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.openKeys = openKeys
    } else {
      this.openKeys = latestOpenKey ? [latestOpenKey] : []
    }
  }

  calcMenuRoute () {
    if (!this.$route.name) {
      return
    }
    const routes = this.$route.name.split('::')
    this.selectedKeys = [routes[routes.length - 1]]
    if (this.mode === 'horizontal') {
      this.openKeys = []
      return
    }
    const [firstRoute, secondRoute] = routes
    const openKeys = secondRoute ? [secondRoute, firstRoute] : [firstRoute]

    if (this.collapsed) {
      this.cachedOpenKeys = openKeys
    } else {
      this.openKeys = openKeys
    }
  }

  render () {
    function getSubMenuFragment (menus) {
      if (!menus) {
        return false
      }
      function getMenuIcon (menu) {
        return menu.icon ? <Icon type={menu.icon} /> : null
      }
      const menusList = menus.map((menu) => {
        if (menu.meta && !menu.hidden) {
          const path = menu.path.replace(/\//g, '')
          if (!menu.children) {
            return <Menu.Item key={path}> {menu.meta.icon && <a-icon type={menu.meta.icon} />}<span class="menu-title">{menu.meta.label}</span></Menu.Item>
          }
          return (
            <Menu.SubMenu key={path}>
              <span slot="title" class="menu-title-wrapper">
                {getMenuIcon(menu)}
                {menu.meta.icon && <a-icon type={menu.meta.icon} />}
                <span class="menu-title">{menu.meta.label}</span>
              </span>
              {getSubMenuFragment(menu.children)}
            </Menu.SubMenu>
          )
        }
      })
      return menusList
    }

    const SubMenu = getSubMenuFragment(this.menus)

    return (
      <Menu
        class="app-menu"
        mode={this.mode}
        theme="dark"
        openKeys={this.openKeys}
        selectedKeys={this.selectedKeys}
        onOpenChange={this.handleMenuOpenChange}
        onClick={this.handleSelect}
      >
        {SubMenu}
      </Menu>
    )
  }
}

export default AppMenu
