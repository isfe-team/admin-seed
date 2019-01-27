<!--
 - header content of app | bqliu
 -->

<template>
  <div class="app-header">
    <div>
      <AIcon v-if="!collapsed" type="menu-fold" class="app-header-icon" @click="collapse" />
      <AIcon v-if="collapsed" type="menu-unfold" class="app-header-icon" @click="collapse" />
    </div>
    <div>
      <span class="app-header-user-info" v-if="userInfo">Hi, {{userInfo.name}}</span>
      <AIcon type="logout" class="app-header-icon" @click="logout" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return { }
  },
  props: [ 'collapsed', 'userInfo' ],
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

  @component-prefix: app-header;

  .@{component-prefix} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 20px;

    &-icon {
      text-align: center;
      font-size: 20px;
      cursor: pointer;
    }

    &-user-info {
      font-size: 16px;
      margin-right: 10px;
    }
  }
</style>
