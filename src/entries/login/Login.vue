<template>
  <div id="login">
    <div class="login-logo-wrapper">
      <img :src="logo" alt="logo" />
      <h1>Admin Seed</h1>
    </div>
    <AForm @submit="login" :form="loginForm" class="login-form">
      <AFormItem
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="$t('login.userNameLabel')"
      >
        <AInput
          v-decorator="['username', { rules: [ { required: true, message: transformTo('login.userNameTip') }] }]"
          :placeholder="$t('login.userNameTip')"
          size="large"
        >
        <AIcon slot="prefix" type="user" />
      </AInput>
      </AFormItem>
      <AFormItem
        prop="password"
        :label="$t('login.passwordLabel')"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <AInput
          type="password"
          v-decorator="['password', { rules: [{ required: true, message: transformTo('login.passwordTip') }] }]"
          :placeholder="$t('login.passwordTip')"
          size="large"
        >
          <AIcon slot="prefix" type="lock" />
        </AInput>
      </AFormItem>
      <AFormItem>
        <AButton block type="primary" htmlType="submit"  class="login-button">{{$t('login.loginLabel')}}</AButton>
      </AFormItem>
    </AForm>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'
import { login } from '@/apis/services/user'
import { transformTo } from '@/components/common/i18n/setup'

export default {
  data () {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      logo,
      loginForm: null,
      transformTo
    }
  },
  methods: {
    login (evt) {
      evt.preventDefault()
      new Promise((resolve, reject) => {
        this.loginForm.validateFields((err, formData) => {
          if (!err) {
            return resolve(formData)
          }
          return reject(err)
        })
      }).then((formData) => {
        login(formData).then(() => {
          location.href = './'
        })
      }, () => { /* validate error */ })
    }
  },
  mounted () {
    // To disabled submit button at the beginning.
    this.loginForm = this.$form.createForm(this, { name: 'login' })
  }
}
</script>

<style lang="less" scoped>
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
