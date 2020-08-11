<template>
  <div class="dropmenu">
    <div class="top-btn">
      <a-dropdown-button @click="handleButtonClick">
        下拉菜单
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="user" />1st menu item
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="user" />2nd menu item
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="user" />3rd item
          </a-menu-item>
        </a-menu>
      </a-dropdown-button>
      <a-dropdown-button disabled style="margin-left: 8px" @click="handleButtonClick">
        下拉菜单
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="user" />1st menu item
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="user" />2nd menu item
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="user" />3rd item
          </a-menu-item>
        </a-menu>
      </a-dropdown-button>
      <a-dropdown>
        <a-menu slot="overlay" @click="handleMenuClick">
          <a-menu-item key="1">
            <a-icon type="user" />1st menu item
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="user" />2nd menu item
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="user" />3rd item
          </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          按钮
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>
    <h3>弹出位置</h3>
    <div class="direction">
      <div v-for="placement in placements" :key="placement">
        <a-dropdown :placement="placement">
          <a-button>{{ placement }}</a-button>
          <a-menu slot="overlay">
            <a-menu-item>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.alipay.com/"
              >1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.taobao.com/"
              >2nd menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.tmall.com/"
              >3rd menu item</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <br />
      </div>
    </div>
    <div>
      <h3 style="padding:30px 0 0px 0;">其他元素</h3>
      <a-dropdown>
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          Hover me
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item key="0">
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
          </a-menu-item>
          <a-menu-item key="1">
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3" disabled>3rd menu item（disabled）</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <div style="padding-top:30px;">
      <h3>多级菜单</h3>
      <a-dropdown>
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          Cascading menu
          <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>1st menu item</a-menu-item>
          <a-menu-item>2nd menu item</a-menu-item>
          <a-sub-menu key="test" title="sub menu">
            <a-menu-item>3rd menu item</a-menu-item>
            <a-menu-item>4th menu item</a-menu-item>
          </a-sub-menu>
          <a-sub-menu title="disabled sub menu" disabled>
            <a-menu-item>5d menu item</a-menu-item>
            <a-menu-item>6th menu item</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      placements: [
        'bottomLeft',
        'bottomCenter',
        'bottomRight',
        'topLeft',
        'topCenter',
        'topRight'
      ]
    }
  },
  methods: {
    handleButtonClick (e) {
      console.log('click left button', e)
    },
    handleMenuClick (e) {
      console.log('click', e)
    }
  }
}
</script>
<style lang="less">
.dropmenu {
  .direction {
    display: flex;
    > div {
      margin-right: 10px;
    }
  }
  .top-btn {
    padding-bottom: 30px;
    .ant-btn-group {
      margin-right: 10px;
      .ant-btn {
        vertical-align: middle;
      }
    }
  }
}
</style>
