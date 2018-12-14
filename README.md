# admin-seed

Admin seed project.

Use `vue`and `ant-design-vue`, and based on `vue/cli` to build an admin seed project.

> Of course, in fact, this is also a template.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Description

```
- src
	- entries
		- login
			- login.html
			- login.js
			- login.less
			- login.vue
		- index
			- index.html
			- index.js
			- index.less
			- app.vue
	- router
	- components
	- assets
		- fonts
		- images
	- styles
		- vars.less
	- utils
		- helpers
		- constants
	- store
	- vendors
```

## TODOS

[x] 完成初始版本
[] 完成结构讨论和调整
[] 完成 `vue-cli` 升级
[] 采用 `preset-env`，去除 promise-polyfill/babel-polyfill 等直接引入
[] 集成 `rx-cache`
[] 使用 `rx` 优化中心化存储 + `Resource` 资源利用，不使用 `vuex`
[] 增加 `cli`
[] 集成 `ts`
