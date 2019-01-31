/*!
 * 一个简单的函数组件，用于分发，主要用于模板 sfc，且不支持事件之类的（懒得完善，反正后续要迁移），见 #2
 * 新的实现用的是 jsx 来实现，如果都要使用 jsx 了，这层包装也是浪费，所以仅仅占位而已
 *
 * @example #1
 * <ComponentDispatcher component={Component} {...props} />
 * @example #2
 * <ComponentDispatcher :component="" :data="" />
 *
 * @see https://cn.vuejs.org/v2/guide/render-function.html#函数式组件
 */

import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component()
class ComponentDispatcher extends Vue {
  @Prop({ type: [ Object, Function ], required: true }) component

  render () {
    return <this.component {...{ props: this.$attrs }} {...{ on: this.$listeners }} />
  }
}

export default ComponentDispatcher

/**
 * #2 Or use following codes
  ```
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
  ```
  */
