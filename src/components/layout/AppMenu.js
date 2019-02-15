/*!
 * 暂时使用的是 childList 为空，就认定是 MenuItem，但是这样的判断是不够的（假如集成权限配置）
 * 可以参考 docs/FAQ.md 的做法
 * @todo 层级处理改成递归（目前只支持三层），现在是由于之前多次改动，导致直接平铺处理的...
 */

import Vue from 'vue'
import reverse from 'lodash/reverse'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { Menu, Icon } from 'ant-design-vue'

@Component()
class AppMenu extends Vue {
  openKeys = [ ]
  cachedOpenKeys = [ ]
  selectedKeys = [ ]

  @Prop({ type: Array, default: [ ] }) menus
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
      this.openKeys = [ ]
      return
    }
    this.openKeys = this.cachedOpenKeys
  }

  handleSelect (data) {
    const keypath = reverse(data.keyPath).join('::')
    this.$router.push({
      name: keypath
    })
  }

  handleMenuOpenChange (openKeys) {
    const latestOpenKey = openKeys.find((key) => this.openKeys.indexOf(key) === -1)
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.openKeys = openKeys
    } else {
      this.openKeys = latestOpenKey ? [ latestOpenKey ] : [ ]
    }
  }

  calcMenuRoute () {
    if (!this.$route.name) {
      return
    }
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

  render () {
    function getSubMenuFragment (menus) {
      function getMenuIcon (menu) {
        return menu.icon ? <Icon type={menu.icon} /> : null
      }
      return menus.map((menu) => {
        if (menu.childList.length === 0) {
          return <Menu.Item key={menu.url}>{getMenuIcon(menu)}<span class="menu-title">{menu.name}</span></Menu.Item>
        }
        return (
          <Menu.SubMenu key={menu.url}>
            <span slot="title" class="menu-title-wrapper">
              {getMenuIcon(menu)}
              <span class="menu-title">{ menu.name }</span>
            </span>
            {getSubMenuFragment(menu.childList)}
          </Menu.SubMenu>
        )
      })
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
