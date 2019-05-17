# Known Issues

## Bundle size too large

The major bundle is the 3rd-party lib - `ant-design-vue`, you can see [this issue](https://github.com/vueComponent/ant-design-vue/issues/325) for more informations. Btw, the `admin-seed` use `src/components/registerServiceWorker.js` to centrally manage the `ant-design-vue` components.

### ant-design-vue Menu

`ant-design-vue@1.2.0` 菜单收起会有问题，see [this issue](https://github.com/vueComponent/ant-design-vue/issues/338)。 更新到 `1.2.4+` 即可。

### `1.0.1` 菜单和 `PQTable` 问题

`1.0.1` 版本中菜单水平模式下如果选中一个子菜单，刷新页面菜单会默认都打开，另外 `PQTable` 中的 `exist`、`disabled` 参数遗失。可以通过更新到 `1.0.2` 修复。
