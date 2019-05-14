import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Card } from 'ant-design-vue'
import './Overview.less'

@Component()
class Overview extends Vue {
  render () {
    return (
      <div class="overview-wrapper">
        <Card title={this.$t('overview.layoutTitle')}>
          {this.$t('overview.layoutDescriptions').map((desc) => (
            <p>{desc}</p>
          ))}
        </Card>
        <Card title={this.$t('overview.techTitle')}>
          <a href="http://doc.vue-js.com/v2/guide/">Vue2.0</a>
          <a href="https://cli.vuejs.org/">@vue/cli</a>
          <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce/">ant-design-vue</a>
          <a href="http://lesscss.org/#">less</a>
          <a href="https://github.com/axios/axios">axios</a>
          <a href="https://www.lodashjs.com/docs/4.17.5.html">lodash</a>
        </Card>
        <Card title={this.$t('overview.demandTitle')}>
          {this.$t('overview.demandDescriptions').map((desc) => (
            <p>{desc}</p>
          ))}
        </Card>
      </div>
    )
  }
}

export default Overview
