import Vue from 'Vue'
import { message } from 'ant-design-vue'
import Spin from 'ant-design-vue/lib/spin'

/**
 * 通过 `error` 获取 `message`
 * 建议传递 Error 或其子类的实例，或者有 message 字段的对象
 * @param {{message: string, [key: string]: any} error
 * @param {string} defaultMessage, default `''`
 * @return {string}
 */
export const getErrorMessage = (error, defaultMessage = '') => {
  if (typeof error === 'object' && error !== null && error.message) {
    return error.message
  }

  return defaultMessage
}

/** 简单的错误提示，基于 `message.error` */
export const showErrorTip = (...args) => message.error(getErrorMessage.apply(null, args))

/** 简单的成功提示，基于 `meesage.success` */
export const showSuccessTip = (tip) => message.success(tip)

/** 简单的 log，基于 `console.log`，开发环境才会出现 */
export const log = function () {
  if (process.env.NODE_ENV === 'development') {
    return console.log.apply(console, arguments)
  }
}

/**
 * 是否在数组中
 * @param {Array} xs
 * @param {any} x
 * @param {(xs: Array, x: any) => boolean} pred default is `indexOf`
 * @return {boolean}
 */
export const inArray = (xs, x, pred = ((xs, x) => xs.indexOf(x) !== -1)) => pred(xs, x)

/**
 * 一个简单的生成 uniqueId 的方法
 * 采用 可选的前缀和时间戳以及自增数来保持 unique（如果有更高的要求可以自行加上随机数，或者使用 uuid）
 * @param {string} prefix
 * @return {string}
 */
export const generateUID = ((_) => {
  let uid = 0

  return (prefix) => {
    uid += 1
    return `${prefix ? String(prefix) : ''}${uid}${Date.now()}`
  }
})()

/**
 * 全局的遮罩，能遮住所有的那种
 * 基于 `Spin`，需要加载 `@/styles/ant-design-vue.less`
 * @todo 去除额外的样式文件依赖，直接采用自行添加/移除 `style`
 */
export const { fullScreenLoading, removeFullScreenLoading } = (function createFullScreenLoadingService () {
  const SpinConstructor = Vue.extend(Spin)
  let loadingInstance = null

  function fullScreenLoading () {
    if (loadingInstance) {
      return
    }
    loadingInstance = new SpinConstructor({
      el: document.createElement('div'),
      propsData: {
        spinning: true
      }
    })

    const $el = loadingInstance.$el
    $el.classList.add('global-loading-wrapper')
    document.body.appendChild($el)
  }

  function removeFullScreenLoading () {
    if (loadingInstance) {
      if (loadingInstance.$el && loadingInstance.$el.parentNode) {
        loadingInstance.$el.parentNode.removeChild(loadingInstance.$el)
      }
      loadingInstance.$destroy()
      loadingInstance = null
    }
  }

  return {
    fullScreenLoading,
    removeFullScreenLoading
  }
})()
