# Known Issues

## Bundle size too large

The major bundle is the 3rd-party lib - `ant-design-vue`, you can see [this issue](https://github.com/vueComponent/ant-design-vue/issues/325) for more informations. Btw, the `admin-seed` use `src/components/registerServiceWorker.js` to centrally manage the `ant-design-vue` components.

### ant-design-vue Menu

`ant-design-vue@1.2.0` 菜单收起会有问题，see [this issue](https://github.com/vueComponent/ant-design-vue/issues/338)。 更新到 `1.2.4+` 即可。
