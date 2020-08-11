<template>
  <div class="popover">
    <h3>不同位置</h3>
    <div :style="{ marginLeft: `${buttonWidth}px`, whiteSpace: 'nowrap' }">
      <a-popover placement="topLeft">
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <template slot="title">
          <span>Title</span>
        </template>
        <a-button>TL</a-button>
      </a-popover>
      <a-popover placement="top">
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <template slot="title">
          <span>Title</span>
        </template>
        <a-button>Top</a-button>
      </a-popover>
      <a-popover placement="topRight">
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <template slot="title">
          <span>Title</span>
        </template>
        <a-button>TR</a-button>
      </a-popover>
    </div>
    <div :style="{ width: `${buttonWidth}px`, float: 'left' }">
      <a-popover placement="leftTop">
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <template slot="title">
          <span>Title</span>
        </template>
        <a-button>LT</a-button>
      </a-popover>
      <a-popover placement="left">
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <template slot="title">
          <span>Title</span>
        </template>
        <a-button>Left</a-button>
      </a-popover>
      <a-popover placement="leftBottom">
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <template slot="title">
          <span>Title</span>
        </template>
        <a-button>LB</a-button>
      </a-popover>
    </div>
    <div :style="{ width: `${buttonWidth}px`, marginLeft: `${buttonWidth * 4 + 24}px` }">
      <a-popover placement="rightTop">
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <template slot="title">
          <span>Title</span>
        </template>
        <a-button>RT</a-button>
      </a-popover>
      <a-popover placement="right">
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <template slot="title">
          <span>Title</span>
        </template>
        <a-button>Right</a-button>
      </a-popover>
      <a-popover placement="rightBottom">
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <template slot="title">
          <span>Title</span>
        </template>
        <a-button>RB</a-button>
      </a-popover>
    </div>
    <div :style="{ marginLeft: `${buttonWidth}px`, clear: 'both', whiteSpace: 'nowrap' }">
      <a-popover placement="bottomLeft">
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <template slot="title">
          <span>Title</span>
        </template>
        <a-button>BL</a-button>
      </a-popover>
      <a-popover placement="bottom">
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <template slot="title">
          <span>Title</span>
        </template>
        <a-button>Bottom</a-button>
      </a-popover>
      <a-popover placement="bottomRight">
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <template slot="title">
          <span>Title</span>
        </template>
        <a-button>BR</a-button>
      </a-popover>
    </div>
    <div class="btns-demo">
      <p>箭头指向:</p>
      <a-popover placement="topLeft">
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <span slot="title">Title</span>
        <a-button>Align edge / 边缘对齐</a-button>
      </a-popover>
      <a-popover placement="topLeft" arrow-point-at-center>
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <span slot="title">Title</span>
        <a-button>Arrow points to center / 箭头指向中心</a-button>
      </a-popover>
    </div>
    <div style="margin-top:30px;">
      <h3>三种触发方式</h3>
      <div>
        <a-popover title="Title" trigger="hover">
          <template slot="content">
            <p>Content</p>
            <p>Content</p>
          </template>
          <a-button type="primary">Hover me</a-button>
        </a-popover>
        <a-popover title="Title" trigger="focus">
          <template slot="content">
            <p>Content</p>
            <p>Content</p>
          </template>
          <a-button type="primary">Focus me</a-button>
        </a-popover>
        <a-popover title="Title" trigger="click">
          <template slot="content">
            <p>Content</p>
            <p>Content</p>
          </template>
          <a-button type="primary">Click me</a-button>
        </a-popover>
      </div>
    </div>
    <div style="margin-top:30px;">
      <h3>基本用法</h3>
      <a-popover title="Title">
        <template slot="content">
          <p>Content</p>
          <p>Content</p>
        </template>
        <a-button type="primary">Hover me</a-button>
      </a-popover>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      buttonWidth: 70
    }
  }
}
</script>
<style lang="less" scoped>
.popover {
  h3 {
    padding-bottom: 10px;
  }
  div {
    &:not(.btns-demo) {
      .ant-btn {
        width: 70px;
        text-align: center;
        padding: 0;
        margin-right: 8px;
        margin-bottom: 8px;
      }
    }
  }
  .btns-demo {
    margin-top: 30px;
    .ant-btn {
      margin-right: 20px;
    }
  }
}
</style>
