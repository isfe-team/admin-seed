<template>
  <div>
    <h3>折叠面板</h3>
    <a-collapse v-model="activeKey">
      <a-collapse-panel key="1" header="This is panel header 1">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="2" header="This is panel header 2" :disabled="false">
        <p>{{ text }}</p>
      </a-collapse-panel>
      <a-collapse-panel key="3" header="This is panel header 3" disabled>
        <p>{{ text }}</p>
      </a-collapse-panel>
    </a-collapse>
    <div style="margin-top:30px;">
      <h3>面板嵌套</h3>
      <a-collapse @change="changeActivekey">
        <a-collapse-panel key="1" header="This is panel header 1">
          <a-collapse default-active-key="4">
            <a-collapse-panel key="4" header="This is panel nest panel">
              <p>{{ text }}</p>
            </a-collapse-panel>
          </a-collapse>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="This is panel header 2" :disabled="false">
          <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="This is panel header 3">
          <p>{{ text }}</p>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div style="margin-top:30px;">
      <h3>简洁风格</h3>
      <a-collapse default-active-key="1" :bordered="false">
        <a-collapse-panel key="1" header="This is panel header 1">
          <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="This is panel header 2" :disabled="false">
          <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="This is panel header 3">
          <p>{{ text }}</p>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div  style="margin:30px 0 30px 0;">
      <h3>自定义面板</h3>
      <a-collapse default-active-key="1" @change="changeActivekey">
        <a-collapse-panel key="1" header="This is panel header with arrow icon">
          <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel
          key="2"
          header="This is panel header with no arrow icon"
          :show-arrow="false"
        >
          <p>{{ text }}</p>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
      activeKey: ['1']
    }
  },
  watch: {
    activeKey (key) {
      console.log(key)
    },
    changeActivekey (key) {
      console.log(key)
    }
  }
}
</script>
