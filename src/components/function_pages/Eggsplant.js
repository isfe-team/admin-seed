import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { DatePicker } from 'ant-design-vue'

@Component()
class Eggsplant extends Vue {
  render () {
    return <div>类组件（Class Based）<DatePicker.RangePicker showTime format='llll' /></div>
  }
}

export default Eggsplant
