/*!
 * i18n support with lazy loading | bqliu
 * @see http://kazupon.github.io/vue-i18n/zh/guide/lazy-loading.html
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import includes from 'lodash/includes'

Vue.use(VueI18n)

export const supportedLocaleConfigs = [
  { locale: 'zh_CN', label: '中文' },
  { locale: 'en_US', label: 'English' },
  { locale: 'ja_JP', label: '日本語' }
]

export function isSupportedLang (lang) {
  const supported = supportedLocaleConfigs.some((config) => config.locale === lang)

  return !!supported
}

export const defaultLocale = supportedLocaleConfigs[0].locale
export const fallbackLocale = defaultLocale

// { locale | fallbackLocale | messages }
// Don't set locale message at first, load resource dynamically
export const i18n = new VueI18n({
  fallbackLocale: defaultLocale // I don't want user sets the fallbackLocale
})

export function setI18nLanguage (lang) {
  i18n.locale = lang
  document.documentElement.setAttribute('lang', lang)
}

export const loadedLanguages = []

export default function setup ({ lang = defaultLocale } = { }) {
  const fallbackLocale = i18n.fallbackLocale
  const langs = [fallbackLocale]
  if (!isSupportedLang(lang)) {
    lang = fallbackLocale
  }
  if (lang !== fallbackLocale) {
    langs.push(lang)
  }
  return Promise.all(langs.map((lang) => loadLanguageAsync(lang, false))).then(() => {
    setI18nLanguage(lang)
  })
}

export function loadLanguageAsync (lang, setLang = true) {
  if (!isSupportedLang(lang)) {
    return Promise.reject(i18n.messages[defaultLocale].error.UNSUPPORTED_LANG)
  }
  let promise = Promise.resolve(lang)
  if (i18n.locale !== lang) {
    const loaded = includes(loadedLanguages, lang)
    if (!loaded) {
      // @todo Optimize `index.js` file
      // @see https://webpack.js.org/api/module-methods/#magic-comments
      promise = import(/* webpackChunkName: "lang-[request]" */`./langs/${lang}/index.js`)
        .then((messages) => {
          i18n.setLocaleMessage(lang, messages.default)
          loadedLanguages.push(lang)
          return lang
        })
    }
    // new Promise
    // may re-render if load many and `setLang`` is true
    if (setLang) {
      promise = promise.then((lang) => {
        setI18nLanguage(lang)
        return lang
      })
    }
  }
  // the returned promise may be the initial promise, and may be the updated one
  return promise
}
