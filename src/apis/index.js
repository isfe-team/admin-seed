/*!
 * 请求相关处理，基于 [axios](https://github.com/axios/axios) | bqliu
 */

/* eslint prefer-promise-reject-errors: "off" */

import axios from 'axios'
import qs from 'qs'
import findIndex from 'lodash/findIndex'
import cloneDeep from 'lodash/cloneDeep'
import { inArray, generateUID, fullScreenLoading, removeFullScreenLoading } from '@/utils/helpers'
import apiConfig, { genErrorMap } from './config'
import { USE_UAP, FORBIDDEN_TYPE, UNAUTH_TYPE } from '@/utils/constants'

let fullScreenLoadingTimer = null
let currentRequestCount = 0 // 当前正在发的请求数目
const loadingReqs = [ ] // 当前所有正在发的请求，维护玩的

// 独立的 zone，不污染，根据情况自定义默认配置
// @see https://github.com/axios/axios#creating-an-instance
export const axiosInstance = axios.create({
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
  const index = findIndex(loadingReqs, (x) => x._reqId === req._reqId)
  loadingReqs.splice(index, 1)
}

function isNoLoadingUrl (url) {
  url = url.replace(/^\/+(.+)$/, '$1')
  return apiConfig.noLoadingUrls.indexOf(url) !== -1
}

// 请求前拦截器配置
axiosInstance.interceptors.request.use(function (config) {
  config._reqId = generateUID('req_')
  addLoadingReq(config)
  const noLoading = isNoLoadingUrl(config.url)
  // noloading 的不计数
  // 或者在finalize 的时候不 removeLoading，不然会出现误remove其它的loading的情况
  if (!noLoading) {
    currentRequestCount += 1
  }

  if (config.method === 'get' && process.env.NODE_ENV === 'production') {
    config.params = {
      _t: new Date().getTime(),
      ...config.params
    }
  }

  // post 的话不一定会有
  config.params = config.params || { }
  if (!fullScreenLoadingTimer && apiConfig.noLoadingUrls.indexOf(config.url) === -1) {
    fullScreenLoadingTimer = setTimeout(() => fullScreenLoading(), apiConfig.maxWaitingTime)
  }
  if (!(config.data instanceof FormData)) {
    config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
  }
  return config
}, function (error) {
  finalize(error.response)
  return Promise.reject(error)
})

// finalize
const finalize = function (response) {
  if (response) {
    const url = response.config.url.slice(response.config.baseURL.length)
    const noLoading = isNoLoadingUrl(url)

    if (!noLoading) {
      doClear()
    }
  } else {
    // 没有response 可能是失败了，需要 clear 稳妥一点
    doClear()
  }

  function doClear () {
    currentRequestCount -= 1
    // 其它异常情况
    if (currentRequestCount < 0) {
      currentRequestCount = 0
    }
    // log(`请求结束啦，当前还剩${currentRequestCount}个`)
    if (currentRequestCount === 0) {
      clearTimeout(fullScreenLoadingTimer)
      // 注意此处可能存在误 remove 的情况
      removeFullScreenLoading()
      fullScreenLoadingTimer = null
    }
  }
}

export function handleUnauth (url) {
  function fin () {
    return new Promise((resolve, reject) => {
      // 5s 之后 reject，一般 5s 都能跳转到 uap 登录页面，所以来不及 reject
      // 算是个 hack 的做法（不展示 error tip）
      setTimeout(() => {
        reject({
          type: UNAUTH_TYPE,
          message: '未登录'
        })
      }, 5 * 1000)
    })
  }
  const { __inject } = qs.parse(location.search.slice(1))

  if (__inject === 'true') {
    parent.postMessage({ type: 'LOGOUT', url: url }, '*')
    return fin()
  }

  location.href = url || './login.html'
  return fin()
}

// 响应处理
axiosInstance.interceptors.response.use(function (response) {
  removeLoadingReq(response.config)
  finalize(response)
  if (!response.data) {
    return Promise.reject(new Error('服务异常'))
  }
  if (USE_UAP) {
    try {
      switch (response.data.ret) {
        case 302: {
          return handleUnauth(response.data.redirectUrl)
        }
        case 403: {
          return Promise.reject({
            type: FORBIDDEN_TYPE,
            message: '您无权限访问该资源'
          })
        }
      }
    } catch (e) { /* Ignore */ }
  } else if (response.data.code === 403) {
    return handleUnauth()
  }
  if (Number(response.data.code) !== 0) {
    return Promise.reject({
      message: response.data.message,
      data: response.data.data,
      code: response.data.code
    })
  }
  return response.data
}, function (error) {
  removeLoadingReq(error.config)
  finalize(error.response)

  // @NOTICE [i18n] 动态生成
  const errorMap = genErrorMap()
  let e

  if (error.request && (error.request.status || error.request.status === 0)) {
    e = errorMap.request[error.request.status]
  } else if (error.response && error.response.status) {
    e = errorMap.response[error.response.status]
  }
  e = e || errorMap.common

  return Promise.reject(cloneDeep(e))
})

/**
 * 基于 axiosInstance 和 Promise 的包装
 * 之所以用这个是不想用 `promise polyfill`，不过基于 `preset-env` 可以不用这样了，暂时保持
 * @param {"get"|"put"|"head"|"delete"|"post"|"patch"} action HTTP 动词
 * @param {string} url 请求地址
 * @param {any} data 要发送的数据，如果是get/put/head，此时 data 就是options
 * @param {any} options 配置
 */
export const axiosPromiseWrapper = (action, url, data, options) => {
  return Promise.resolve(axiosInstance[action](url, data, options))
}
