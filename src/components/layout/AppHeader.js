/*!
 * header content of app | bqliu
 */

import Vue from 'vue'
import { Component, Prop, Emit } from 'vue-property-decorator'
import './AppHeader.less'

@Component()
class AppHeader extends Vue {
  @Prop([ Object, null ]) userInfo

  @Emit('toggleCollapseMenu')
  collapse () { }

  logout () {
    this.$confirm({
      title: '是否退出系统？',
      onOk () {
        window.location.href = './login.html'
      }
    })
  }

  render () {
    return (
      <div class='app-header'>
        {this.$slots.default}
        <div class='app-header-operations'>
          { this.userInfo ? <span class='app-header-user-info'>Hi, {this.userInfo.name}</span> : null }
          <AIcon type='logout' class='app-header-icon' onClick={this.logout} />
        </div>
      </div>
    )
  }
}

export default AppHeader
