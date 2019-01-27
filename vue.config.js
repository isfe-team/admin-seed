/*!
 * see https://cli.vuejs.org/guide/
 */

const path = require('path')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8081,
    proxy: {
      '/api': {
        target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
        ws: false,
        changeOrigin: true
      }
    }
  },
  publicPath: '/admin-seed/',
  lintOnSave: true,
  pages: {
    app: {
      entry: 'src/entries/index/index.js',
      template: 'src/entries/index/index.html',
      filename: 'index.html',
      title: 'seed-project',
      chunks: ['chunk-vendors', 'chunk-common', 'app']
    },
    login: {
      entry: 'src/entries/login/login.js',
      template: 'src/entries/login/login.html',
      filename: 'login.html',
      title: 'login',
      chunks: ['chunk-vendors', 'chunk-common', 'login']
    }
  },
  configureWebpack: {
    plugins: [
      // see https://github.com/webpack-contrib/stylelint-webpack-plugin
      new StyleLintPlugin({
        context: path.resolve(__dirname, 'src'),
        // not working: '**/*.l?(e|c)ss'
        // for `.vue` support, see https://stylelint.io/CHANGELOG/#830
        files: [ '**/*.less', '**/*.css', '**/*.vue' ],
        failOnError: process.env.NODE_ENV === 'production'
      })
    ]
  },
  pwa: {
    // 配置 favico
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  },
  filenameHashing: true,
  runtimeCompiler: false,
  transpileDependencies: [ ],
  integrity: false
}
