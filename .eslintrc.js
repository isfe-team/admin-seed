module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off', // process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-parsing-error': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'no-unused-expressions': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
