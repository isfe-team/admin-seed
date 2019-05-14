import login from './login'
import overview from './overview'
import error from './error'
import route from './route'

export default {
  main: {
    title: '后管种子项目'
  },
  login,
  overview,
  error,
  route,
  figure: {
    toMain: '回到首页'
  },
  403: {
    message: '抱歉，没有访问权限'
  },
  404: {
    message: '抱歉，你访问的页面不存在或正在开发'
  },
  500: {
    message: '抱歉，服务异常了'
  }
}
