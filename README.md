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
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

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

## TODOs

- [x] 完成初始版本
- [x] 完成结构讨论和调整
- [x] 完成 `vue-cli` 升级
- [x] 采用 `preset-env`，去除 promise-polyfill/babel-polyfill 等直接引入
- [ ] 按需引入，见[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
- [ ] 集成 `cache`
- [ ] 优化中心化存储 + `Resource` 资源利用，不使用 `vuex`
- [ ] 增加 `admin-seed-cli`
- [ ] 集成 `ts`

## NOTICE

`ant-design-vue@1.2.0` 菜单收起会有问题。
