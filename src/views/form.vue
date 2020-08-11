<template>
  <div>
    <div style="margin-bottom:30px;">
      <a-radio-group default-value="horizontal" @change="handleFormLayoutChange">
        <a-radio-button value="horizontal">横向</a-radio-button>
        <a-radio-button value="vertical">纵向</a-radio-button>
        <a-radio-button value="inline">内联</a-radio-button>
      </a-radio-group>
    </div>
    <a-form :layout="formLayout">
      <a-form-item
        label="字段1"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="请输入内容" />
      </a-form-item>
      <a-form-item
        label="字段2"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="请输入内容" />
      </a-form-item>
      <a-form-item
        label="字段3"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="请输入内容" />
      </a-form-item>
      <a-form-item
        label="字段4"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="请输入内容" />
      </a-form-item>
      <a-form-item
        label="字段5"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="请输入内容" />
      </a-form-item>
      <a-form-item
        label="字段6"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="请输入内容" />
      </a-form-item>
      <a-form-item
        label="警告状态"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        has-feedback
        validate-status="warning"
      >
        <a-input id="warning2" placeholder="Warning" />
      </a-form-item>
      <a-form-item
        label="成功状态"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        has-feedback
        validate-status="success"
      >
        <a-input placeholder="I'm the content" />
      </a-form-item>

      <a-form-item
        label="验证中"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        has-feedback
        validate-status="validating"
        help="The information is being validated..."
      >
        <a-cascader :default-value="['1']" :options="[]" />
      </a-form-item>
      <a-form-item
        label="错误状态"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        has-feedback
        validate-status="error"
      >
        <a-input allow-clear placeholder="with input password and allowClear" />
      </a-form-item>

      <a-form-item
        label="时间选择（警告）"
        has-feedback
        validate-status="warning"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-time-picker style="width: 100%" />
      </a-form-item>

      <a-form-item
        label="时间选择（成功）"
        has-feedback
        validate-status="success"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-time-picker style="width: 100%" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary">确认</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLayout: 'horizontal'
    }
  },
  computed: {
    formItemLayout () {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
        : {}
    },
    buttonItemLayout () {
      const { formLayout } = this
      return formLayout === 'horizontal'
        ? {
          wrapperCol: { span: 14, offset: 4 }
        }
        : {}
    }
  },
  methods: {
    handleFormLayoutChange (e) {
      this.formLayout = e.target.value
    }
  }
}
</script>
