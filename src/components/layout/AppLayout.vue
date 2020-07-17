<!--*!
 * major layout of app | bqliu
 *
 * @todo 优化 logo 和 h1 的展开收起展示
 -->
<template>
  <ALayout
    class="app-layout"
    :has-sider="true"
    :class="{'app-layout-horizontal': horizontal, 'app-layout-vertical': !this.horizontal, 'app-layout-header-stick': useStickHeaderMode }"
  >
    <ALayoutSider
      v-if="!horizontal"
      width="256"
      class="app-layout-sider"
      :trigger="null"
      collapsible
      :collapsed="collapsed"
    >
      <div class='app-layout-logo-wrapper'>
        <a href="/">
          <img :src="Logo" alt='logo' />
          <h1>Admin Seed</h1>
        </a>
      </div>
      <AppMenu :menus="menus" :mode="horizontal ? 'horizontal' : 'inline'" class='app-layout-menu' :collapsed="collapsed" />
    </ALayoutSider>
    <ALayout :class="{'app-layout': horizontal, 'app-layout-horizontal': horizontal, 'app-layout-header-stick': useStickHeaderMode}">
      <ALayoutHeader class='app-layout-header' :class="{'use-stick-header-mode': useStickHeaderMode }">
        <AppHeader class='app-layout-header-core'>
          <template v-if="horizontal">
            <h2 class='app-layout-title'><img class='app-layout-horizontal-logo' :src="Logo" alt='logo' />Admin Seed</h2>
            <AppMenu :menus="menus" :mode="horizontal ? 'horizontal' : 'inline'" class='app-layout-menu' :collapsed="collapsed" />
          </template>
          <template v-else>
            <AIcon :type="menuType" @click="toggleCollapse" class='app-layout-collapse-control' />
          </template>
        </AppHeader>
      </ALayoutHeader>
      <ALayoutContent class='app-layout-content'>
        <slot />
      </ALayoutContent>
    </ALayout>
  </ALayout>
</template>

<script>
import AppHeader from './AppHeaderContainer'
import AppMenu from './AppMenu'
import Logo from '@/assets/logo.png'
export default {
  data () {
    return {
      collapsed: false,
      Logo
    }
  },
  components: { AppMenu, AppHeader },
  props: {
    menus: {
      type: Array,
      default () {
        return []
      }
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    stickHeader: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 目前水平模式可以 stick，垂直的话其实没必要
    useStickHeaderMode () {
      return this.horizontal && this.stickHeader
    },
    menuType () {
      return this.collapsed ? 'menu-fold' : 'menu-unfold'
    }
  },
  methods: {
    toggleCollapse () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/vars.less";

.app-layout {
  height: 100%;

  &-sider {
    box-shadow: 2px 0 6px #777;
  }

  &-logo-wrapper {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    height: @app-header-height;
    line-height: @app-header-height;
    padding-left: @padding-lg;
    // white-space: nowrap;
    background-color: lighten(@layout-sider-background, 5%);
    overflow: hidden;

    img {
      width: 32px;
      height: 32px;
    }

    h1 {
      display: inline-block;
      margin-left: 12px;
      margin-bottom: 0;
      vertical-align: middle;
      font-size: 20px;
      color: #FFF;
    }
  }

  &-menu {
    max-height: calc(~"100% - @{layout-header-height}");
    overflow: auto;
  }

  &-collapse-control {
    font-size: 20px;
    cursor: pointer;
  }

  &-horizontal-logo {
    width: 40px;
  }

  .use-stick-header-mode {
    position: 'fixed';
    width: '100%';
    z-index: 1;
  }

  &-header {
    height: @app-header-height;
    line-height: @app-header-height;
    padding: 0;
  }

  &-content {
    height: 100%;
    // make it
    overflow: hidden;
    // or... min-height: 0;
  }

  &.app-layout-vertical {
    .app-header {
      background: #FFF;
    }
  }

  &.app-layout-horizontal {
    .app-layout-header-core,
    .app-layout-content-wrapper {
      max-width: 1200px;
      margin: auto;
    }

    &.app-layout-header-stick {
      overflow: auto;

      .app-layout-header {
        box-shadow: 2px 0 6px #777;
      }

      .app-layout-content {
        margin-top: @app-header-height;
        height: auto;
        overflow: initial;
      }
    }

    .app-layout-header {
      color: #FFF;
    }

    .app-layout-menu {
      flex: 1;
      margin: 0 20px;
      max-height: 100%;
      line-height: @app-header-height;
    }

    .app-layout-title {
      margin: 0;
      font-size: 20px;
      color: #FFF;
      font-weight: 400;
    }

    .app-layout-horizontal-logo {
      width: 40px;
      margin-right: 6px;
    }
  }
}
</style>
