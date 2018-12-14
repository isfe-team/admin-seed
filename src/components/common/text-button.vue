<!--
  - text button | bqliu
-->

<template>
  <button
    class="x-text-button"
    :class="{ disabled, danger }"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'TextButton',
  data () {
    return { }
  },
  props: {
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否是 danger 状态
    danger: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/vars.less";

.x-text-button {
  position: relative;
  line-height: 1.5;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  touch-action: manipulation;
  background-color: transparent;
  background-image: none;
  white-space: nowrap;
  padding: 0;
  font-size: 14px;
  height: 32px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: @primary-color;
  cursor: pointer;
  border: none;
  outline: none;

  &:not([disabled]):hover {
    color: @primary-5;
  }

  &:not([disabled]):active {
    color: @primary-7;
    transition: none;
  }

  &.danger {
    color: @error-color;

    &:not([disabled]):hover {
      color: @error-color-hover;
    }

    &:not([disabled]):active {
      color: @error-color-active;
      transition: none;
    }
  }

  &.disabled,
  &[disabled] {
    color: @disabled-color;
    cursor: not-allowed;

    > * {
      pointer-events: none;
    }
  }
}
</style>
