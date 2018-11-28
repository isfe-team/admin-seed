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

const CONTEXT_PATH = '/api'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? CONTEXT_PATH : ''

axios.defaults.withCredentials = true

// 增加该 Header，让服务端的 isAjax 判断正确
axios.defaults.headers = { 'X-Requested-With': 'XMLHttpRequest' }

// 5s 超时
axios.defaults.timeout = 5 * 1000

/* unit => ms */
const MAX_WAITING_TIME = 0 // 100
let fullScreenLoadingTimer = null
let currentRequestCount = 0

const noLoadingUrls = [ ]
const loadingReqs = [ ]

const addLoadingReq = (req) => inArray(
  loadingReqs,
  req,
  (xs, y) => xs.some((x) => x._reqId === y._reqId)
) || loadingReqs.push(req)

const removeLoadingReq = req => {
  const index = findIndex(loadingReqs, (x) => x._reqId === req._reqId)
  loadingReqs.splice(index, 1)
}

axios.interceptors.request.use(function (config) {
  config._reqId = generateUID()
  addLoadingReq(config)
  currentRequestCount += 1
  log(`开始发请求啦，当前共有${currentRequestCount}个`)
  // 使用 `Object.assign` 或者 `spread operator` 防止失去引用
  // `console.log` 保留的是引用 会使用点击展开时的 对象的值
  log(`loadingReqs`, [ ...loadingReqs ])

  console.log(config)

  if (noLoadingUrls.indexOf(config.url) !== -1) {
    log(`不展示 loading 咯`)
    return config
  }
  if (!fullScreenLoadingTimer) {
    fullScreenLoadingTimer = setTimeout(
      () => fullScreenLoading(),
      MAX_WAITING_TIME
    )
  }
  // Do something before request is sent
  return config
}, function (error) {
  log(`req error`, error)
  // 防止 error 的产生，不太确定 error 是否含有 config 信息，直接置空
  loadingReqs.length = 0
  fin()
  // Do something with request error
  return Promise.reject(error)
})

const fin = function () {
  currentRequestCount -= 1
  log(`请求结束啦，当前还剩${currentRequestCount}个`)
  if (currentRequestCount === 0) {
    clearTimeout(fullScreenLoadingTimer)
    removeFullScreenLoading()
    fullScreenLoadingTimer = null
  }
}

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  removeLoadingReq(response.config)
  fin()
  if (!response.data) {
    return Promise.reject(new Error('服务异常'))
  }
  // Do something with response data
  return response.data
}, function (error) {
  fin()
  switch (error.request.status) {
    case 0:
      return Promise.reject({
        message: '服务异常'
      })
    case 404:
      return Promise.reject({
        message: '接口服务不存在'
      })
  }
  switch (error.response.status) {
    case 403:
      return Promise.reject({
        type: 'forbidden',
        message: '您无权限访问该资源'
      })
    case 500:
      return Promise.reject({
        message: '服务异常'
      })
    case 504:
      return Promise.reject({
        message: '网络超时'
      })
    default:
      return Promise.reject({
        message: '未知 Status Code'
      })
  }
})

const axiosPromiseWrapper = (action, url, data) => {
  return Promise.resolve(axios[action](url, data))
}
