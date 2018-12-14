module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }] // 解决 no-parsing-error 报错
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
