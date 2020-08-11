<template>
  <div>
    <h3>基本用法</h3>
    <a-switch default-checked @change="onChange" />
    <a-switch default-checked :disabled="disabled" style="margin-left:18px" />
    <br />
    <br />
    <a-button type="primary" @click="onToggle">Toggle disabled</a-button>
    <div>
      <br />
      <h3>带有文字和图标</h3>
      <a-switch checked-children="开" un-checked-children="关" default-checked />
      <br />
      <br />
      <a-switch checked-children="1" un-checked-children="0" />
      <br />
      <br />

      <a-switch default-checked>
        <a-icon slot="checkedChildren" type="check" />
        <a-icon slot="unCheckedChildren" type="close" />
      </a-switch>
    </div>
    <div>
      <br />
      <h3>加载中</h3>
      <a-switch loading default-checked />
      <br />
      <a-switch size="small" loading />
    </div>
    <div>
      <br />

      <h3>两种大小</h3>
      <a-switch default-checked />
      <br />
      <a-switch size="small" default-checked />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      disabled: true
    }
  },
  methods: {
    onChange (checked) {
      console.log(`a-switch to ${checked}`)
    },
    onToggle () {
      this.disabled = !this.disabled
    }
  }
}
</script>
