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
        target: 'https://www.easy-mock.com/mock/5b7bce071f130e5b7fe8cd7d/antd-pro',
        ws: false,
        changeOrigin: true
      }
    }
  },
  baseUrl: '/admin-seed/',
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
  filenameHashing: true,
  runtimeCompiler: false,
  transpileDependencies: [ ],
  integrity: false
}
