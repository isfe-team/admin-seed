<template>
  <div>
    <h3>输入框大小</h3>
    <a-radio-group v-model="size">
      <a-radio-button value="large">大尺寸</a-radio-button>
      <a-radio-button value="default">默认大小</a-radio-button>
      <a-radio-button value="small">小尺寸</a-radio-button>
    </a-radio-group>
    <br />
    <br />
    <a-date-picker :size="size" />
    <br />
    <br />
    <a-month-picker :size="size" placeholder="选择月份" />
    <br />
    <br />
    <a-range-picker :size="size" />
    <br />
    <br />
    <a-week-picker :size="size" placeholder="选择星期" />
    <div>
      <h3 style="margin:30px 0 10px 0;">日期时间选择</h3>
      <a-date-picker show-time placeholder="Select Time" @change="onChange" @ok="onOk" />
      <br />
      <br />
      <a-range-picker
        :show-time="{ format: 'HH:mm' }"
        format="YYYY-MM-DD HH:mm"
        :placeholder="['Start Time', 'End Time']"
        @change="onChange"
        @ok="onOk"
      />
    </div>
    <div>
      <h3 style="margin:30px 0 10px 0;">可以添加后缀图标</h3>
      <a-date-picker @change="onChange">
        <a-icon slot="suffixIcon" type="smile" />
      </a-date-picker>
      <br />
       <br />
      <a-month-picker placeholder="Select month" @change="onChange">
        <a-icon slot="suffixIcon" type="smile" />
      </a-month-picker>
      <br />
       <br />
      <a-range-picker @change="onChange">
        <a-icon slot="suffixIcon" type="smile" />
      </a-range-picker>
      <br />
       <br />
      <a-week-picker placeholder="Select week" @change="onChange">
        <a-icon slot="suffixIcon" type="smile" />
      </a-week-picker>
      <br />
       <br />
      <a-date-picker suffix-icon="ab" @change="onChange" />
      <br />
       <br />
      <a-month-picker suffix-icon="ab" placeholder="Select month" @change="onChange" />
      <br />
       <br />
      <a-range-picker suffix-icon="ab" @change="onChange" />
      <br />
       <br />
      <a-week-picker suffix-icon="ab" placeholder="Select week" @change="onChange" />
    </div>
  </div>
</template>
<script>
// import moment from 'moment'
export default {
  data () {
    return {
      size: 'default'
    }
  },
  methods: {
    onChange (value, dateString) {
      console.log('Selected Time: ', value)
      console.log('Formatted Selected Time: ', dateString)
    },
    onOk (value) {
      console.log('onOk: ', value)
    }
  }
}
</script>
