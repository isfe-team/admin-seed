/*!
 * i18n support with lazy loading | bqliu
 * @see http://kazupon.github.io/vue-i18n/zh/guide/lazy-loading.html
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import includes from 'lodash/includes'
import axios from 'axios'
Vue.use(VueI18n)

// @TODO Optimize 从 langs.csv 读取
export const supportedLocaleConfigs = [
  { locale: 'zh_CN', label: '中文' },
  { locale: 'en_US', label: '英语' }
]

export function isSupportedLang (lang) {
  const supported = supportedLocaleConfigs.some((config) => config.locale === lang)

  return !!supported
}

export const defaultLocale = supportedLocaleConfigs[0].locale
export const fallbackLocale = defaultLocale

// { locale | fallbackLocale | messages }
// Don't set locale message at first, load resource dynamically
export const i18n = window.i18n = new VueI18n({
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
      promise = getMessage(lang).then((message) => {
        i18n.setLocaleMessage(lang, message) // previous version is `messages.default`
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

let messages = null

export function loadAndSetMessages () {
  return axios.get('/lang.csv')
    .then(({ data }) => {
      messages = csvToTable(data)

      console.log('messages:', messages)
      return messages
    })
    .catch((err) => {
      console.error(err)
      throw err
    })
}

// @NOTICE 自行保证 lang 在内
function getMessage (lang) {
  if (messages) {
    return messages[lang]
  }

  return loadAndSetMessages().then(() => messages[lang])
}

function csvToTable (data) {
  const CSV_SEPERATOR = ','
  const LINE_SEPERATOR = '\n'
  // ================
  // key,zh_CN,en_US
  // moduleName
  // jx,简析,JIANXI
  // ================
  // parseRawCsv(data)
  // console.log(data, '0000')
  // function parseRawCsv (str) {
  // }
  function toTable (str) {
    return str.trim()
      .split(LINE_SEPERATOR).map((rowStr) => rowStr.trim())
      .map((rowStr) => rowStr.split(CSV_SEPERATOR).map((colStr) => colStr.trim()))
  }
  function extractHeaders (table) {
    // 去除 `remark` 列
    return table[0].slice(0, -1)
  }
  function extractContent (table, headers) {
    const specialCharsTuples = [
      ['%%dot%%', ',']
    ]
    return table
      .slice(1)
      .filter((row) => row.filter((x) => !!x.trim()).length !== 0)
      // 去除 `remark` 列，加上 `key` 列，所以多 2 列
      .map((row, i) => {
        if (headers) {
          const maxLen = headers.length + 2
          if (row.length >= maxLen) {
            throw new Error(`解析失败，多了逗号，行数在${i + 1}附近，行内容为：${row.join(',')}`)
          }

          if (row.length === maxLen) {
            return row.slice(0, -1)
          }
        }
        return row
      })
      .map((row) => row.map((x) => {
        return specialCharsTuples.reduce(
          (acc, [reg, value]) => acc.replace(new RegExp(reg, 'g'), value),
          x
        )
      }))
  }

  function isModuleRow (row) {
    return row.filter((x) => !!x.trim()).length === 1
  }

  function parseTable (table) {
    const [, ...langs] = extractHeaders(table)
    const content = extractContent(table, langs)
    // construct
    const messages = langs.reduce((acc, header) => {
      acc[header] = { }
      return acc
    }, { })
    // parse content
    let currentModuleName = ''
    for (let i = 0, len = content.length; i < len; i += 1) {
      const row = content[i]
      if (isModuleRow(row)) {
        currentModuleName = row[0]
        continue
      }

      if (!currentModuleName) {
        throw new Error('parse error')
      }

      // ['jx','简析','JIANXI']
      const [key, ...values] = row
      values.forEach((value, i) => {
        const currentLangMessage = messages[langs[i]]
        if (!currentLangMessage[currentModuleName]) {
          currentLangMessage[currentModuleName] = { }
        }
        currentLangMessage[currentModuleName][key] = value
      })
    }
    return messages
  }
  const table = toTable(data)
  return parseTable(table)
}

export function transformTo (key, ...args) {
  return i18n.t(key, ...args)
}
