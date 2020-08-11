<template>
  <div class="anchor">
    <div class="anchor-box">
      <div>
        <h3>最简单的用法</h3>
        <a-anchor>
          <a-anchor-link href="#components-anchor-demo-basic" title="Basic demo" />
          <a-anchor-link href="#components-anchor-demo-static" title="Static demo" />
          <a-anchor-link
            href="#components-anchor-demo-basic"
            title="Basic demo with Target"
            target="_blank"
          />
          <a-anchor-link href="#API" title="API">
            <a-anchor-link href="#Anchor-Props" title="Anchor Props" />
            <a-anchor-link href="#Link-Props" title="Link Props" />
          </a-anchor-link>
        </a-anchor>
      </div>
      <div>
        <h3>静态位置</h3>
        <a-anchor :affix="false">
          <a-anchor-link href="#components-anchor-demo-basic" title="Basic demo" />
          <a-anchor-link href="#components-anchor-demo-static" title="Static demo" />
          <a-anchor-link href="#API" title="API">
            <a-anchor-link href="#Anchor-Props" title="Anchor Props" />
            <a-anchor-link href="#Link-Props" title="Link Props" />
          </a-anchor-link>
        </a-anchor>
      </div>
      <div>
        <h3>监听锚点链接改变</h3>
        <a-anchor :affix="false" @change="onChange">
          <a-anchor-link href="#components-anchor-demo-basic" title="Basic demo" />
          <a-anchor-link href="#components-anchor-demo-static" title="Static demo" />
          <a-anchor-link href="#API" title="API">
            <a-anchor-link href="#Anchor-Props" title="Anchor Props" />
            <a-anchor-link href="#Link-Props" title="Link Props" />
          </a-anchor-link>
        </a-anchor>
      </div>
    </div>
    <div>
      <div id="Anchor-Props" style="margin-top:500px;"><h2>Anchor-Props</h2></div>
      <div id="Link-Props" style="margin-top:700px;"><h2>Link-Props</h2></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    onChange(link) {
      console.log("Anchor:OnChange", link);
    },
    getCurrentAnchor() {
      return "#components-anchor-demo-static";
    },
  },
};
</script>
<style lang="less">
.anchor {
  padding-top: 50px;
  height: 1500px;
  background: #fff;
  .anchor-box {
    display: flex;
    width: 100%;
    justify-content: center;
    > div {
      flex: 1;
      > h3 {
        padding-bottom: 30px;
      }
    }
  }
}
</style>