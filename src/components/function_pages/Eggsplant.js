import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component()
class Eggsplant extends Vue {
  render () {
    return <div>类组件（Class Based）</div>
  }
}

export default Eggsplant
