# seed-project

Admin seed project.

Use `vue`and `ant-design-vue`, and based on `@vue/cli` to build an admin seed project.

> Of course, in fact, this is also a template.

## Build Setup

``` bash
# install dependencies
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

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
[x] 完成结构讨论和调整
[x] 完成 `vue-cli` 升级
[x] 采用 `preset-env`，去除 promise-polyfill/babel-polyfill 等直接引入
[] 按需引入，见[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
[] 集成 `rx-cache`
[] 使用 `rx` 优化中心化存储 + `Resource` 资源利用，不使用 `vuex`
[] 增加 `cli`
[] 集成 `ts`
