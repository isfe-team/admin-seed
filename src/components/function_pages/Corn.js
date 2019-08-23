import Vue from 'vue'
import moment from 'moment'
import { TimePicker } from 'ant-design-vue'
import { Component } from 'vue-property-decorator'

const Core = {
  render () { return <div>内嵌组件（Nested Component）</div> }
}

@Component()
class Corn extends Vue {
  onChange (time, timeString) {
    console.log('LOG', time, timeString)
  }

  render () {
    return (
      <div>
        <Core a="a" />
        <TimePicker onChange={this.onChange} defaultValue={moment('02:00:00', 'HH:mm:ss')} />
      </div>
    )
  }
}

export default Corn
