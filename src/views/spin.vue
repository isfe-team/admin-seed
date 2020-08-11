<template>
  <div class="spin">
    <div>
      <h3>基本用法</h3>
      <div class="spin-wrap">
        <a-spin size="small" />
        <a-spin />
        <a-spin size="large" />
      </div>
    </div>

    <h3>容器</h3>
    <div class="spin-example">
      <a-spin />
    </div>
    <div>
      <h3>自定义描述文案</h3>
      <a-spin tip="Loading...">
        <div class="spin-content">我的描述文案是自定义的。。。</div>
      </a-spin>
    </div>
    <div>
      <h3>自定义指示符</h3>
      <a-spin>
        <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
      </a-spin>
      <a-spin :indicator="indicator" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      indicator: <a-icon type="loading" style="font-size: 24px" spin />
    }
  }
}
</script>
<style lang="less" scoped>
.spin {
  width: 100%;
  h3 {
    padding:20px 0 10px 0;
  }
  .spin-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    .ant-spin-spinning {
      margin-right: 100px;
    }
  }
  .spin-example {
    text-align: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
  }
  .spin-content {
    border: 1px solid #91d5ff;
    background-color: #e6f7ff;
    padding: 30px;
  }
}
</style>
