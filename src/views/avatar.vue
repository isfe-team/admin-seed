<template>
  <div id="demo">
    <div>
      <h3>基本样式,大小不同</h3>
      <a-avatar :size="64" icon="user" />
      <a-avatar size="large" icon="user" />
      <a-avatar icon="user" />
      <a-avatar size="small" icon="user" />
    </div>
    <br />

    <div>
      <a-avatar shape="square" :size="64" icon="user" />
      <a-avatar shape="square" size="large" icon="user" />
      <a-avatar shape="square" icon="user" />
      <a-avatar shape="square" size="small" icon="user" />
    </div>
    <br />
    <br />
    <div>
      <h3>带徽标的头像</h3>
      <span style="margin-right:24px">
        <a-badge :count="1">
          <a-avatar shape="square" icon="user" />
        </a-badge>
      </span>
      <span>
        <a-badge dot>
          <a-avatar shape="square" icon="user" />
        </a-badge>
      </span>
    </div>
    <br />
    <br />
    <div>
      <h3>支持多类型</h3>
      <a-avatar icon="user" />
      <a-avatar>
        <a-icon slot="icon" type="user" />
      </a-avatar>
      <a-avatar>U</a-avatar>
      <a-avatar>USER</a-avatar>
      <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <a-avatar style="color: #f56a00; backgroundColor: #fde3cf">U</a-avatar>
      <a-avatar style="backgroundColor:#87d068" icon="user" />
    </div>
    <br />
    <br />
    <div>
      <h3>自动调整字符大小</h3>
      <a-avatar
        shape="square"
        size="large"
        :style="{ backgroundColor: color, verticalAlign: 'middle' }"
      >{{ avatarValue }}</a-avatar>
      <a-button
        size="small"
        :style="{ marginLeft: 16, verticalAlign: 'middle' }"
        @click="changeValue"
      >改变</a-button>
    </div>
  </div>
</template>
<script>
const UserList = ['U', 'Lucy', 'Tom', 'Edward']
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']
export default {
  data () {
    return {
      avatarValue: UserList[0],
      color: colorList[0]
    }
  },
  methods: {
    changeValue () {
      const index = UserList.indexOf(this.avatarValue)
      this.avatarValue =
        index < UserList.length - 1 ? UserList[index + 1] : UserList[0]
      this.color =
        index < colorList.length - 1 ? colorList[index + 1] : colorList[0]
    }
  }
}
</script>
<style lang="less" scoped>
[id^="demo"] {
  .ant-avatar {
    margin-right: 10px;
  }
}
</style>
