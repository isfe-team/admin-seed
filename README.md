# admin-seed

> A Vue.js project

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

##.搭建vue脚手架

```内容
# 安装一系列我们需要的内容(vue-router, ant-design-vue, less, axios, vuex, promise-polyfill, lodash等)

# 项目目录大致划分
- src
	- assets (项目所需图片)
	- components (项目业务组件)
	- router (路由配置)
	- utils (一些工具函数,包括接口，常量配置等)
	- styles (基础样式和公用样式设置)
	- store (状态管理仓库)
	- app.vue
	- main.js
	- login.js
- index.html
- login.html