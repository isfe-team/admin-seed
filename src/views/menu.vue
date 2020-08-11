<template>
  <div>
    <h3>顶部导航</h3>
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="mail">
        <a-icon type="mail" />导航一
      </a-menu-item>
      <a-menu-item key="app" disabled>
        <a-icon type="appstore" />导航二
      </a-menu-item>
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper">
          <a-icon type="setting" />导航三 - 子菜单
        </span>
        <a-menu-item-group title="Item 1">
          <a-menu-item key="setting:1">选项一</a-menu-item>
          <a-menu-item key="setting:2">选项二</a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Item 2">
          <a-menu-item key="setting:3">选项三</a-menu-item>
          <a-menu-item key="setting:4">选项四</a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="alipay">
        <a href="https://antdv.com" target="_blank" rel="noopener noreferrer">导航四 - 链接</a>
      </a-menu-item>
    </a-menu>
    <a-row style="margin-top:50px;">
      <a-col :span="10">
        <h3>垂直菜单，子菜单内嵌在菜单区域</h3>
        <div>
          <a-menu
            style="width: 256px;"
            :default-selected-keys="['1']"
            :open-keys.sync="openKeys"
            mode="inline"
            @click="handleClick"
          >
            <a-sub-menu key="sub1" @titleClick="titleClick">
              <span slot="title">
                <a-icon type="mail" />
                <span>Navigation One</span>
              </span>
              <a-menu-item-group key="g1">
                <template slot="title">
                  <a-icon type="qq" />
                  <span>Item 1</span>
                </template>
                <a-menu-item key="1">Option 1</a-menu-item>
                <a-menu-item key="2">Option 2</a-menu-item>
              </a-menu-item-group>
              <a-menu-item-group key="g2" title="Item 2">
                <a-menu-item key="3">Option 3</a-menu-item>
                <a-menu-item key="4">Option 4</a-menu-item>
              </a-menu-item-group>
            </a-sub-menu>
            <a-sub-menu key="sub2" @titleClick="titleClick">
              <span slot="title">
                <a-icon type="appstore" />
                <span>Navigation Two</span>
              </span>
              <a-menu-item key="5">Option 5</a-menu-item>
              <a-menu-item key="6">Option 6</a-menu-item>
              <a-sub-menu key="sub3" title="Submenu">
                <a-menu-item key="7">Option 7</a-menu-item>
                <a-menu-item key="8">Option 8</a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
            <a-sub-menu key="sub4">
              <span slot="title">
                <a-icon type="setting" />
                <span>Navigation Three</span>
              </span>
              <a-menu-item key="9">Option 9</a-menu-item>
              <a-menu-item key="10">Option 10</a-menu-item>
              <a-menu-item key="11">Option 11</a-menu-item>
              <a-menu-item key="12">Option 12</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-col>
      <a-col :span="10">
        <h3>内嵌菜单可以被缩起/展开</h3>
        <div style="width: 256px;">
          <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
          </a-button>
          <a-menu
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            mode="inline"
            theme="dark"
            :inline-collapsed="collapsed"
          >
            <a-menu-item key="1">
              <a-icon type="pie-chart" />
              <span>Option 1</span>
            </a-menu-item>
            <a-menu-item key="2">
              <a-icon type="desktop" />
              <span>Option 2</span>
            </a-menu-item>
            <a-menu-item key="3">
              <a-icon type="inbox" />
              <span>Option 3</span>
            </a-menu-item>
            <a-sub-menu key="sub1">
              <span slot="title">
                <a-icon type="mail" />
                <span>Navigation One</span>
              </span>
              <a-menu-item key="5">Option 5</a-menu-item>
              <a-menu-item key="6">Option 6</a-menu-item>
              <a-menu-item key="7">Option 7</a-menu-item>
              <a-menu-item key="8">Option 8</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title">
                <a-icon type="appstore" />
                <span>Navigation Two</span>
              </span>
              <a-menu-item key="9">Option 9</a-menu-item>
              <a-menu-item key="10">Option 10</a-menu-item>
              <a-sub-menu key="sub3" title="Submenu">
                <a-menu-item key="11">Option 11</a-menu-item>
                <a-menu-item key="12">Option 12</a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      current: ['mail'],
      collapsed: false,
      openKeys: ['sub1']
    }
  },
  watch: {
    openKeys (val) {
      console.log('openKeys', val)
    }
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    handleClick (e) {
      console.log('click', e)
    },
    titleClick (e) {
      console.log('titleClick', e)
    }
  }
}
</script>
