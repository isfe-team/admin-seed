<script>
import Vue from 'vue'
import 'moment/locale/zh-cn'
import { Action } from 'vuex-class'
import { Component } from 'vue-property-decorator'
import { LocaleProvider, Spin, Breadcrumb } from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import AppLayout from '@/components/layout/AppLayout'
import { getUserInfo } from '@/apis/services/user'
import { showErrorTip } from '@/utils/helpers'
// import menuResponseData from '@/menu.json'
import './entries/index/App.less'

@Component()
class App extends Vue {
  spinning = false
  inited = false
  horizontal = false
  stickHeader = false
  menus=[]

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
                <transition name='slide-fade'><div class="app-page"><router-view class="app-page-container" /></div></transition>
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
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateX(10px);
  opacity: 0;
}
</style>
