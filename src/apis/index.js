/*!
 * 请求相关处理，基于 [axios](https://github.com/axios/axios)
 */

/* eslint prefer-promise-reject-errors: "off" */

import axios from 'axios'
import findIndex from 'lodash/findIndex'

import {
  log,
  inArray,
  generateUID,
  fullScreenLoading,
  removeFullScreenLoading
} from '@/utils/helpers'

// 根据实际情况自定义
const CONTEXT_PATH = '/api'

// 独立的 zone，不污染
// 默认配置，根据情况自定义
const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? CONTEXT_PATH : '',
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  timeout: 5 * 1000 // 5s
})

// global spin 最多等待的时间
const MAX_WAITING_TIME = 0 // unit: ms
let fullScreenLoadingTimer = null
let currentRequestCount = 0

// 不想 mask 的接口
// e.g. [ '/ctx/persons' ]
const noLoadingUrls = [ ]
const loadingReqs = [ ]

function addLoadingReq (req) {
  const inLoadingReq = inArray(loadingReqs, req, (xs, y) => xs.some((x) => x._reqId === y._reqId))
  if (!inLoadingReq) {
    loadingReqs.push(req)
  }
}

function removeLoadingReq (req) {
  const index = findIndex(loadingReqs, (x) => x._reqId === req._reqId)
  loadingReqs.splice(index, 1)
}

// 请求前拦截器配置
axiosInstance.interceptors.request.use(function (config) {
  config._reqId = generateUID('req_')
  addLoadingReq(config)
  currentRequestCount += 1
  // log(`开始发请求啦，当前共有${currentRequestCount}个`)
  // 使用 `Object.assign` 或者 `spread operator` 防止失去引用
  // `console.log` 保留的是引用 会使用点击展开时的 对象的值
  // log(`loadingReqs`, [ ...loadingReqs ])

  log('request config', config)

  if (noLoadingUrls.indexOf(config.url) !== -1) {
    // log(`不展示 loading 咯`)
    return config
  }
  if (!fullScreenLoadingTimer) {
    fullScreenLoadingTimer = setTimeout(
      () => fullScreenLoading(),
      MAX_WAITING_TIME
    )
  }
  return config
}, function (error) {
  // log(`req error`, error)
  // 防止 error 的产生，不太确定 error 是否含有 config 信息，直接置空
  loadingReqs.length = 0
  fin()
  return Promise.reject(error)
})

// finalize
const fin = function () {
  currentRequestCount -= 1
  // log(`请求结束啦，当前还剩${currentRequestCount}个`)
  if (currentRequestCount === 0) {
    clearTimeout(fullScreenLoadingTimer)
    removeFullScreenLoading()
    fullScreenLoadingTimer = null
  }
}

// 响应处理
axiosInstance.interceptors.response.use(function (response) {
  removeLoadingReq(response.config)
  fin()
  if (!response.data) {
    return Promise.reject(new Error('服务异常'))
  }
  return response.data
}, function (error) {
  fin()
  switch (error.request.status) {
    case 0:
      return Promise.reject({ message: '服务异常' })
    case 404:
      return Promise.reject({ message: '接口服务不存在' })
  }
  switch (error.response.status) {
    case 403:
      return Promise.reject({ type: 'forbidden', message: '您无权限访问该资源' })
    case 500:
      return Promise.reject({ message: '服务异常' })
    case 504:
      return Promise.reject({ message: '网络超时' })
    default:
      return Promise.reject({ message: '未知 Status Code' })
  }
})

/**
 * 基于 axiosInstance 和 Promise 的包装
 * 之所以用这个是不想用 `promise polyfill`，不过基于 `preset-env` 可以不用这样了，暂时保持
 * @param {"get"|"put"|"head"|"delete"|"post"|"patch"} action HTTP 动词
 * @param {string} url 请求地址
 * @param {any} data 要发送的数据
 */
export const axiosPromiseWrapper = (action, url, data) => {
  return Promise.resolve(axiosInstance[action](url, data))
}
