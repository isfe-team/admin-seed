<template>
  <div class="time-line">
    <div>
      <h3>基本的时间轴</h3>
      <a-timeline>
        <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
        <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
        <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
        <a-timeline-item>Network problems being solved 2015-09-01</a-timeline-item>
      </a-timeline>
    </div>
    <div>
      <h3>圆圈颜色</h3>
      <a-timeline>
        <a-timeline-item color="green">Create a services site 2015-09-01</a-timeline-item>
        <a-timeline-item color="green">Create a services site 2015-09-01</a-timeline-item>
        <a-timeline-item color="red">
          <p>Solve initial network problems 1</p>
          <p>Solve initial network problems 2</p>
          <p>Solve initial network problems 3 2015-09-01</p>
        </a-timeline-item>
        <a-timeline-item>
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </a-timeline-item>
        <a-timeline-item color="gray">
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </a-timeline-item>
        <a-timeline-item color="gray">
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </a-timeline-item>
      </a-timeline>
    </div>
    <div>
      <h3>自定义时间轴点</h3>
      <a-timeline>
        <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
        <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
        <a-timeline-item color="red">
          <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />Technical testing 2015-09-01
        </a-timeline-item>
        <a-timeline-item>Network problems being solved 2015-09-01</a-timeline-item>
      </a-timeline>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      reverse: false
    }
  },
  methods: {
    handleClick () {
      this.reverse = !this.reverse
    }
  }
}
</script>
<style lang="less" scoped>
.time-line {
  padding-bottom: 20px;
  h3{
    padding-bottom:10px;
  }
}
</style>
