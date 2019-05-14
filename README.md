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

## I18n

This project support `I18n` via `vue-i18n`. We support a `withI18n` wrapper for component. You can use this to wrap your app component. And in store, the `locale` state will be updated. You can use `mapState` and watch this state.

### Concerns

We should consider many things, include `code-split`, `ant-design-vue locale` and `moment locale`. We use [`webpack.ContextReplacementPlugin`](https://webpack.js.org/plugins/context-replacement-plugin/) to bundle what we need, and require(use webpack dynamic import) when we need. Once locale changed, we import the core i18n settings/messages, load and set the antdLocale(the moment local will be set by antd). By the way, you may need to set the `Accept-Language` header. You can see `entries/index/index.js` for real codes.

## Optimizations

See [knownIssues](./docs/knownIssues.md).

## Directories

See [designOverview](./docs/designOvewview.md).

## Roadmap

See [roadmap](./docs/roadmap.md).

## NOTICE

下面是一些自己需要配置的部分，其中部分可以在 `admin-seed-cli` 中完善，但是目前没时间。另外其它的参见[knownIssues](./docs/knownIssues.md)。

### favicon

在 `vue-config.js` 文件中增加 `pwa` 配置，具体配置见[官网](https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-pwa#readme)。

### 项目名相关

需要将 `package.json` 和 `public/manifest.json` 的 `name` 和 `short_name` 配置为自己的项目名。

### vsc 集成

为了解决 vsc 的 `eslint` 报错，见[官网](https://vuejs.github.io/eslint-plugin-vue/user-guide/#editor-integrations)。

## 文档目录介绍

- 前端概要设计文档（docs/designOverview.md）
  * 包括基础技术体系设计
- 前端详细设计文档（docs/designDetails/*.md）
  * 包括模块详细设计文档
  * 前端项目复杂逻辑/流程/模块说明文档
  * 前端项目复杂逻辑/流程/模块方案设计文档
- 前端项目使用手册（README.md）
  * 包括基础的项目信息
  * 包括如何启动项目、构建项目等等
  * 包括一些其它文档的引用
- 前端项目代码评审记录（docs/codeReviews/*）
- 前端项目方案评审/技术评审记录（docs/techReviews/*）
- 前端项目更新日志（docs/releaseNotes.md）
  * 包括发布版本的日志
  * 包括主要版本升级前端的一些更新，比如 Fix/Feat

> 下面的按需存在。

- 前端项目部署手册（docs/deploy.md）
  * 如果对部署有特别要求的话，需要存在
- 前端项目FAQ文档（docs/FAQs.md）
  * 包括一些常见问题集合，比如xxx失败，兼容性问题描述等
- 自动化测试报告（docs/tests/*）
  * 包括自动化测试输出的各种产物
- 已知问题列表（docs/knownIssues.md）
- 定制版本详细变更文档（docs/customized/*）
- 前端开发计划文档（docs/roadmap.md）
- 任何其它设计资源
