import Vue from 'vue'
import { Component } from 'vue-property-decorator'

const Core = {
  render () { return <div>{this.$t('function.nestedComponent')}（Nested Component）</div> }
}

@Component()
class Corn extends Vue {
  render () {
    return (
      <div>
        <Core a="a" />
      </div>
    )
  }
}

export default Corn
