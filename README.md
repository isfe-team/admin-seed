# seed-project

Admin seed project by @bqliu & @hxli.

Use `vue`and `ant-design-vue`, and based on `@vue/cli` to build an admin seed project.

> Of course, in fact, this is also a template.

> Thank ymliu for cute icons.

## Build Setup

``` bash
npm install
## for dev
npm run serve
## for build/release
npm run build
## for test
npm run test
## for lint
npm run lint
## for unit test
npm run test:unit
# use this to commit
$ npm run commit
# upgrade versions and tag
$ npm version <param>
$ git push origin --tag
# publish
git subtree push --prefix dist origin gh-pages
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

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

## Optimizations

The major bundle is the 3rd-party lib - `ant-design-vue`, you can see [this issue](https://github.com/vueComponent/ant-design-vue/issues/325) for more informations. Btw, the `admin-seed` use `src/components/registerServiceWorker.js` to centrally manage the `ant-design-vue` components.

## Directories

```
- src
  - store
  - router
  - entries
    - login
      - login.html
      - login.js
      - login.less
      - Login.vue
    - index
      - index.html
      - index.js
      - index.less
      - App.vue
  - components
    - common
    - trans
  - assets
    - fonts
    - images
  - styles
    - base.less
    - vars.less
    - ant-design-vue.less
    - icons
    - index.less
  - utils
    - helpers
    - constants
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

- [ ] 优化内部所有内置脚本

### 1.0

- [ ] 优化内部所有内置组件
- [ ] 增加基础库测试
- [ ] `admin-seed-cli` 增加配置，使用不同的 seed project 源，进一步支持大家 fork 这个项目，并使用自己的版本

### 2.0

- [ ] 使用类组件
- [ ] 迁移到 `ts`
- [ ] `admin-seed-cli` 增加配置，使用 `ts` or `js` 版本
- [ ] 开发数据层，优化中心化存储 + `Resource` 资源利用，不使用 `vuex`，集成 `cache`

## NOTICE

`ant-design-vue@1.2.0` 菜单收起会有问题，see [this issue](https://github.com/vueComponent/ant-design-vue/issues/338)。 更新到 `1.2.4+` 即可。
