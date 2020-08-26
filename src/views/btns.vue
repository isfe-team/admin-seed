<template>
  <div id="demo">
    <a-radio-group :value="size" @change="handleSizeChange">
      <a-radio-button value="large">大尺寸</a-radio-button>
      <a-radio-button value="default">默认大小</a-radio-button>
      <a-radio-button value="small">小尺寸</a-radio-button>
    </a-radio-group>
    <br />
    <br />
    <a-button type="primary" :size="size">主按钮</a-button>
    <a-button :size="size">次按钮</a-button>
    <a-button type="dashed" :size="size">虚线按钮</a-button>
    <a-button type="danger" :size="size">危险按钮</a-button>
    <!-- <a-button type="link" :size="size">链接按钮</a-button> -->
    <a-button type="primary" disabled :size="size">按钮失效状态</a-button>

    <br />
    <br />
    <a-button type="primary" icon="download" :size="size" />
    <!-- <a-button type="primary"  icon="download" :size="size" /> -->
    <a-button type="primary" icon="download" :size="size">下载</a-button>
    <br />
    <br />
    <a-button-group :size="size">
      <a-button type="primary">
        <a-icon type="left" />向后
      </a-button>
      <a-button type="primary">
        向前
        <a-icon type="right" />
      </a-button>
    </a-button-group>
    <br />
    <br />
    <h3>正常大小按钮组合</h3>
    <a-button type="primary">主按钮</a-button>
    <a-button>默认按钮</a-button>
    <a-button type="dashed">虚线按钮</a-button>
    <a-button type="danger">危险按钮</a-button>
    <a-config-provider :auto-insert-space-in-button="false">
      <a-button type="primary">按钮</a-button>
    </a-config-provider>
    <a-button type="primary">按钮</a-button>
    <!-- <a-button type="link">链接按钮</a-button> -->
    <br />
     <br />
    <h3>按钮加载状态</h3>
    <a-button type="primary" loading>加载中</a-button>
    <a-button type="primary" size="small" loading>加载中</a-button>
    <br />
     <br />
    <a-button type="primary" :loading="loading" @mouseenter="enterLoading">移入按钮</a-button>
    <a-button type="primary" icon="poweroff" :loading="iconLoading" @click="enterIconLoading">延迟1s</a-button>
    <br />
     <br />
    <a-button type="primary" loading />
    <a-button type="danger"  loading />
  </div>
</template>
<script>
export default {
  data () {
    return {
      size: 'large',
      loading: false,
      iconLoading: false,
    }
  },
  methods: {
    handleSizeChange (e) {
      this.size = e.target.value
    },
    enterLoading () {
      this.loading = true
    },
    enterIconLoading () {
      this.iconLoading = { delay: 1000 }
    }
  }
}
</script>
<style lang="less" scoped>
[id^="demo"] .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
</style>
