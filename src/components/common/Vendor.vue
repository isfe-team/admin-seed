<!--vendor容器组件，比如做第三方应用嵌套-->
<template>
  <div class="iframe-wrapper">
    <iframe ref="iframe" :src="src" v-if="src" class="iframe-core"></iframe>
  </div>
</template>

<script>
export default {
  name: 'Vendor',
  computed: {
    src () {
      const $route = this.$route
      if ($route.params.selectItem) {
        return $route.params.selectItem
      }
      return ''
    }
  },
  mounted () {
    window.addEventListener('message', this.messageHandler)
  },
  beforeDestroy () {
    window.removeEventListener('message', this.messageHandler)
  },
  methods: {
    // 这个方法可以解决跳到固定的路由时由于另外一个系统会有一个默认路由跳转问题，比如我想跳某个系统的音频测听页面，但是刚进去那个系统可能会先跳到默认路由也就是首页模块，此时需要这个事件
    // 需要不需要它取决于需求，如果只需要内嵌一个系统，那可注释掉，反之需要它
    messageHandler (evt) {
      if (evt.data && evt.data.type === 'ROUTER_AFTER_EACH') {
        const { payload } = evt.data
        const toName = payload.to.name
        // @TODO 不太好，但是比较简单
        console.log(payload, 'payload')
        const firstName = toName.split('::')[0]
        if (this.$refs.iframe.src.indexOf(firstName) === -1) {
          console.log('FORCE REDIRECT FROM', this.$refs.iframe.src)
          console.log('FORCE REDIRECT TO', this.iframeSrc)
          this.$refs.iframe.src = this.iframeSrc
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .iframe-wrapper {
    width: 100%;
    height: 100%;

    .iframe-core {
      width: 100%;
      height: 98%;
      padding: 0 !important;
      border: none;
      padding: 0;
    }
  }
</style>
