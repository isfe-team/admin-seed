import Vue from 'vue'
import isString from 'lodash/isString'
import { message } from 'ant-design-vue'
import assign from 'lodash/assign'
import Spin from 'ant-design-vue/lib/spin'

const defaultMessageOption = { }

// 信息提示框 使用时直接iMessage.success()等
export const iMessage = function (type, content, duration, opts) {
  return message[type](content, duration, assign({ }, defaultMessageOption, opts))
}

;[ 'success', 'warning', 'info', 'error' ].forEach(type => {
  iMessage[type] = function (content, duration, opts) {
    return this(type, content, duration, opts)
  }
})

/* 建议只传递 Error 或其子类的实例 或者有 message 字段的对象 */
export const getErrorMessage = (error, defaultMessage = '') => {
  // 包含了 error instanceof Error
  if (typeof error === 'object' && error !== null && error.message) {
    return error.message
  }

  return defaultMessage
}

/* 简单的错误提示 */
export const showErrorTip = (...args) => iMessage.error(getErrorMessage.apply(null, args))

/* 简单的成功提示 */
export const showSuccessTip = (tip) => iMessage.success(tip)

export const log = function () {
  if (process.env.NODE_ENV === 'development') {
    return console.log.apply(console, arguments)
  }
}

export const inArray = (xs, x, pred = ((xs, x) => xs.indexOf(x) !== -1)) => pred(xs, x)

/* generate a uniqe id */
export const generateUID = (_ => {
  let uid = 0

  return prefix => {
    uid += 1
    return `${prefix ? String(prefix) : ''}${uid}${Date.now()}`
  }
})()

const SpinConstructor = Vue.extend(Spin)

let loadingInstance = null

export function fullScreenLoading () {
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

export function removeFullScreenLoading () {
  if (loadingInstance) {
    if (loadingInstance.$el && loadingInstance.$el.parentNode) {
      loadingInstance.$el.parentNode.removeChild(loadingInstance.$el)
    }
    loadingInstance.$destroy()

    loadingInstance = null
  }
}

/**
 * 时间处理，去除时分秒，'2018-05-01 10:00:00' => '2018-05-01'
 * 用户自行保障数据格式正确性，如果不是 string，直接返回自身
 */
export const removeHMS = (timeString) => {
  if (isString(timeString)) {
    return timeString.split(' ')[0]
  }
  return timeString
}
