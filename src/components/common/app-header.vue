<template>
  <div class="header">
    <div class="header-left" :class="{collapsed}">
      <div class="title-wrap">
        <img src="@/assets/logo.png" alt="" class="header-icon">
        <span class="header-title">Admin See</span>
      </div>
      <AIcon type="menu-fold" class="icon" @click="collapse" v-if="!collapsed" />
        <AIcon type="menu-unfold" class="icon" v-if="collapsed" @click="collapse" />
    </div>
    <div class="header-right">
      <AIcon type="logout" class="logout" @click="logout" />
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
    width: 100%;
    height: 100%;
    display: flex;
  }
  .header-left {
    display: flex;
    width: calc(@app-menu-width + 36px);
    align-items: center;
    .title-wrap {
      width: @app-menu-width;
      font-size: 18px;
      background: #002140;
      color: #FFF;
      height: @app-header-height;
      line-height: @app-header-height;
      .header-icon {
        width: 30px;
        height: 30px;
        margin-left: 25px;
      }
    }
    .icon {
      text-align: center;
      font-size: 20px;
      cursor: pointer;
      margin-left: 16px;
    }
  }
  .header-right {
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30px;
    .logout {
      cursor: pointer;
      font-size: 18px;
    }
  }
  .collapsed {
    width: calc(~"@{collapsed-menu-width} + 36px");
    .header-title {
      display: none;
    }
  }
</style>
