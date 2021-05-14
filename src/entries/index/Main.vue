<script>
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { Breadcrumb, Spin } from 'ant-design-vue'
import AppLayout from '@/components/layout/AppLayout'
import { showErrorTip, getErrorMessage } from '@/utils/helpers'

@Component()
class Main extends Vue {
  spinning = false
  inited = false
  horizontal = false
  stickHeader = false

  get matchedRouteFragments () {
    return this.$route.matched
  }

  @State menus
  @State locale
  @Action loadUserInfo
  @Action loadMenuData
  @Action loadLangs

  @Watch('locale', { immediate: true })
  handleLocaleChange (locale) {
    this.load(locale)
  }

  load (locale) {
    return Promise.all([
      this.loadUserInfo(),
      this.loadMenuData(locale),
      this.loadLangs()
    ]).then(() => {
      this.inited = true
    }, (err) => {
      showErrorTip(new Error(getErrorMessage(err, this.$t('error.GET_PRELOAD_INFO_ERROR'))))
    })
  }

  render () {
    let Content = null
    if (this.inited) {
      Content = (
        <AppLayout id="app" horizontal={this.horizontal} stickHeader={this.stickHeader} menus={this.menus}>
          <div class="app-content-wrapper">
            <Breadcrumb class="app-breadcrumb">
              {
                this.matchedRouteFragments.slice(1).map((route, index) => (<Breadcrumb.Item key={index}>{this.$t((route.meta.labelI18nKey || route.name))}</Breadcrumb.Item>))
              }
            </Breadcrumb>
            <router-view class="app-page" />
          </div>
        </AppLayout>
      )
    }
    /* 加全局loading状态，暂时无用，因为这个遮不住所有的，注意这个注释不能放在 LocalProvider 和 Spin 中间，不然 LocalProvider 组件会报错 */
    return (
      <Spin class="app-spin" spinning={this.spinning}>
        {Content}
      </Spin>
    )
  }
}

export default Main
</script>
