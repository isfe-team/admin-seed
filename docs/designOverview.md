# Design Overview

本项目使用模块化、组件化的开发模式，并且基本采用分层设计模式。

## 模块化

采用 `ES Modules` 方案，并使用 `babel` 转码。

## 组件化

组件化方案基于 `Vue` 组件实现。

## 分层

主要分为 Api层、数据层、组件展示层、路由层。

### api

api层，用于封装与 server 层通信，主要实现了相关项目内拦截器（interceptors）以及相关接口的聚合。

### 数据层

基于 `Vuex` 作为状态管理库，并使用它创建 `Store` 来形成一个数据层，但是目前的数据层并不是很完善，和超大型应用的数据层设计还是有差距。

### 展示层

展示层基本就是 `Vue` 组件以及 `Vue` 组件的挂载点（页面）。

本项目的展示层的实现主要集中在 `components/**` 中，分为 layout 部分（`components/layout`），以及基础的通用组件部分（`components/common`）以及其它各自的业务模块。

另外，由于我们的应用可能并不只是一个纯粹的 spa，所以可能对应着不同的入口，所以设计了一个 `entries` 用于承载不同的入口。

### 路由层

对应于不同的路由，我们可能有不同的展示，所以设计了一个专门的路由层，而路由层也是基于**展示层**来做的。主要集中在 `routes` 中。

## 目录结构

基于不同的层次，所以我们的目录模块设计为：

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
