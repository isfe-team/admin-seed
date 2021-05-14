/*!
 * Locale Swapper | bqliu
 */

import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
import { Icon, Select } from 'ant-design-vue'
import { i18n } from '@/i18n/setup'
import './Locale.less'
import qs from 'qs'

@Component()
class Locale extends Vue {
  @Mutation SET_LOCALE

  handleLocaleChange (id) {
    const queryParams = qs.parse(location.search.slice(1))
    queryParams.locale = id

    const queryString = qs.stringify(queryParams)
    // 每一次切换的时候都回到首页
    // location.href = '?' + queryString
    location.search = '?' + queryString
    // this.SET_LOCALE(lang)
  }

  @State languages
  mounted () {
    console.log(this.languages)
  }

  render () {
    return (
      <div class='locale'>
        <Icon type='swap' class='locale-swap-icon' />
        <Select defaultValue={i18n.locale} onChange={this.handleLocaleChange} size='small' class='locale-swapper'>
          {
            this.languages.map((config) => <Select.Option value={config.locale}>{config.label}</Select.Option>)
          }
        </Select>
      </div>
    )
  }
}

export default Locale
