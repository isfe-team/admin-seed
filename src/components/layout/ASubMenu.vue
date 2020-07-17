<template>
  <ASubMenu :key="menu.url" v-bind="$props" v-on="$listeners">
    <span slot="title" class="menu-title-wrapper">
      <AIcon :type="menu.icon" v-if="menu.icon" />
      <span class="menu-title">{{ $t(menu.namekeyi18n) }}</span>
    </span>
    <template v-for="subMenu in menu.childList">
      <AMenuItem class="menu-title-wrapper" v-if="subMenu.childList.length === 0" :key="subMenu.url">
        <AIcon :type="subMenu.icon" v-if="subMenu.icon" />
        <span class="menu-title">{{ $t(subMenu.namekeyi18n) }}</span>
      </AMenuItem>
      <SubMenu v-else :key="subMenu.url" :menu="subMenu"></SubMenu>
    </template>
  </ASubMenu>
</template>

<script>
import { Menu } from 'ant-design-vue'
export default {
  name: 'SubMenu',
  // TODO 待明确是否需要
  isSubMenu: true,
  props: {
    // @see https://www.antdv.com/components/menu-cn/#components-menu-demo-single-file-recursive-menu
    ...Menu.SubMenu.props,
    menu: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
  .menu-title-wrapper {
    display: flex;
    align-items: center;
    font-size: 0;

    .menu-title {
      font-size: 14px;
    }

    .menu-icon {
      width: 21px;
      height: 26px;
      margin-right: 6px;
      line-height: 26px;
    }
  }
</style>
