<template>
  <div id="login">
    <div class="login-img"></div>
    <div class="login-form-wrap">
      <div class="login-logo">
        <img src="@/assets/logo.png" alt="">
        <span class="login-title">用户登录</span>
      </div>
      <AForm @submit.prevent :auto-form-create="(form) => {this.loginForm = form}" class="login-form">
        <AFormItem :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" label="用户名："  field-decorator-id="userName" class="input-wrap"
          :field-decorator-options="{rules: [{ required: true, message: '请输入用户名' }]}">
          <AInput placeholder="admin"></AInput>
          <AIcon type="user" class="input-icon" />
        </AFormItem>
        <AFormItem required :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" label="密码："  field-decorator-id="password" class="input-wrap"
          :field-decorator-options="{rules: [{ required: true, message: '请输入密码' }]}">
          <AInput type="password" placeholder="88888888"></AInput>
        <AIcon type="lock" class="input-icon" />
        </AFormItem>
      </AForm>
      <AButton type="primary" @click.native.prevent="login" class="login-button">登录</AButton>
      <div class="error-message">{{errorTip}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      errorTip: ''
    }
  },
  methods: {
    login () {
      function validate () {
        return Promise.resolve()
      }

      this.loginForm.validateFields((err, formData) => {
        if (!err) {
          validate().then(() => {
            location.href = document.location.origin
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
  #login {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: #F0F2F5 url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg) no-repeat center 110px;
        background-size: 100%;
        overflow: hidden;
    overflow: hidden;

    .login-form-wrap {
      height: 300px;
      width: 400px;
      margin: 150px auto;
      border-radius: 4px;
      padding: 20px;

      .login-logo {
        width: 100%;
        text-align: center;
        margin-bottom: 20px;

        img {
          width: 18px;
          height: 18px;
        }

        .login-title {
          height: 30px;
          line-height: 30px;
          margin-left: 10px;
          text-align: center;
          font-size: 18px;
          font-weight: 700;
        }
      }

      .login-form {
        background: #FFF;
        padding: 35px 20px 15px 20px;
      }

      .ant-input {
        padding-left: 30px;
      }
    }
  }

  .input-wrap {
    position: relative;

    .input-icon {
      position: absolute;
      top: 2px;
      left: 10px;
      display: inline-block;
      width: 15px;
      height: 16px;
    }
  }

  .error-message {
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    color: red;
  }

  .login-button {
    width: 100%;
    margin-top: 35px;
  }

</style>
