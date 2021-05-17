# Roadmap

## 0.1.0

- [x] 完成初始版本
- [x] 完成结构讨论和调整
- [x] 完成 `vue-cli` 升级
- [x] 采用 `preset-env`，去除 promise-polyfill/babel-polyfill 等直接引入

## 0.2.0

- [x] 按需引入，见[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
- [x] 增加 `admin-seed-cli`，使用 `@isfe/admin-seed` 源

## 0.3.0

- [x] Compatibility 增加默认的 `polyfill` 模块占位
- [x] release log
- [x] [stylelint](https://github.com/stylelint/stylelint)
- [x] 集成 ci 和 hooks

## 0.4.0

- [x] 迁移 api config
- [x] 集成 Mock
- [x] 优化内部所有内置脚本
- [x] 优化 vsc 路径映射，参考 https://www.typescriptlang.org/docs/handbook/module-resolution.html 和 https://stackoverflow.com/questions/47181037/vscode-intellisense-does-not-work-with-webpack-alias
- [x] 集成 [NProgress](https://github.com/rstacruz/nprogress)
- [x] 拆分路由配置 + [code-split](https://webpack.js.org/guides/code-splitting/)

## 0.5.0

- [x] 优化内部所有内置组件
- [x] 区分容器和展示组件

## 1.0.0

- [x] 增加基础库测试
- [x] 内置组件使用类组件
- [x] `admin-seed-cli` 增加配置，使用不同的 seed project 源，进一步支持大家 fork 这个项目，并使用自己的版本
- [x] 支持导航模式配置（横向、纵向）以及 stickHeader（横向）
- [x] 修复 Header Logo 动画

## 1.1.0

- [ ] moment 注入 dependencies 中，避免不可预测的情况，可以参考 ant-design-pro 和 ant-design
- [ ] menus 置于 store 中，去除 额外的 actions
- [ ] 动态注入权限路由，去除冗余的路由
- [ ] 集成文档模板
- [x] 增加 i18n 支持

## 1.2.0

- [ ] 增加 theme 配置，主要是横向模式的 light，做到 App 里面配置 prop (使用Provide/Inject，开发 ConfigProvider 组件)
- [ ] 优化 PQTable 在同步数据的自动更新
- [ ] 暴露 PQTable list data
- [ ] 增强 PQTable 增加已选择项

## 2.0.0

- [ ] 迁移到 `ts`
- [ ] 集成 `rx`
- [ ] 考虑按需遮罩
- [ ] `admin-seed-cli` 增加配置，使用 `ts` or `js` 版本
- [ ] 开发数据层，优化中心化存储 + `Resource` 资源利用，不使用 `vuex`，集成 `cache`
