import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Card } from 'ant-design-vue'
import './Overview.less'

@Component()
class Overview extends Vue {
  render () {
    return (
      <div class="overview-wrapper">
        <Card title="页面整体布局">
          <p>总体左右布局</p>
          <p>左边上下布局，上为logo，下为menu</p>
          <p>右边上下布局，上为header，下为content</p>
        </Card>
        <Card title="主要使用的技术">
          <a href="http://doc.vue-js.com/v2/guide/">Vue2.0</a>
          <a href="https://cli.vuejs.org/">@vue/cli</a>
          <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce/">ant-design-vue</a>
          <a href="http://lesscss.org/#">less</a>
          <a href="https://github.com/axios/axios">axios</a>
          <a href="https://www.lodashjs.com/docs/4.17.5.html">lodash</a>
        </Card>
        <Card title="满足的大致需求">
          <p>从登录到具体业务开发到退出</p>
          <p>基于路由进行页面跳转</p>
        </Card>

      </div>
    )
  }
}

export default Overview
