import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Button } from 'ant-design-vue'
import './Figure.less'

@Component()
class Figure extends Vue {
  @Prop({ type: String, default: '' }) message
  @Prop({ type: String, default: '' }) description

  toMain () {
    this.$router.push({ name: 'overview' })
  }

  render () {
    return (
      <div class="figure">
        {this.$slots.default}
        <div class="figure-message-wrapper">
          <div class="message">{this.message}</div>
          <div class="description">{this.description}</div>
          <Button type="primary" onClick={this.toMain}>{this.$t('figure.toMain')}</Button>
        </div>
      </div>
    )
  }
}

export default Figure
