/*!
 * 请求相关处理，基于 [axios](https://github.com/axios/axios) | bqliu
 */

/* eslint prefer-promise-reject-errors: "off" */

import axios from 'axios'
import findIndex from 'lodash/findIndex'
import cloneDeep from 'lodash/cloneDeep'
import { inArray, generateUID, removeFullScreenLoading } from '@/utils/helpers'
import apiConfig from './config'

export let axiosArr = [ ]

const notClearAxios = [ 'service' ]

let fullScreenLoadingTimer = null
let currentRequestCount = 0 // 当前正在发的请求数目
const loadingReqs = [ ] // 当前所有正在发的请求，维护玩的

// 独立的 zone，不污染，根据情况自定义默认配置
// @see https://github.com/axios/axios#creating-an-instance
const axiosInstance = axios.create({
  baseURL: apiConfig.baseURL,
  withCredentials: apiConfig.withCredentials,
  headers: apiConfig.headers,
  timeout: apiConfig.timeout // 5s
})

function addLoadingReq (req) {
  const inLoadingReq = inArray(loadingReqs, req, (xs, y) => xs.some((x) => x._reqId === y._reqId))
  if (!inLoadingReq) {
    loadingReqs.push(req)
  }
}

function removeLoadingReq (req) {
  if (req) {
    const index = findIndex(loadingReqs, (x) => x._reqId === req._reqId)
    loadingReqs.splice(index, 1)
  }
}

// 请求前拦截器配置
axiosInstance.interceptors.request.use(function (config) {
  config._reqId = generateUID('req_')
  if (notClearAxios.indexOf(config.url.split('?')[0]) !== -1) {
    config.cancelToken = new axios.CancelToken(cancel => {
      axiosArr.push(cancel)
    })
  }
  addLoadingReq(config)
  currentRequestCount += 1

  if (apiConfig.noLoadingUrls.indexOf(config.url) !== -1) {
    return config
  }
  // if (!fullScreenLoadingTimer) {
  //   fullScreenLoadingTimer = setTimeout(() => fullScreenLoading(), apiConfig.maxWaitingTime)
  // }
  return config
}, function (error) {
  finalize()
  return Promise.reject(error)
})

// finalize
const finalize = function () {
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
  finalize()
  if (!response.data) {
    return Promise.reject(new Error('服务异常'))
  }
  return response.data
}, function (error) {
  removeLoadingReq(error.config)
  finalize()
  if (error.constructor.prototype.__CANCEL__) {
    return Promise.reject(error)
  }
  const e = apiConfig.errorMap.request[error.request.status] ||
            apiConfig.errorMap.response[error.response.status] ||
            apiConfig.errorMap.common

  return Promise.reject(cloneDeep(e))
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
