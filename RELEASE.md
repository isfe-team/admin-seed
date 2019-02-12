# RELEASE LOG

## 1.0.0-rc1

`02/12/2019`

Fix:
- 登录页面校验异常状态问题

## 1.0.0-rc0

`02/12/2019`

Breaking Changes:
- 使用 class component 重构几乎所有组件，并推荐采用该模式，原因：1、面向未来，2、更好的脚本体验

Feat:
- 增加基础 `utils/helpers` 的自动化测试

Fix:
- 登录页面之前 `v-decorators` 使用错误

## 0.5.0

`01/27/2019`

Breaking Changes:
- `vue.config.js` 中使用 `publicPath` 代替 `baseUrl`，见[更新日志](https://github.com/vuejs/vue-cli/blob/dev/CHANGELOG.md#features-1)

Feat:
- 优化内部所有内置组件
- 区分容器和展示组件，主要是 `AppHeader`
- 单独拆分 layout 目录，使得 `components/common` 更纯

Chore:
- 更新所有依赖

## 0.4.2

`01/25/2019`

Feat:
- 更新PQTable, 并增加同步和异步两个应用示例

Doc:
- 更新 README 关于 VSC 以及 favico 配置修改文档

## 0.4.1
`01/22/2019`

Feat:
- 迁移 api config
- 集成 Mock
- 优化内部所有内置脚本
- 优化 vsc 路径映射
- 集成 [NProgress]
- 拆分路由配置

## 0.3.0

`01/10/2019`

Feat:
- Compatibility: 增加默认的 `polyfill` 模块占位
- 增加 RELEASE log
- 集成 [stylelint](https://github.com/stylelint/stylelint)
- 集成 ci 和 hooks

## 0.2.0

`12/20/2018`

Feat:
- 按需引入，见[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
- 增加 `admin-seed-cli`，使用 `@isfe/admin-seed` 源

## 0.1.0

`12/28/2018`

Feat:
- 完成初始版本
- 完成结构讨论和调整
- 完成 `vue-cli` 升级
- 采用 `preset-env`，去除 promise-polyfill/babel-polyfill 等直接引入
