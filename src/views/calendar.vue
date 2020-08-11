<template>
  <div class="calendar">
    <div>
      <h3>基本样式</h3>
      <a-calendar @panelChange="onPanelChange" />
    </div>
    <div>
      <h3>卡片模式</h3>
      <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
        <a-calendar :fullscreen="false" @panelChange="onPanelChange" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onPanelChange (value, mode) {
      console.log(value, mode)
    }
  }
}
</script>
<style lang="less">
.calendar{
  background:#fff;
  padding-bottom:30px;
  .ant-select {
    &.ant-fullcalendar-month-select {
      margin-left: 8px;
    }
  }
}
</style>
