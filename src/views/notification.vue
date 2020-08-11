<template>
  <div class="notification">
    <h3>通知提醒框</h3>
    <a-button type="primary" @click="openNotification()">默认消息</a-button>
    <a-button type="primary" @click="openNotification_icon">自定义图标</a-button>
    <a-button type="primary" @click="openNotification_style">
    自定义样式
  </a-button>
   <a-button type="primary" @click="openNotification('topLeft')">
      <a-icon type="radius-upleft" />
      topLeft
    </a-button>
    <a-button type="primary" @click="openNotification('topRight')">
      <a-icon type="radius-upright" />
      topRight
    </a-button>
    <a-divider />
    <a-button type="primary" @click="openNotification('bottomLeft')">
      <a-icon type="radius-bottomleft" />
      bottomLeft
    </a-button>
    <a-button type="primary" @click="openNotification('bottomRight')">
      <a-icon type="radius-bottomright" />
      bottomRight
    </a-button>
  </div>
</template>
<script>
export default {
  methods: {
    openNotification (placement = 'topRight') {
      console.log(placement)
      this.$notification.open({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        placement,
        onClick: () => {
          console.log('Notification Clicked!')
        }
      })
    },
    openNotification_icon () {
      this.$notification.open({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        icon: <a-icon type="smile" style="color: #108ee9" />
      })
    },
    openNotification_style () {
      this.$notification.open({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        style: {
          width: '600px',
          marginLeft: `${335 - 600}px`
        }
      })
    }
  }
}
</script>
<style lang="less">
.notification{
    .ant-btn{
        margin-right:20px;
    }
}

</style>
