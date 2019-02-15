/**
 * Header's vuex container | bqliu
 */

import Vue from 'vue'
import AppHeader from './AppHeader'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component({
  inheritAttrs: false
})
class AppHeaderContainer extends Vue {
  @State userInfo

  render () {
    return <AppHeader userInfo={this.userInfo} {...{ props: this.$attrs }} {...{ on: this.$listeners } }>{this.$slots.default}</AppHeader>
  }
}

export default AppHeaderContainer
