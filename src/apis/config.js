/*!
 * 请求相关配置，基于 [axios](https://github.com/axios/axios) | bqliu
 */

const CONTEXT_PATH = '/api' // 请求上下文地址
const MOCK_CONTEXT = '/_mock' // mock 上下文

const COMMON_SERVER_ERROR = { message: '服务异常' }

export default {
  CONTEXT_PATH,
  MOCK_CONTEXT,
  noLoadingUrls: [ ], // 不想 mask 的接口 e.g. [ '/ctx/persons' ]
  mockUrls: [ ], // 需要 mock 的接口 e.g. [ '/ctx/persons' ]
  maxWaitingTime: 0, // global spin 最多等待的时间
  baseURL: process.env.NODE_ENV === 'development' ? CONTEXT_PATH : '', // 注意这里采用的是开发环境和生产环境的不同
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  timeout: 5 * 1000, // 5s
  errorMap: {
    common: COMMON_SERVER_ERROR,
    request: {
      0: COMMON_SERVER_ERROR,
      404: { message: '接口服务不存在' }
    },
    response: {
      403: { type: 'forbidden', message: '您无权限访问该资源' },
      500: COMMON_SERVER_ERROR,
      502: COMMON_SERVER_ERROR,
      504: { message: '网络超时' }
    }
  }
}
