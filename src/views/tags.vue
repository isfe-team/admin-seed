<template>
  <div>
    <div>
      <h3>基本用法 </h3>
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="选项一">内容一</a-tab-pane>
        <a-tab-pane key="2" tab="选项二" force-render>内容二</a-tab-pane>
        <a-tab-pane key="3" tab="选项三">内容三</a-tab-pane>
      </a-tabs>
    </div>
    <div style="padding-top:200px;">
      <h3>带图标 </h3>
      <a-tabs default-active-key="2">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="apple" />选项一
          </span>
          选项一
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon type="android" />选项二
          </span>
          选项二
        </a-tab-pane>
      </a-tabs>
    </div>
    <div style="padding-top:200px;">
      <h3>卡片式页签</h3>
      <a-tabs type="card" @change="callback">
        <a-tab-pane key="1" tab="选项一">内容一</a-tab-pane>
        <a-tab-pane key="2" tab="选项二">内容二</a-tab-pane>
        <a-tab-pane key="3" tab="选项三">内容三</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    callback (key) {
      console.log(key)
    }
  }
}
</script>
