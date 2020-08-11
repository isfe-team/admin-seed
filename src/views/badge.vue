<template>
  <div id="demo">
    <div>
      <h3>基本样式</h3>
      <a-badge count="5">
        <a href="#" class="head-example" />
      </a-badge>
      <a-badge count="0" show-zero>
        <a href="#" class="head-example" />
      </a-badge>
      <a-badge>
        <a-icon slot="count" type="clock-circle" style="color: #f5222d" />
        <a href="#" class="head-example" />
      </a-badge>
    </div>
    <br />
    <br />
    <div id="components-badge-demo-dot">
      <h3>没有具体的数字</h3>
      <a-badge dot>
        <a-icon type="bell" />
      </a-badge>
      <a-badge :count="0" dot>
        <a-icon type="bell" />
      </a-badge>
      <a-badge dot>
        <a href="#">Link something</a>
      </a-badge>
    </div>
    <br />
    <br />
    <div>
      <h3>统计</h3>
      <a-badge :count="count">
        <a href="#" class="head-example" />
      </a-badge>
      <a-button-group style="padding-left:30px;">
        <a-button @click="decline">
          <a-icon type="minus" />
        </a-button>
        <a-button @click="increase">
          <a-icon type="plus" />
        </a-button>
      </a-button-group>
    </div>
    <br />
    <br />
    <div>
      <h3>显示隐藏点</h3>
      <a-badge :dot="show">
        <a href="#" class="head-example" />
      </a-badge>
      <a-switch v-model="show" />
    </div>
    <br />
    <br />
    <div>
      <h3>封顶数字</h3>
      <a-badge :count="99">
        <a href="#" class="head-example" />
      </a-badge>
      <a-badge :count="100">
        <a href="#" class="head-example" />
      </a-badge>
      <a-badge :count="99" :overflow-count="10">
        <a href="#" class="head-example" />
      </a-badge>
      <a-badge :count="1000" :overflow-count="999">
        <a href="#" class="head-example" />
      </a-badge>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      count: 5,
      show: true
    }
  },
  methods: {
    decline () {
      let count = this.count - 1
      if (count < 0) {
        count = 0
      }
      this.count = count
    },
    increase () {
      this.count++
    }
  }
}
</script>
<style lang="less" scoped>
[id^="demo"] {
  .ant-badge{
    margin-right:20px;
  }
 h3{
   padding-bottom:10px;
 }
  .head-example {
    width: 42px;
    height: 42px;
    border-radius: 4px;
    background: #eee;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
