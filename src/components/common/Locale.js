/*!
 * Locale Swapper | bqliu
 */

import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import { Icon, Select } from 'ant-design-vue'
import { i18n, supportedLocaleConfigs } from '@/i18n/setup'
import './Locale.less'

@Component()
class Locale extends Vue {
  @Mutation SET_LOCALE

  handleLocaleChange (lang) {
    this.SET_LOCALE(lang)
  }

  render () {
    return (
      <div class='locale'>
        <Icon type='swap' class='locale-swap-icon' />
        <Select defaultValue={i18n.locale} onChange={this.handleLocaleChange} size='small' class='locale-swapper'>
          {
            supportedLocaleConfigs.map((config) => <Select.Option value={config.locale}>{config.label}</Select.Option>)
          }
        </Select>
      </div>
    )
  }
}

export default Locale
