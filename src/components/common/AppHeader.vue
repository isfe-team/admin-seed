<template>
  <div class="app-header">
    <AIcon v-if="!collapsed" type="menu-fold" class="icon" @click="collapse" />
    <AIcon v-if="collapsed" type="menu-unfold" class="icon" @click="collapse" />
    <AIcon type="logout" class="icon" @click="logout" />
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return { }
  },
  props: [ 'collapsed' ],
  methods: {
    collapse () {
      this.$emit('toggle-collapse-menu')
    },
    logout () {
      this.$confirm({
        title: '是否退出系统',
        onOk () {
          window.location.href = './login.html'
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/styles/vars.less";

  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 20px;

    .icon {
      text-align: center;
      font-size: 20px;
      cursor: pointer;
    }
  }
</style>
