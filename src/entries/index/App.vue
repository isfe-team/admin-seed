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
import menuResponseData from '@/menu.json'
import './App.less'

const menus = menuResponseData.data[0].childList

@Component()
class App extends Vue {
  spinning = false
  inited = false
  horizontal = true
  stickHeader = false

  get matchedRouteFragments () {
    return this.$route.matched
  }

  @Action setUserInfo

  beforeMount () {
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
            !this.inited ? null : (<AppLayout id="app" horizontal={this.horizontal} stickHeader={this.stickHeader} menus={menus}>
              <div class="app-content-wrapper">
                <Breadcrumb class="app-breadcrumb">
                  {
                    this.matchedRouteFragments.map((route, index) => (<Breadcrumb.Item key={index}>{route.meta.label}</Breadcrumb.Item>))
                  }
                </Breadcrumb>
                <router-view class="app-page" />
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
