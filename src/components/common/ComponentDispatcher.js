/*!
 * 一个简单的函数组件，用于分发，主要用于模板 sfc，且不支持事件之类的（懒得完善，反正后续要迁移）
 *
 * @example
 * <ComponentDispatcher :component="" :data="" />
 *
 * @see https://cn.vuejs.org/v2/guide/render-function.html#函数式组件
 */
export default {
  name: 'ComponentDispatcher',
  functional: true,
  props: {
    component: { type: Object, required: true }
  },
  render (h, ctx) {
    return h(
      ctx.props.component,
      ctx.data,
      ctx.children
    )
  }
}
