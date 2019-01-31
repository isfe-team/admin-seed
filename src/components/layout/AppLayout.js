/*!
 * major layout of app | bqliu
 *
 * @todo 优化 logo 和 h1 的展开收起展示
 */

import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Layout } from 'ant-design-vue'
import AppHeader from './AppHeaderContainer'
import AppMenu from './AppMenu'
import Logo from '@/assets/logo.png'
import './AppLayout.less'

@Component()
class AppLayout extends Vue {
  collapsed = false

  handleCollapse () {
    this.collapsed = !this.collapsed
  }

  render () {
    return (
      <Layout class="app-layout" has-sider={true}>
        <Layout.Sider width="256" trigger={null} collapsible collapsed={this.collapsed} class="app-layout-sider">
          <div class="app-layout-logo-wrapper">
            <img src={Logo} alt="logo" />
            {this.collapsed ? null : <h1>Admin Seed</h1>}
          </div>
          <AppMenu class="app-layout-menu" collapsed={this.collapsed} />
        </Layout.Sider>
        <Layout>
          <Layout.Header class="app-layout-header">
            <AppHeader class="app-layout-header-core" collapsed={this.collapsed} onToggleCollapseMenu={this.handleCollapse} />
          </Layout.Header>
          <Layout.Content class="app-layout-content">
            {this.$slots.default}
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

export default AppLayout
