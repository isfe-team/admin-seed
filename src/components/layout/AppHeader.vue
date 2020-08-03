<template>
  <div class='app-header'>
    <slot />
    <div class='app-header-operations'>
      <span v-if="userInfo" class='app-header-user-info'>Hi, {{userInfo.name}}</span>
      <AIcon type='logout' class='app-header-icon' @click="logout" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: [ Object, null ],
      default () {
        return { }
      }
    }
  },
  methods: {
    logout () {
      this.$confirm({
        title: '是否退出系统？',
        onOk: () => {
          this.logoutCore()
        }
      })
    },
    logoutCore () {
      window.location.href = './login.html'
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~@/styles/vars.less";

  @component-prefix: app-header;

  .@{component-prefix} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 20px;

    .change-lang {
      width: 100px;
      margin-right: 10px;
    }

    &-icon {
      text-align: center;
      font-size: 20px;
      cursor: pointer;
    }

    &-user-info {
      font-size: 14px;
      margin-right: 10px;
    }
  }
</style>
