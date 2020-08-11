<template>
  <div id="demo">
    <div>
      <h3>12 小时制</h3>
      <a-time-picker use12-hours @change="onChange" />
      <a-time-picker use12-hours format="h:mm:ss A" @change="onChange" />
      <a-time-picker use12-hours format="h:mm a" @change="onChange" />
    </div>
    <div>
      <br />
      <h3>24 小时制</h3>
      <a-time-picker :open="open" @openChange="handleOpenChange">
        <a-button
          slot="addon"
          slot-scope="panel"
          size="small"
          type="primary"
          @click="handleClose"
        >Ok {{ panel.prefixCls }}</a-button>
      </a-time-picker>
      <a-time-picker :open.sync="open2">
        <a-button slot="addon" size="small" type="primary" @click="handleClose">Ok</a-button>
      </a-time-picker>
    </div>
    <div>
      <br />
      <h3>三种大小</h3>
      <a-time-picker :default-value="moment('12:08:23', 'HH:mm:ss')" size="large" />
      <a-time-picker :default-value="moment('12:08:23', 'HH:mm:ss')" />
      <a-time-picker :default-value="moment('12:08:23', 'HH:mm:ss')" size="small" />
    </div>
    <div>
      <br />
      <h3>后缀图标自定义</h3>
      <a-time-picker :default-open-value="moment('00:00:00', 'HH:mm:ss')" @change="onChange">
        <a-icon slot="suffixIcon" type="smile" />
      </a-time-picker>
    </div>
    <div>
      <br />
      <h3>禁用</h3>
      <a-time-picker :default-value="moment('12:08:23', 'HH:mm:ss')" disabled />
    </div>
    <div>
      <br />
      <h3>步长选时间</h3>
      <a-time-picker :minute-step="15" :second-step="10" />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      open: false,
      open2: false,
      moment
    }
  },
  methods: {
    onChange (time, timeString) {
      console.log(time, timeString)
    },
    handleOpenChange (open) {
      this.open = open
    },
    handleClose () {
      this.open = false
      this.open2 = false
    }
  }
}
</script>
<style lang="less" scoped>
[id^="demo"] .ant-time-picker {
  margin: 0 8px 12px 0;
}
</style>
