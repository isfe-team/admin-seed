/*!
 * 请求相关配置，基于 [axios](https://github.com/axios/axios) | bqliu
 */

const CONTEXT_PATH = '/api' // 请求上下文地址
const MOCK_CONTEXT = '/_mock' // mock 上下文

// @NOTICE [i18n] 注意此处可以返回一个对象，但是由于需要支持 i18n 所以得等到语言加载完毕
// 主要用于 `./index.js` 中
export function genErrorMap () {
  const COMMON_SERVER_ERROR = { message: '服务异常' }

  return {
    common: { message: '服务异常' },
    request: {
      0: { message: '网络异常，请检查网络设置' },
      404: { message: '接口服务不存在' },
      403: { type: 'forbidden', message: '您无权限访问该资源' }
    },
    response: {
      403: { type: 'forbidden', message: '您无权限访问该资源' },
      500: COMMON_SERVER_ERROR,
      502: COMMON_SERVER_ERROR,
      504: { message: '网络超时' }
    }
  }
}

export default {
  CONTEXT_PATH,
  MOCK_CONTEXT,
  // @see https://www.npmjs.com/package/path-to-regexp
  noLoadingUrls: [ ], // 不想 mask 的接口 e.g. [ '/ctx/persons', 'service?(.*)' ]
  mockUrls: [ ], // 需要 mock 的接口 e.g. [ '/ctx/persons' ]
  maxWaitingTime: 0, // global spin 最多等待的时间
  baseURL: process.env.NODE_ENV === 'development' ? CONTEXT_PATH : '', // 注意这里采用的是开发环境和生产环境的不同
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  timeout: 5 * 1000 // 5s
}
