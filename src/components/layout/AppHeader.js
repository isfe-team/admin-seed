/*!
 * header content of app | bqliu
 */

import Vue from 'vue'
import { Component, Prop, Emit } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'
// import { logout } from '@/apis/services/user'
import Locale from '@/components/common/Locale'
import './AppHeader.less'

@Component()
class AppHeader extends Vue {
  @Prop([ Object, null ]) userInfo

  @Emit('toggleCollapseMenu')
  collapse () { }

  logout () {
    this.$confirm({
      title: this.$t('tip.logoutTip') + '?',
      onOk () {
        this.logoutCore()
      }
    })
  }

  logoutCore () {
    window.location.href = './login.html'
  }

  dispatcher (x) {
    console.log('x', x)
  }

  mounted () {
    window.addEventListener('message', this.dispatcher)
  }

  beforeDestroy () {
    window.removeEventListeer('message', this.dispatcher)
  }

  render () {
    return (
      <div class='app-header'>
        {this.$slots.default}
        <div class='app-header-operations'>
          <Locale class='app-header-locale' />
          { this.userInfo ? <span class='app-header-user-info' title={this.userInfo.name}>Hi, {this.userInfo.name}</span> : null }
          <Icon type='logout' class='app-header-icon' onClick={this.logout} />
        </div>
      </div>
    )
  }
}

export default AppHeader
