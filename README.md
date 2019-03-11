# Admin Seed

Admin seed project by @bqliu & @hxli.

Use `vue`and `ant-design-vue`, and based on `@vue/cli` to build an admin seed project.

> Of course, in fact, this is also a template.

> Thank ymliu for cute icons.

## Build Setup

``` bash
## install dependencies
npm install
## for dev
npm run serve
## for build/release
npm run build
## for lint
npm run lint
## for unit test
npm run test:unit
## use this to commit
$ npm run commit
## upgrade versions and tag
$ npm version <param>
$ git push origin --tag
## publish to gh-pages [Deprecated]
git subtree push --prefix dist origin gh-pages
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

> For vsc users, if you use decorators in scf files, you need to add a `jsconfig.json` or `tsconfig.json` file, and config `experimentalDecorators`. If you installed vetur, you should turn off `vetur.validation.script`.

## Compatibility

We prefer to use `src/polyfills.js` to centrally manage polyfills. You can use `src/polyfills.js` to import polyfills as you need, you can uncomment or add what you want. For more informations, you can see `src/polyfills.js`.

For `vue-cli`, you can see [this](https://cli.vuejs.org/zh/guide/browser-compatibility.html#usebuiltins-usage).

### Built-in Scripts' Compatibility

> For some other infomations, you can see [this](https://angular.io/guide/browser-support) :).

#### classlist

In `utils/helpers`, we use `classList`. You can see [compatibility](https://caniuse.com/#search=classList). If you want to use it in `IE10-`, you can use `setAttribute` or [classList polyfill](https://github.com/eligrey/classList.js). For polyfill via npm, you can see [classlist-polyfill](https://www.npmjs.com/package/classlist-polyfill) or [classlist.js](https://www.npmjs.com/package/classlist.js).

#### Promise

We use `axios` as AJAX client, it based on `Promise`. See [caniuse](https://caniuse.com/#search=promise) and [polyfill](https://www.npmjs.com/package/promise-polyfill).

Btw, [babel-polyfill](https://www.npmjs.com/package/@babel/polyfill) includes a promise polyfill.

### Third-party Compatibility

See [Compatibility of `ant-design-vue`](https://vuecomponent.github.io/ant-design-vue/docs/vue/getting-started/#Compatibility).

## Mock

For mock, you have two ways to achive it. One is use `@/apis/configs.js` for inner supports. The 2nd way is to add a prefix like `_mock` in your urls when you define your services, e.g. `req('_mock/user')`.

Then you should use devServer to proxy all these requests to another mock server.

Of course, I recommend a mock server to do this rather than native mock files.

## Optimizations

The major bundle is the 3rd-party lib - `ant-design-vue`, you can see [this issue](https://github.com/vueComponent/ant-design-vue/issues/325) for more informations. Btw, the `admin-seed` use `src/components/registerServiceWorker.js` to centrally manage the `ant-design-vue` components.

## Directories

```
- src
  - apis
  - assets
  - components
    - common
    - layout
    - other_trans_components
    - registerAntDesignVueComponents.js
  - entries
    - login
    - index
  - router
  - store
  - styles
    - base.less
    - vars.less
    - antDesignVue.less
    - icons
    - index.less
  - utils
    - helpers
    - constants
  - menu.json
  - polyfills.js
  - registerServiceWorker.js
  - vendors
```

## Roadmap

### 0.1.0

- [x] 完成初始版本
- [x] 完成结构讨论和调整
- [x] 完成 `vue-cli` 升级
- [x] 采用 `preset-env`，去除 promise-polyfill/babel-polyfill 等直接引入

### 0.2.0

- [x] 按需引入，见[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
- [x] 增加 `admin-seed-cli`，使用 `@isfe/admin-seed` 源

### 0.3.0

- [x] Compatibility 增加默认的 `polyfill` 模块占位
- [x] release log
- [x] [stylelint](https://github.com/stylelint/stylelint)
- [x] 集成 ci 和 hooks

### 0.4.0

- [x] 迁移 api config
- [x] 集成 Mock
- [x] 优化内部所有内置脚本
- [x] 优化 vsc 路径映射，参考 https://www.typescriptlang.org/docs/handbook/module-resolution.html 和 https://stackoverflow.com/questions/47181037/vscode-intellisense-does-not-work-with-webpack-alias
- [x] 集成 [NProgress](https://github.com/rstacruz/nprogress)
- [x] 拆分路由配置 + [code-split](https://webpack.js.org/guides/code-splitting/)

### 0.5.0

- [x] 优化内部所有内置组件
- [x] 区分容器和展示组件

### 1.0.0

- [x] 增加基础库测试
- [x] 内置组件使用类组件
- [x] `admin-seed-cli` 增加配置，使用不同的 seed project 源，进一步支持大家 fork 这个项目，并使用自己的版本
- [x] 支持导航模式配置（横向、纵向）以及 stickHeader（横向）
- [ ] 增加 theme 配置，主要是横向模式的 light，做到 App 里面配置 prop (使用Provide/Inject，开发 ConfigProvider 组件)

### 2.0.0

- [ ] 迁移到 `ts`
- [ ] 集成 `rx`
- [ ] 考虑按需遮罩
- [ ] `admin-seed-cli` 增加配置，使用 `ts` or `js` 版本
- [ ] 开发数据层，优化中心化存储 + `Resource` 资源利用，不使用 `vuex`，集成 `cache`

## NOTICE

### favicon

在 `vue-config.js` 文件中增加 `pwa` 配置，具体配置见[官网](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-pwa#readme)。

### 项目名相关

需要将 `package.json` 和 `public/manifest.json` 的 `name` 和 `short_name` 配置为自己的项目名。

### vsc 集成

为了解决 vsc 的 `eslint` 报错，见[官网](https://vuejs.github.io/eslint-plugin-vue/user-guide/#editor-integrations)。

### ant-design-vue 相关

`ant-design-vue@1.2.0` 菜单收起会有问题，see [this issue](https://github.com/vueComponent/ant-design-vue/issues/338)。 更新到 `1.2.4+` 即可。
