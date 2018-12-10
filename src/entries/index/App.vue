<template>
  <!-- ant-design-vue 语言转换成中文 -->
  <ALocaleProvider :locale="zhCN">
    <div id="app">
      <AppHeader class="app-header" :collapsed="collapsed" @toggle-collapse-menu="toggleCollapseMenu"></AppHeader>
      <div class="app-content">
        <AppMenu class="app-menu" :collapsed="collapsed" :class="{ collapsed }"></AppMenu>
        <div class="app-page-wrap">
          <ABreadcrumb>
            <template v-for="(route, index) in matchedRouteFragments">
              <ABreadcrumbItem :key="index">{{route.meta.label}}</ABreadcrumbItem>
            </template>
          </ABreadcrumb>
          <router-view class="app-content-page" />
        </div>
      </div>
    </div>
  </ALocaleProvider>
</template>

<script>
import AppHeader from '@/components/common/app-header'
import AppMenu from '@/components/common/app-menu'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
export default {
  name: 'App',
  data () {
    return {
      collapsed: false,
      zhCN
    }
  },
  components: { AppHeader, AppMenu },
  mounted () {
    console.log(this.$route)
  },
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
#app {
  width: 100%;
  height: 100%;
  .app-header {
    height: @app-header-height;
  }
  .app-content {
    height: calc( ~"100% - @{app-header-height}");
    display: flex;
    .app-menu {
      flex: 0 0 @app-menu-width;
      &.collapsed {
        flex-basis: @collapsed-menu-width;
        transition: none;
      }
    }
    .app-page-wrap {
      flex: 1 1 auto;
      background: #F0F2F5;
      padding: 20px;
      .app-content-page {
        background: #FFF;
      }
    }
  }
}
</style>
