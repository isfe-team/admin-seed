<template>
  <ALocaleProvider :locale="zhCN">
    <!-- 加全局loading状态，暂时无用，因为这个遮不住所有的 -->
    <ASpin id="spin" :spinning="spinning">
      <AppLayout id="app" v-if="inited">
        <div class="app-content-wrapper">
          <ABreadcrumb class="app-breadcrumb">
            <template v-for="(route, index) in matchedRouteFragments">
              <ABreadcrumbItem :key="index">{{route.meta.label}}</ABreadcrumbItem>
            </template>
          </ABreadcrumb>
          <router-view class="app-page" />
        </div>
      </AppLayout>
    </ASpin>
  </ALocaleProvider>
</template>

<script>
import AppLayout from '@/components/layout/AppLayout'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { mapActions } from 'vuex'
import { getUserInfo } from '@/apis/services/user'
import { showErrorTip } from '@/utils/helpers'
import 'moment/locale/zh-cn'

export default {
  name: 'App',
  data () {
    return {
      spinning: false,
      zhCN,
      inited: false
    }
  },
  components: { AppLayout },
  computed: {
    matchedRouteFragments () {
      return this.$route.matched
    }
  },
  methods: {
    ...mapActions(['setUserInfo'])
  },
  beforeMount () {
    getUserInfo().then((user) => {
      this.setUserInfo(user)
      this.inited = true
    }, () => {
      showErrorTip('获取用户信息失败')
    })
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

  .app-content-wrapper {
    height: 100%;
    padding: 0 @padding-sm @padding-sm;
    background: #F0F2F5;

    .app-breadcrumb {
      line-height: @breadcrumb-height;
    }

    .app-page {
      height: calc(~"100% - @{breadcrumb-height}");
      padding: 10px;
      background: #FFF;
    }
  }
</style>
