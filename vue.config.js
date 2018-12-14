module.exports = {
  devServer: {
    host: 'localhost',
    port: 8081
  },
  baseUrl: '/',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 多页应用入口配置
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
  filenameHashing: true,
  runtimeCompiler: false,
  transpileDependencies: [ ],
  integrity: false
}
