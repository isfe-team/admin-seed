<template>
  <div>
    <h3>适应文本高度的文本域</h3>
    <a-textarea placeholder="Autosize height based on content lines" auto-size />
    <div style="margin: 24px 0" />
    <a-textarea
      placeholder="Autosize height with minimum and maximum number of lines"
      :auto-size="{ minRows: 2, maxRows: 6 }"
    />
    <div style="margin: 24px 0" />
    <a-textarea
      v-model="value"
      placeholder="Controlled autosize"
      :auto-size="{ minRows: 3, maxRows: 5 }"
    />
    <div style="margin: 24px 0">
      <h3>前缀和后缀</h3>
      <a-input ref="userNameInput" v-model="userName" placeholder="Basic usage">
        <a-icon slot="prefix" type="user" />
        <a-tooltip slot="suffix" title="Extra information">
          <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
        </a-tooltip>
      </a-input>
      <br />
    <br />
      <a-input prefix="￥" suffix="RMB" />
    </div>
    <div class="margin:24px 0;">
      <h3>不同大小</h3>
      <a-input size="large" placeholder="大尺寸" />
      <br><br>
      <a-input placeholder="默认大小" />
      <br><br>
      <a-input size="small" placeholder="小尺寸" />
    </div>
    <br>
    <h3>输入框的组合展现</h3>
      <a-input-group size="large">
      <a-row :gutter="8">
        <a-col :span="5">
          <a-input default-value="0571" />
        </a-col>
        <a-col :span="8">
          <a-input default-value="26888888" />
        </a-col>
      </a-row>
    </a-input-group>
    <br />
    <a-input-group compact>
      <a-input style="width: 20%" default-value="0571" />
      <a-input style="width: 30%" default-value="26888888" />
    </a-input-group>
    <br />
    <a-input-group compact>
      <a-select default-value="Zhejiang">
        <a-select-option value="Zhejiang">
          Zhejiang
        </a-select-option>
        <a-select-option value="Jiangsu">
          Jiangsu
        </a-select-option>
      </a-select>
      <a-input style="width: 50%" default-value="Xihu District, Hangzhou" />
    </a-input-group>
    <br />
    <a-input-group compact>
      <a-select default-value="Option1">
        <a-select-option value="Option1">
          Option1
        </a-select-option>
        <a-select-option value="Option2">
          Option2
        </a-select-option>
      </a-select>
      <a-input style="width: 50%" default-value="input content" />
    </a-input-group>
    <br />
    <a-input-group compact>
      <a-input style="width: 50%" default-value="input content" />
      <a-date-picker style="width: 50%" />
    </a-input-group>
    <br />
    <a-input-group compact>
      <a-select default-value="Option1-1">
        <a-select-option value="Option1-1">
          Option1-1
        </a-select-option>
        <a-select-option value="Option1-2">
          Option1-2
        </a-select-option>
      </a-select>
      <a-select default-value="Option2-2">
        <a-select-option value="Option2-1">
          Option2-1
        </a-select-option>
        <a-select-option value="Option2-2">
          Option2-2
        </a-select-option>
      </a-select>
    </a-input-group>
    <br />
    <a-input-group compact>
      <a-select default-value="1">
        <a-select-option value="1">
          Between
        </a-select-option>
        <a-select-option value="2">
          Except
        </a-select-option>
      </a-select>
      <a-input style=" width: 100px; text-align: center" placeholder="Minimum" />
      <a-input
        style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
        placeholder="~"
        disabled
      />
      <a-input style="width: 100px; text-align: center; border-left: 0" placeholder="Maximum" />
    </a-input-group>
    <br />
    <a-input-group compact>
      <a-select default-value="Sign Up">
        <a-select-option value="Sign Up">
          Sign Up
        </a-select-option>
        <a-select-option value="Sign In">
          Sign In
        </a-select-option>
      </a-select>
      <a-auto-complete
        :data-source="dataSource"
        style="width: 200px"
        placeholder="Email"
        @change="handleChange"
      />
    </a-input-group>
    <br />
    <a-input-group compact>
      <a-select style="width: 30%" default-value="Home">
        <a-select-option value="Home">
          Home
        </a-select-option>
        <a-select-option value="Company">
          Company
        </a-select-option>
      </a-select>
      <a-cascader style="width: 70%" :options="options" placeholder="Select Address" />
    </a-input-group>
    <br>
    <br>
  </div>
</template>
<script>
const options = [
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
export default {
  data () {
    return {
      value: '',
      userName: '',
      options,
      dataSource: []
    }
  },
  methods: {
    handleChange () {

    }
  }
}
</script>
