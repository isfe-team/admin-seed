<template>
  <div class="figure">
    <slot />
    <div class="figure-message-wrapper">
      <div class="message">{{ message }}</div>
      <div class="description">{{ description }}</div>
      <AButton type="primary" @click="toMain">回到首页</AButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Figure',
  props: {
    message: { type: String, default: '' },
    description: { type: String, default: '' }
  },
  methods: {
    toMain () {
      this.$router.push({ name: 'overview' })
    }
  }
}
</script>

<style scoped lang="less">
  .figure {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .figure-message-wrapper {
      margin: -20% 0 0 50px;
      @color: #434e59;

      .message {
        font-size: 72px;
        font-weight: 700;
        color: @color;
      }

      .description {
        font-size: 20px;
        color: lighten(@color, 10%);
        margin-bottom: 10px;
      }
    }
  }
</style>
