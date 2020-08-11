<template>
  <div class="modal">
    <div>
      <h3>异步关闭</h3>
      <a-button type="primary" @click="showModal">打开弹窗</a-button>
      <a-modal v-model="visible" title="新建弹窗" @ok="handleOk">
        <a-form :form="form">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="弹窗名称"
          >
            <a-input
              v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your name' }] },
        ]"
              placeholder="Please input your name"
            />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="弹窗描述"
          >
            <a-textarea
              v-decorator="[
          'nickname',
          { rules: [{ required: checkNick, message: 'Please input your nickname' }] },
        ]"
              placeholder="Please input your nickname"
            />
          </a-form-item>
          <a-form-item
            :label-col="formTailLayout.labelCol"
            :wrapper-col="formTailLayout.wrapperCol"
          >
            <a-checkbox :checked="checkNick" @change="handleChange">同意</a-checkbox>
          </a-form-item>
          <a-form-item
            :label-col="formTailLayout.labelCol"
            :wrapper-col="formTailLayout.wrapperCol"
          >
            <a-button type="primary" @click="check">Check</a-button>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    <div>
      <h3>自定义位置</h3>
      <a-button
        type="primary"
        @click="() => (modal2Visible = true)"
      >对话框在屏幕中间</a-button>
      <a-modal
        v-model="modal2Visible"
        title="Vertically centered modal dialog"
        centered
        @ok="() => (modal2Visible = false)"
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </a-modal>
    </div>
    <div>
      <h3>信息提示</h3>
      <a-button @click="info">信息</a-button>
      <a-button @click="success">成功</a-button>
      <a-button @click="error">错误</a-button>
      <a-button @click="warning">警告</a-button>
    </div>
    <div>
      <h3>确认对话框</h3>
      <a-button @click="showConfirm">确认</a-button>
      <a-button type="dashed" @click="showDeleteConfirm">删除</a-button>
      <a-button type="dashed" @click="showPropsConfirm">其它</a-button>
    </div>
    <div>
      <h3>手动更新和移除</h3>
      <a-button @click="countDown">5s中关闭</a-button>
    </div>
  </div>
</template>
<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10, offset: 4 }
}
export default {
  data () {
    return {
      visible: false,
      checkNick: false,
      formItemLayout,
      modal2Visible: false,
      formTailLayout,
      form: this.$form.createForm(this, { name: 'dynamic_rule' })
    }
  },
  methods: {
    countDown () {
      let secondsToGo = 5
      const modal = this.$success({
        title: 'This is a notification message',
        content: `This modal will be destroyed after ${secondsToGo} second.`
      })
      const interval = setInterval(() => {
        secondsToGo -= 1
        modal.update({
          content: `This modal will be destroyed after ${secondsToGo} second.`
        })
      }, 1000)
      setTimeout(() => {
        clearInterval(interval)
        modal.destroy()
      }, secondsToGo * 1000)
    },
    showConfirm () {},
    showPropsConfirm () {},
    showDeleteConfirm () {},
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      this.visible = false
    },
    check () {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleChange (e) {
      this.checkNick = e.target.checked
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true })
      })
    },
    info () {
      const h = this.$createElement
      this.$info({
        title: 'This is a notification message',
        content: h('div', {}, [
          h('p', 'some messages...some messages...'),
          h('p', 'some messages...some messages...')
        ]),
        onOk () {}
      })
    },

    success () {
      this.$success({
        title: 'This is a success message',
        // JSX support
        content: (
          <div>
            <p>some messages...some messages...</p>
            <p>some messages...some messages...</p>
          </div>
        )
      })
    },

    error () {
      this.$error({
        title: 'This is an error message',
        content: 'some messages...some messages...'
      })
    },

    warning () {
      this.$warning({
        title: 'This is a warning message',
        content: 'some messages...some messages...'
      })
    }
  }
}
</script>
<style lang="less">
.modal {
  .ant-btn {
    margin: 0 20px 20px 0;
  }
  h3 {
    padding-top: 10px;
  }
}
</style>
