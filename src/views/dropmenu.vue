<template>
  <div>
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
        Button
        <a-icon type="down" />
      </a-button>
    </a-dropdown>
  </div>
</template>
<script>
export default {
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
