<template>
  <div id="login">
    <div class="login-logo-wrapper">
      <img src="@/assets/logo.png" alt="logo">
      <h1>Admin Seed</h1>
    </div>
    <AForm @submit.prevent="login" :form="loginForm" class="login-form">
      <AFormItem
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
        label="用户名："
      >
        <AInput placeholder="admin" v-decorator="['userName', {rules: [{ required: true, message: '请输入用户名' }]}]">
          <AIcon slot="prefix" type="user" />
        </AInput>
      </AFormItem>
      <AFormItem
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 19 }"
        label="密码："
      >
        <AInput type="password" autocomplete placeholder="88888888" v-decorator="['password', {rules: [{ required: true, message: '请输入密码' }]}]">
          <AIcon slot="prefix" type="lock" />
        </AInput>
      </AFormItem>
      <AFormItem>
        <AButton block :disabled="hasError" type="primary" htmlType="submit" class="login-button">登录</AButton>
      </AFormItem>
    </AForm>
  </div>
</template>

<script>
import { getErrorMessage } from '@/utils/helpers'

/* mock validation */
function mockLogin () {
  return Math.random() > 0.5 ? Promise.resolve() : Promise.reject(new Error('你错啦哈哈哈'))
}

export default {
  name: 'Login',
  data () {
    return {
      loginForm: this.$form.createForm(this, {
        onFieldsChange: () => {
          const fieldsError = this.loginForm.getFieldsError()
          this.hasError = Object.keys(fieldsError).some((k) => fieldsError[k])
        }
      }),
      hasError: false
    }
  },
  methods: {
    login () {
      new Promise((resolve, reject) => {
        this.loginForm.validateFields((err, formData) => {
          if (!err) {
            return resolve(mockLogin())
          }
          return reject(err)
        })
      }).then(
        () => { location.href = './' },
        (err) => {
          this.$notification.error({ message: 'LOGIN ERROR', description: getErrorMessage(err, '未知错误') })
        }
      )
    }
  }
}
</script>

<style lang="less">
  @import "~@/styles/vars.less";

  #login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #F0F2F5 url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg) no-repeat center / 100%;
    overflow: hidden;

    .login-logo-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      text-align: center;
      /* makes u happier */
      margin-top: -15%;
      margin-bottom: 20px;

      img {
        width: 44px;
        height: 44px;
      }

      h1 {
        line-height: 30px;
        margin-left: 10px;
        margin-bottom: 0;
        font-size: 28px;
        font-weight: 700;
        text-align: center;
      }
    }

    .login-form {
      width: 400px;
      margin: 0 auto;
      padding: @padding-lg @padding-lg 0;
      border-radius: 4px;
      background: #FFF;
      overflow: hidden;

      .ant-input {
        padding-left: 30px;
      }
    }
  }
</style>
