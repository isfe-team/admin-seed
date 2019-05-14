import login from './login'
import overview from './overview'
import error from './error'
import route from './route'

export default {
  main: {
    title: 'Admin Seed'
  },
  login,
  overview,
  error,
  route,
  figure: {
    toMain: 'To main'
  },
  403: {
    message: 'Sorry, forbidden.'
  },
  404: {
    message: 'Sorry, not found.'
  },
  500: {
    message: 'Sorry, exception.'
  }
}
