/*!
 * major layout of app | bqliu
 *
 * @todo 优化 logo 和 h1 的展开收起展示
 */

import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Layout } from 'ant-design-vue'
import AppHeader from './AppHeaderContainer'
import AppMenu from './AppMenu'
import Logo from '@/assets/logo.png'
import './AppLayout.less'

@Component()
class AppLayout extends Vue {
  collapsed = false

  @Prop({ type: Array, default: [ ] }) menus
  @Prop({ type: Boolean, default: false }) horizontal
  @Prop({ type: Boolean, default: false }) stickHeader

  toggleCollapse () {
    this.collapsed = !this.collapsed
  }

  render () {
    const horizontal = this.horizontal
    const Menu = <AppMenu menus={this.menus} mode={horizontal ? 'horizontal' : 'inline'} class='app-layout-menu' collapsed={this.collapsed} />
    const CollapseControlIcon = <AIcon type={this.collapsed ? 'menu-fold' : 'menu-unfold'} class='app-layout-collapse-control' onClick={this.toggleCollapse} />
    const HorizontalHeaderContent = [<h2 class='app-layout-title'><img class='app-layout-horizontal-logo' src={Logo} alt='logo' />Admin Seed</h2>, Menu]

    // 目前水平模式可以 stick，垂直的话其实没必要
    const useStickHeaderMode = horizontal && this.stickHeader

    const LayoutHeader = (
      <Layout.Header class='app-layout-header' style={ useStickHeaderMode ? { position: 'fixed', zIndex: 1, width: '100%' } : null}>
        <AppHeader class='app-layout-header-core'>
          {this.horizontal ? HorizontalHeaderContent : CollapseControlIcon}
        </AppHeader>
      </Layout.Header>
    )

    const layoutClass = { 'app-layout': true, 'app-layout-horizontal': this.horizontal, 'app-layout-vertical': !this.horizontal, 'app-layout-header-stick': useStickHeaderMode }

    const Content = (
      <Layout class={horizontal ? layoutClass : null}>
        {LayoutHeader}
        <Layout.Content class='app-layout-content'>
          {this.$slots.default}
        </Layout.Content>
      </Layout>
    )

    if (horizontal) {
      return Content
    }

    // {this.collapsed ? null : <h1>Admin Seed</h1>}
    return (
      <Layout class={layoutClass} has-sider={true}>
        <Layout.Sider width='256' trigger={null} collapsible collapsed={this.collapsed} class='app-layout-sider'>
          <div class='app-layout-logo-wrapper'>
            <a href="/">
              <img src={Logo} alt='logo' />
              <h1>管理系统</h1>
            </a>
          </div>
          {Menu}
        </Layout.Sider>
        {Content}
      </Layout>
    )
  }
}

export default AppLayout
