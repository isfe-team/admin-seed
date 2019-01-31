<script>
/*!
 * 使用 Form.create 来做的，但是不支持类组件，很尴尬
 */

import { getErrorMessage } from '@/utils/helpers'
import { Form, Input, Button, Icon } from 'ant-design-vue'
import './App.less'

/* mock validation */
function mockLogin () {
  return Math.random() > 0.5 ? Promise.resolve() : Promise.reject(new Error('你错啦哈哈哈'))
}

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}

const LoginForm = {
  methods: {
    login (evt) {
      evt.preventDefault()
      new Promise((resolve, reject) => {
        this.loginForm.validateFields((err, formData) => {
          if (!err) {
            return resolve(mockLogin())
          }
          return reject(err)
        })
      }).then(
        () => { location.href = './' },
        (err) => { this.$notification.error({ message: 'LOGIN ERROR', description: getErrorMessage(err, '未知错误') }) }
      )
    }
  },
  render () {
    window.x = this
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.form

    const userNameError = isFieldTouched('userName') && getFieldError('userName')
    const passwordError = isFieldTouched('password') && getFieldError('password')

    return (
      <div id="login">
        <div class="login-logo-wrapper">
          <img src="@/assets/logo.png" alt="logo" />
          <h1>Admin Seed</h1>
        </div>
        <Form onSubmit={this.login} class="login-form">
          <Form.Item
            validateStatus={userNameError ? 'error' : ''}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            label="用户名："
          >
            {
              getFieldDecorator('userName', { rules: [{ required: true, message: '请输入用户名' }] })(
                <Input placeholder="admin"><Icon slot="prefix" type="user" /></Input>
              )
            }
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            label="密码："
          >
            {
              getFieldDecorator('password', { rules: [{ required: true, message: '请输入密码' }] })(
                <Input type="password" autocomplete placeholder="88888888">
                  <Icon slot="prefix" type="lock" />
                </Input>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} class="login-button">登录</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create({})(LoginForm)
</script>
