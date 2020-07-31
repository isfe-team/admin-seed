<template>
  <div>
    <a-radio-group v-model="size">
      <a-radio-button value="large">
        Large
      </a-radio-button>
      <a-radio-button value="default">
        Default
      </a-radio-button>
      <a-radio-button value="small">
        Small
      </a-radio-button>
    </a-radio-group>
    <br /><br />
    <a-date-picker :size="size" />
    <br />
    <a-month-picker :size="size" placeholder="Select Month" />
    <br />
    <a-range-picker :size="size" />
    <br />
    <a-week-picker :size="size" placeholder="Select Week" />
  </div>
</template>
<script>
// import moment from 'moment'
export default {
  data () {
    return {
      size: 'default'
    }
  }
}
</script>
