module.exports = {
  presets: [ '@vue/app' ],
  // https://github.com/ant-design/babel-plugin-import
  // `style: true` 可以引入 `less`，但是直接采用引入所有样式
  plugins: [ [ 'import', { libraryName: 'ant-design-vue', libraryDirectory: 'es' } ] ]
}
