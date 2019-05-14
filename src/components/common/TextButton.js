/*!
 * text button | bqliu
 */

import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import './TextButton.less'

@Component()
class TextButton extends Vue {
  @Prop({ type: Boolean, default: false }) disabled
  @Prop({ type: Boolean, default: false }) danger

  handleClick (evt) {
    if (this.disabled) {
      return
    }
    this.$emit('click', evt)
  }

  render () {
    const buttonClass = { 'x-text-button': true, disabled: this.disabled, danger: this.danger }
    return (
      <button class={buttonClass} disabled={this.disabled} onClick={this.handleClick}>
        {this.$slots.default}
      </button>
    )
  }
}

export default TextButton
