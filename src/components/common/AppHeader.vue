<template>
  <div class="header">
    <div class="header-title" :class="{collapsed}">
      <img src="@/assets/logo.png" alt="logo" class="logo">
      <span v-if="!collapsed">Admin Seed</span>
    </div>
    <div class="header-operations">
      <AIcon type="menu-fold" class="icon" @click="collapse" v-if="!collapsed" />
      <AIcon type="menu-unfold" class="icon" v-if="collapsed" @click="collapse" />
      <AIcon type="logout" class="icon" @click="logout" />
    </div>
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
          window.location.href = document.location.origin + '/login.html'
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "~@/styles/vars.less";

  .header {
    display: flex;
    width: 100%;
    height: 100%;
  }

  .header-title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 @app-menu-width;
    font-size: 18px;
    color: #FFF;
    background: #002140;

    &.collapsed {
      flex-basis: @collapsed-menu-width;

      .logo {
        margin-right: 0;
      }
    }

    .logo {
      width: 30px;
      height: 30px;
      margin-right: 6px;
    }
  }

  .header-operations {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 1 auto;
    padding-right: 30px;

    .icon {
      margin-left: 16px;
      text-align: center;
      font-size: 20px;
      cursor: pointer;
    }
  }
</style>
