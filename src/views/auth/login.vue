<template>
  <div class="login-page">
    <div class="login-page-form">
      <div class="mask"></div>
      <div class="logo">
          <img src="../../assets/imgs/ifly-login-logo.png" alt />
        </div>
       <div class="title">
         <a-divider class="user-tit">用户登录</a-divider>
       </div>
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item
          :validate-status="userNameError() ? 'error' : ''"
          :help="userNameError() || ''"
        >
          <a-input

            v-decorator="[
                'userName',
                { rules: [{ required: true, message: 'Please input your username!' }] },
              ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item

          :validate-status="passwordError() ? 'error' : ''"
          :help="passwordError() || ''"
        >
          <a-input
            v-decorator="[
                'password',
                { rules: [{ required: true, message: 'Please input your Password!' }] },
              ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-button type="primary" block html-type="submit">登录</a-button>
      </a-form>
    </div>
  </div>
</template>
<script>
function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}
export default {
  data () {
    return {
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' })
    }
  },
  mounted () {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields()
      this.form.setFieldsValue({ userName: 'admin', password: 'admin' })
    })
  },
  methods: {
    userNameError () {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('userName') && getFieldError('userName')
    },
    // Only show error after a field is touched.
    passwordError () {
      const { getFieldError, isFieldTouched } = this.form
      return isFieldTouched('password') && getFieldError('password')
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          sessionStorage.setItem('token', 'login')
          this.$router.replace({
            path: '/overview'
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
.login-page {
  width: 100%;
  height: 100%;
  background: url("../../assets/imgs/bg.jpg");
  .login-page-form {
    width: 400px;
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    padding: 20px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo{
      position: fixed;
      right: 0;
      top: 200px;
      width: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mask {
      width: 400px;
      height: 100%;
      background: url("../../assets/imgs/bg.jpg");
      background:rgba(0,0,0,.25);
      background-size:cover;
      -webkit-filter: blur(1px);
      -moz-filter: blur(1px);
      -o-filter: blur(1px);
      -ms-filter: blur(1px);
      filter: blur(1px);
      position: fixed;
      right: 0;
      top: 0;
    }
    .title {
      padding-bottom: 20px;
      width:100%;
      .user-tit {
        color: rgba(255,255,255,.7);
      }
    }
    form {
      display: block;
      width: 100%;
    }
  }
  .ant-form-item-label label {
    color: #fff;
  }
}
</style>
