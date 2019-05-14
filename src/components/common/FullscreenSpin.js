/*!
 * FullscreenSpin | bqliu
 * 此 Fullscreen 不是真的能 Fullscreen，除非在 DOM 层级上（最外层）或者 zIndex 上做控制，不然很可能被盖住
 * 更可能是 Fullscreen 的可以参见 `utils/helpers` 中的 `createFullScreenLoadingService`
 */

import { Spin } from 'ant-design-vue'
import './FullscreenSpin.less'

const FullscreenSpin = (context) => {
  return <Spin {...{ props: context.props }} class='fullscreen-spin'>{context.children}</Spin>
}

export default FullscreenSpin
