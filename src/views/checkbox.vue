<template>
  <div>
    <h3>Checkbox组</h3>
    <a-checkbox-group
      v-model="value"
      name="checkboxgroup"
      :options="plainOptions"
      @change="onChange"
    />
    <br />
    <a-checkbox-group :options="plainOptions" :default-value="['Apple']" @change="onChange" />
    <br />
    <a-checkbox-group :options="options" :value="['Pear']" @change="onChange" />
    <br />

    <a-checkbox-group
      :options="optionsWithDisabled"
      disabled
      :default-value="['Apple']"
      @change="onChange"
    >
      <span slot="label" slot-scope="{ value }" style="color: red">{{ value }}</span>
    </a-checkbox-group>
    <br />
    <br />
    <h3>布局</h3>
    <a-checkbox-group @change="onChange">
      <a-row>
        <a-col :span="8">
          <a-checkbox value="A">A</a-checkbox>
        </a-col>
        <a-col :span="8">
          <a-checkbox value="B">B</a-checkbox>
        </a-col>
        <a-col :span="8">
          <a-checkbox value="C">C</a-checkbox>
        </a-col>
        <a-col :span="8">
          <a-checkbox value="D">D</a-checkbox>
        </a-col>
        <a-col :span="8">
          <a-checkbox value="E">E</a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>
    <div style="margin-top:30px;">
      <h3>全选</h3>
      <div :style="{ borderBottom: '1px solid #E9E9E9' }">
        <a-checkbox
          :indeterminate="indeterminate"
          :checked="checkAll"
          @change="onCheckAllChange"
        >全 选</a-checkbox>
      </div>
      <br />
      <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
    </div>
    <div style="margin-top:30px">
      <h3>不可用状态</h3>
      <a-checkbox :default-checked="false" disabled />
      <br />
      <a-checkbox default-checked disabled />
    </div>
    <div style="margin-top:30px;">
      <h3>受控的checkbox</h3>
      <p :style="{ marginBottom: '20px' }">
        <a-checkbox :checked="checked" :disabled="disabled" @change="onChange_2">{{ label }}</a-checkbox>
      </p>
      <p>
        <a-button
          type="primary"
          size="small"
          @click="toggleChecked"
        >{{ !checked ? '选中' : '未选中' }}</a-button>
        <a-button
          :style="{ marginLeft: '10px' }"
          type="primary"
          size="small"
          @click="toggleDisable"
        >{{ !disabled ? '失效' : '可用' }}</a-button>
      </p>
    </div>
  </div>
</template>
<script>
const defaultCheckedList = ['Apple', 'Orange']
const plainOptions = ['Apple', 'Pear', 'Orange']
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]
const optionsWithDisabled = [
  { value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false }
]
export default {
  data () {
    return {
      plainOptions,
      options,
      optionsWithDisabled,
      value: [],
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      checked: false,
      disabled: false
    }
  },
  computed: {
    label () {
      const { checked, disabled } = this
      return `${checked ? '选中' : '未选中'}-${disabled ? '失效' : '可用'}`
    }
  },
  methods: {
    onChange (checkedList) {
      this.indeterminate =
        !!checkedList.length && checkedList.length < plainOptions.length
      this.checkAll = checkedList.length === plainOptions.length
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    },
    toggleChecked () {
      this.checked = !this.checked
    },
    toggleDisable () {
      this.disabled = !this.disabled
    },
    onChange_2 (e) {
      this.checked = e.target.checked
    }
  }
}
</script>
