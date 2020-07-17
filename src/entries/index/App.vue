<!-- 加全局loading状态，暂时无用，因为这个遮不住所有的，注意这个注释不能放在 LocalProvider 和 Spin 中间，不然 LocalProvider 组件会报错 -->
<template>
  <ALocaleProvider :locale="antLocale">
    <ASpin v-if="inited" id="spin" :spinning="spinning">
      <AppLayout id="app" :horizontal="horizontal" :stickHeader="stickHeader" :menus="menus">
        <div class="app-content-wrapper">
          <ABreadcrumb class="app-breadcrumb">
           <ABreadcrumbItem v-for="(route, index) in matchedRouteFragments" :key="index">{{$t(route.meta.labelI18nKey)}}</ABreadcrumbItem>
          </ABreadcrumb>
          <router-view class="app-page" />
        </div>
      </AppLayout>
    </ASpin>
  </ALocaleProvider>
</template>

<script>
import 'moment/locale/zh-cn'
import menuResponseData from '@/menu.json'
import { mapGetters, mapActions } from 'vuex'
import AppLayout from '@/components/layout/AppLayout'
import { getUserInfo } from '@/apis/services/user'
import { showErrorTip } from '@/utils/helpers'
const menus = menuResponseData.data[0].childList
export default {
  data () {
    return {
      spinning: false,
      inited: false,
      horizontal: false,
      stickHeader: false,
      menus
    }
  },
  components: { AppLayout },
  computed: {
    ...mapGetters(['userInfo', 'locale', 'antLocale']),
    matchedRouteFragments () {
      return this.$route.matched
    }
  },
  beforeMount () {
    getUserInfo().then((user) => {
      this.setUserInfo(user)
      this.inited = true
    }, () => {
      showErrorTip('获取用户信息失败')
    })
    this.setAntLocaleInfo(this.locale)
  },
  methods: {
    ...mapActions(['setUserInfo', 'setAntLocaleInfo'])
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/vars.less";
  #spin {
    height: 100%;

    /deep/ .ant-spin-container {
      height: 100%;
    }
  }

  #app {
    .app-content-wrapper {
      height: 100%;
      padding: 0 @padding-sm @padding-sm;
      overflow: auto;
      background: #F5F5F5;

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

  #nprogress .spinner {
    top: 4px;
    right: 4px;
  }
</style>
