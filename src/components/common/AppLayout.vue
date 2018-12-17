<!--
 - @todo 优化 logo 和 h1 的展开展示
 -->

<template>
  <ALayout class="app-layout" :has-sider="true">
    <ALayoutSider width="256" :trigger="null" collapsible v-model="collapsed" class="app-layout-sider">
      <div class="logo-wrapper">
        <img src="@/assets/logo.png" alt="logo" class="logo">
        <h1 v-if="!collapsed">Admin Seed</h1>
      </div>
      <AppMenu :collapsed="collapsed" />
    </ALayoutSider>
    <ALayout>
      <ALayoutHeader class="app-layout-header">
        <AppHeader :collapsed="collapsed" @toggle-collapse-menu="handleCollapse" />
      </ALayoutHeader>
      <ALayoutContent class="app-layout-content">
        <slot />
      </ALayoutContent>
    </ALayout>
  </ALayout>
</template>

<script>
import AppHeader from './AppHeader'
import AppMenu from './AppMenu'

export default {
  name: 'AppLayout',
  data () {
    return {
      collapsed: false
    }
  },
  components: {
    AppHeader,
    AppMenu
  },
  methods: {
    handleCollapse () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/styles/vars.less";

  .app-layout {
    height: 100%;
  }

  .app-layout-sider {
    box-shadow: 2px 0 6px #777;
  }

  .app-layout-header {
    padding: 0;
    background: #FFF;
  }

  .app-layout-content {
    height: 100%;
    // make it
    overflow: hidden;
    // or... min-height: 0;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: @layout-header-height;
    line-height: @layout-header-height;
    white-space: nowrap;
    background-color: lighten(@layout-sider-background, 5%);

    .logo {
      width: 32px;
      height: 32px;
    }

    h1 {
      margin-left: 12px;
      margin-bottom: 0;
      font-size: 20px;
      color: #FFF;
    }
  }
</style>
