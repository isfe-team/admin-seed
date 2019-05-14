import { i18n } from '@/i18n/setup'

export const login = () => {
  if (Math.random() > 0.9) {
    localStorage.setItem('$$online', 1)
    return Promise.resolve()
  }
  return Promise.reject(new Error(i18n.t('login.loginErrorTip')))
}

export const getUserInfo = (pageNo, pageSize) => Promise.resolve({ name: 'admin' })

export const getMenu = (lang) => import(/* webpackChunkName: "menu-[request]" */`@/menus/menu-${lang}.json`)
