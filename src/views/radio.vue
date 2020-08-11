<template>
  <div>
    <div>
      <h3>水平对齐</h3>
      <a-radio-group v-model="value" @change="onChange">
        <a-radio :value="1">Option A</a-radio>
        <a-radio :value="2">Option B</a-radio>
        <a-radio :value="3" :disabled="true">失效状态</a-radio>
        <a-radio :value="4">
          More...
          <a-input v-if="value === 4" :style="{ width: 100, marginLeft: 10 }" />
        </a-radio>
      </a-radio-group>
    </div>
    <br />
    <br />
    <div>
      <h3>单选组合 - 配合 name 使用</h3>
      <a-radio-group v-model="value1" @change="onChange">
        <a-radio :value="1">A</a-radio>
        <a-radio :value="2">B</a-radio>
        <a-radio :value="3">C</a-radio>
        <a-radio :value="4">D</a-radio>
      </a-radio-group>
    </div>
    <br />
    <br />
    <div>
      <h3>大小不同</h3>

      <a-radio-group default-value="a" size="large">
        <a-radio-button value="a">Hangzhou</a-radio-button>
        <a-radio-button value="b">Shanghai</a-radio-button>
        <a-radio-button value="c">Beijing</a-radio-button>
        <a-radio-button value="d">Chengdu</a-radio-button>
      </a-radio-group>
    </div>
    <div :style="{ marginTop: '16px' }">
      <a-radio-group default-value="a">
        <a-radio-button value="a">Hangzhou</a-radio-button>
        <a-radio-button value="b">Shanghai</a-radio-button>
        <a-radio-button value="c">Beijing</a-radio-button>
        <a-radio-button value="d">Chengdu</a-radio-button>
      </a-radio-group>
    </div>
    <div :style="{ marginTop: '16px' }">
      <a-radio-group default-value="a" size="small">
        <a-radio-button value="a">Hangzhou</a-radio-button>
        <a-radio-button value="b">Shanghai</a-radio-button>
        <a-radio-button value="c">Beijing</a-radio-button>
        <a-radio-button value="d">Chengdu</a-radio-button>
      </a-radio-group>
    </div>

    <div :style="{ marginTop: '30px' }">
      <h3>失败状态</h3>
      <a-radio-group disabled default-value="a" @change="onChange">
        <a-radio-button value="a">Hangzhou</a-radio-button>
        <a-radio-button value="b">Shanghai</a-radio-button>
        <a-radio-button value="c">Beijing</a-radio-button>
        <a-radio-button value="d">Chengdu</a-radio-button>
      </a-radio-group>
    </div>
    <div :style="{ marginTop: '30px' }">
      <h3>动态失效</h3>
      <a-radio :default-checked="false" :disabled="disabled">选项1</a-radio>
      <br />
      <br />
      <a-radio default-checked :disabled="disabled">选项2</a-radio>
      <br />
      <br />
      <div :style="{ marginTop: 20 }">
        <a-button type="primary" @click="toggleDisabled">Toggle disabled</a-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 'a',
      value1: '1',
      value2: '2',
      disabled: false
    }
  },
  methods: {
    onChange (e) {
      console.log(`checked = ${e.target.value}`)
    },
    toggleDisabled () {
      this.disabled = !this.disabled
    }
  }
}
</script>
