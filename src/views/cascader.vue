<template>
  <div>
    <h3>输入框大小</h3>
    <a-cascader size="large" :options="options" @change="onChange" />
    <br />
    <br />
    <a-cascader :options="options" @change="onChange" />
    <br />
    <br />
    <a-cascader size="small" :options="options" @change="onChange" />
    <br />
    <br />
    <div style="width:30%;">
      <h3>默认值</h3>
      <a-cascader
        :options="options"
        :default-value="['zhejiang', 'hangzhou', 'xihu']"
        style="width: 100%"
      >
        <template slot="displayRender" slot-scope="{ labels, selectedOptions }">
          <span v-for="(label, index) in labels" :key="selectedOptions[index].value">
            <span v-if="index === labels.length - 1">
              {{ label }} (
              <a @click="e => handleAreaClick(e, label, selectedOptions[index])">
                {{
                selectedOptions[index].code
                }}
              </a>)
            </span>
            <span v-else @click="onChange">{{ label }} /</span>
          </span>
        </template>
      </a-cascader>
    </div>
    <br />
    <br />
    <div>
      <h3>每一级都显示出来</h3>
      <a-cascader
        :options="options"
        :load-data="loadData"
        placeholder="Please select"
        change-on-select
      />
    </div>
    <br />
    <br />
    <div>
      <h3>更换后面的图标</h3>
      <a-cascader
        style="margin-top: 1rem"
        :options="options"
        placeholder="Please select"
        @change="onChange"
      >
        <a-icon slot="suffixIcon" type="smile" class="test" />
      </a-cascader>
    </div>
    <br />
    <div>
      <a-cascader
        suffix-icon="ab"
        style="margin-top: 1rem"
        :options="options"
        placeholder="Please select"
        @change="onChange"
      />
    </div>
    <div style="margin-top:30px;">
      <h3>切换按钮和结果分开</h3>
      <span>
        {{ text }} &nbsp;
        <a-cascader :options="options" @change="onChange1">
          <a href="#">Change city</a>
        </a-cascader>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      text: 'Unselect',
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    onChange (value) {
      console.log(value)
    },
    onChange1 (value, selDatas) {
      this.text = selDatas.map(item => item.label).join(',')
    },
    loadData () {}
  }
}
</script>
