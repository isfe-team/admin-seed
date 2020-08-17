<script>
import Vue from 'vue'
import 'moment/locale/zh-cn'
import { Action } from 'vuex-class'
import { Component, Watch } from 'vue-property-decorator'
import { LocaleProvider, Spin, Breadcrumb } from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import AppLayout from '@/components/layout/AppLayout'
import { getUserInfo } from '@/apis/services/user'
import { showErrorTip } from '@/utils/helpers'
// import menuResponseData from '@/menu.json'
import '../../entries/index/App.less'

@Component()
class App extends Vue {
  spinning = false
  inited = false
  horizontal = false
  stickHeader = false
  menus=[]
  transitionName='bounce'

  get matchedRouteFragments () {
    return this.$route.matched
  }

  @Action setUserInfo

  beforeMount () {
    this.menus = this.$router.options.routes
    getUserInfo().then((user) => {
      this.setUserInfo(user)
      this.inited = true
    }, () => {
      showErrorTip('获取用户信息失败')
    })
  }
  @Watch('$route')
  handle$routeChange (val) {
    if (val.name === 'overview::main') {
      this.transitionName = 'bounce'
    } else {
      this.transitionName = 'slide-fade'
    }
  }

  render () {
    /* 加全局loading状态，暂时无用，因为这个遮不住所有的，注意这个注释不能放在 LocalProvider 和 Spin 中间，不然 LocalProvider 组件会报错 */
    return (
      <LocaleProvider locale={zhCN}>
        <Spin id="spin" spinning={this.spinning}>
          {
            !this.inited ? null : (<AppLayout id="app" horizontal={this.horizontal} stickHeader={this.stickHeader} menus={this.menus}>
              <div class="app-content-wrapper">
                <Breadcrumb class="app-breadcrumb">
                  {
                    this.matchedRouteFragments.map((route, index) => (<Breadcrumb.Item key={index}><router-link to={route.path}>{route.meta.label}</router-link></Breadcrumb.Item>))
                  }
                </Breadcrumb>
                <div class="app-page"><transition name={this.transitionName}><keep-alive><router-view class="app-page-container" /></keep-alive></transition></div>
              </div>
            </AppLayout>)
          }
        </Spin>
      </LocaleProvider>
    )
  }
}

export default App
</script>
<style lang="less">
.ant-menu-submenu-title{
    a{
        display:block;
    }
}
.slide-fade-enter-active {
  transition: all .3s ease-in;
}
.slide-fade-leave-active {
  transition: all .3s ease-out;
}
.slide-fade-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
 .slide-fade-leave-to{
     transform: translateX(-100%);
  opacity: 1;
 }
</style>
