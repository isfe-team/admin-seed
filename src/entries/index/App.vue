<template>
  <ALocaleProvider :locale="zhCN">
    <!-- 加全局loading状态，暂时无用，因为这个遮不住所有的 -->
    <ASpin id="spin" :spinning="spinning">
      <div id="app">
        <AppHeader class="app-header" :collapsed="collapsed" @toggle-collapse-menu="toggleCollapseMenu"></AppHeader>
        <div class="app-content">
          <AppMenu class="app-menu" :collapsed="collapsed" :class="{ collapsed }"></AppMenu>
          <div class="app-page-wrapper">
            <ABreadcrumb class="app-breadcrumb">
              <template v-for="(route, index) in matchedRouteFragments">
                <ABreadcrumbItem :key="index">{{route.meta.label}}</ABreadcrumbItem>
              </template>
            </ABreadcrumb>
            <router-view class="app-page" />
          </div>
        </div>
      </div>
    </ASpin>
  </ALocaleProvider>
</template>

<script>
import AppHeader from '@/components/common/AppHeader'
import AppMenu from '@/components/common/AppMenu'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
export default {
  name: 'App',
  data () {
    return {
      collapsed: false,
      spinning: false,
      zhCN
    }
  },
  components: { AppHeader, AppMenu },
  computed: {
    matchedRouteFragments () {
      return this.$route.matched
    }
  },
  methods: {
    toggleCollapseMenu () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/styles/vars.less";

  #spin {
    height: 100%;

    & {
      /deep/ .ant-spin-container {
        height: 100%;
      }
    }
  }

  #app {
    height: 100%;
    .app-header {
      height: @app-header-height;
    }
    .app-content {
      height: calc(~"100% - @{app-header-height}");
      display: flex;

      .app-menu {
        flex: 0 0 @app-menu-width;

        &.collapsed {
          flex-basis: @collapsed-menu-width;
          transition: none; // prevent animation
        }
      }

      .app-page-wrapper {
        flex: 1 1 auto;
        padding: 20px;
        padding-top: 0;
        background: #F0F2F5;

        @breadcrumb-height: 40px;

        .app-breadcrumb {
          line-height: @breadcrumb-height;
        }
        .app-page {
          height: calc(~"100% - @{breadcrumb-height}");
          padding: 10px;
          background: #FFF;
        }
      }
    }
  }
</style>
