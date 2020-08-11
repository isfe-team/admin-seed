<template>
  <div id="message">
    <h3>全局提示,不同状态</h3>
    <a-button @click="success">成功</a-button>
    <a-button @click="error">错误</a-button>
    <a-button @click="warning">警告</a-button>
    <a-button @click="asyncSuccess">加载中...</a-button>
    <a-button @click="successTipMessage">消息序列</a-button>
    <a-button type="primary" @click="openMessage">动态添加状态</a-button>
  </div>
</template>
<script>
export default {
  methods: {
    success () {
      this.$message.success('This is a success message')
    },
    error () {
      this.$message.error('This is an error message')
    },
    warning () {
      this.$message.warning('This is a warning message')
    },
    asyncSuccess () {
      const hide = this.$message.loading('Action in progress..', 0)
      setTimeout(hide, 2500)
    },
    successTipMessage () {
      this.$message
        .loading('Action in progress..', 2.5)
        .then(() => this.$message.success('Loading finished', 2.5))
        .then(() => this.$message.info('Loading finished is finished', 2.5))
    },
    openMessage () {
      this.$message.loading('Loading...')
      setTimeout(() => {
        this.$message.success('Loaded')
      }, 1000)
    }
  }
}
</script>
<style lang="less">
#message {
  .ant-btn {
    margin:0 20px 20px 0;
  }
  h3{
    padding-bottom:5px;
  }
}
</style>
