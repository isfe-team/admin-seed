/*!
 * see https://cli.vuejs.org/guide/
 */

const webpack = require('webpack')
const path = require('path')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const pages = {
  app: {
    entry: 'src/entries/index/index.js',
    template: 'src/entries/index/index.html',
    filename: 'index.html',
    title: 'seed-project',
    chunks: ['chunk-vendors', 'chunk-common', 'app']
  }
}

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
  // baseUrl: '/admin-seed/',
  // `baseUrl` deprecated, use `publicPath` instead
  // @see also https://github.com/vuejs/vue-cli/blob/dev/CHANGELOG.md#features-1
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/admin-seed/',
  lintOnSave: true,
  pages,
  configureWebpack: {
    plugins: [
      // see https://github.com/webpack-contrib/stylelint-webpack-plugin
      new StyleLintPlugin({
        context: path.resolve(__dirname, 'src'),
        // not working: '**/*.l?(e|c)ss'
        // for `.vue` support, see https://stylelint.io/CHANGELOG/#830
        files: [ '**/*.less', '**/*.css', '**/*.vue' ],
        failOnError: process.env.NODE_ENV === 'production'
      }),
      // https://webpack.js.org/plugins/context-replacement-plugin/
      // https://github.com/moment/moment/issues/2373
      // `moment.locale` 和 `ant-design-vue/lib/locale-provider` 打包过滤
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|ja/), // en-us default imported
      new webpack.ContextReplacementPlugin(/ant-design-vue[/\\]lib[/\\]locale-provider$/, /zh_CN|en_US|ja_JP/) // en-US default
    ]
  },
  chainWebpack: (config) => {
    // disable prefetch for i18n-like concern
    // @see @vue\cli-service\lib\config\app.js
    // @see https://github.com/vuejs/vue-cli/issues/3116
    Object.keys(pages).forEach((name) =>
      ['preload', 'prefetch'].forEach((type) =>
        config.plugins.delete(`${type}-${name}`)
      )
    )
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
