/*!
 * 函数组件
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
