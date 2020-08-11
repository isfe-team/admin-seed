<template>
  <div>
    <h3>基本使用</h3>
    <a-select default-value="lucy" style="width: 120px" @change="handleChange">
      <a-select-option value="jack">Jack</a-select-option>
      <a-select-option value="lucy">Lucy</a-select-option>
      <a-select-option value="disabled" disabled>Disabled</a-select-option>
      <a-select-option value="Yiminghe">yiminghe</a-select-option>
    </a-select>
    <a-select default-value="lucy" style="width: 120px" disabled>
      <a-select-option value="lucy">Lucy</a-select-option>
    </a-select>
    <a-select default-value="lucy" style="width: 120px" loading>
      <a-select-option value="lucy">Lucy</a-select-option>
    </a-select>
    <div>
      <h3>大小尺寸</h3>
      <a-radio-group v-model="size">
        <a-radio-button value="large">大尺寸</a-radio-button>
        <a-radio-button value="default">默认大小</a-radio-button>
        <a-radio-button value="small">小尺寸</a-radio-button>
      </a-radio-group>
      <br />
      <br />
      <a-select :size="size" default-value="a1" style="width: 200px" @change="handleChange">
        <a-select-option
          v-for="i in 25"
          :key="(i + 9).toString(36) + i"
        >{{ (i + 9).toString(36) + i }}</a-select-option>
      </a-select>
      <br />
      <a-select
        mode="multiple"
        :size="size"
        placeholder="Please select"
        :default-value="['a1', 'b2']"
        style="width: 200px"
        @change="handleChange"
        @popupScroll="popupScroll"
      >
        <a-select-option
          v-for="i in 25"
          :key="(i + 9).toString(36) + i"
        >{{ (i + 9).toString(36) + i }}</a-select-option>
      </a-select>
      <br />
      <a-select
        mode="tags"
        :size="size"
        placeholder="Please select"
        :default-value="['a1', 'b2']"
        style="width: 200px"
        @change="handleChange"
      >
        <a-select-option
          v-for="i in 25"
          :key="(i + 9).toString(36) + i"
        >{{ (i + 9).toString(36) + i }}</a-select-option>
      </a-select>
    </div>
    <div>
      <h3>带搜索框</h3>
      <a-select
        show-search
        placeholder="Select a person"
        option-filter-prop="children"
        style="width: 200px"
        :filter-option="filterOption"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      >
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="tom">Tom</a-select-option>
      </a-select>
    </div>
    <div>
      <h3>后缀图标</h3>
      <a-select default-value="lucy" style="width: 120px" @change="handleChange">
        <a-icon slot="suffixIcon" type="smile" />
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="disabled" disabled>Disabled</a-select-option>
        <a-select-option value="Yiminghe">yiminghe</a-select-option>
      </a-select>
      <a-select default-value="lucy" style="width: 120px" disabled>
        <a-icon slot="suffixIcon" type="meh" />
        <a-select-option value="lucy">Lucy</a-select-option>
      </a-select>
    </div>
    <div>
      <h3>定制回填内容</h3>
      <a-select
        mode="multiple"
        placeholder="Inserted are removed"
        :value="selectedItems"
        style="width: 100%"
        @change="handleChange1"
      >
        <a-select-option v-for="item in filteredOptions" :key="item" :value="item">{{ item }}</a-select-option>
      </a-select>
    </div>
  </div>
</template>
<script>
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']
export default {
  data () {
    return {
      size: 'default',
      selectedItems: []
    }
  },
  computed: {
    filteredOptions () {
      return OPTIONS.filter(o => !this.selectedItems.includes(o))
    }
  },
  methods: {
    handleChange1 (selectedItems) {
      this.selectedItems = selectedItems
    },
    handleChange () {

    },
    handleFocus () {

    },
    popupScroll () {
      console.log('popupScroll')
    },
    handleBlur () {

    },
    filterOption () {}
  }
}
</script>
<style lang="less" scoped>
.ant-select {
  margin: 0 10px 30px 0;
}
</style>
