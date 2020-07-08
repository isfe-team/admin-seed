
<template>
  <div>
    <div>内嵌组件（Nested Component）</div>
    <ATimePicker @change="onChange" :defaultValue="moment('02:00:00', 'HH:mm:ss')" />
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Corn',
  data () {
    return {
      moment
    }
  },
  methods: {
    onChange (time, timeString) {
      console.log('LOG', time, timeString)
    }
  }
}
</script>
