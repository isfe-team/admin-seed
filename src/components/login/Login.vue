<script>
/*!
 * 使用 Form.create 来做的，但是不支持类组件，很尴尬
 * @see https://ant.design/components/form-cn/#components-form-demo-normal-login
 */

import { Form, Input, Button, Icon } from 'ant-design-vue'
import { getErrorMessage } from '@/utils/helpers'
import { login } from '@/apis/services/user'
import logo from '@/assets/logo.png'
import './Login.less'

function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}

const LOGIN_ERROR_NOTIFICATION_KEY = 'LOGIN_ERROR_'

const LoginForm = {
  data () {
    return {
      currentKeyIndex: 0
    }
  },
  methods: {
    login (evt) {
      evt.preventDefault()
      new Promise((resolve, reject) => {
        this.form.validateFields((err, formData) => {
          if (!err) {
            return resolve()
          }
          return reject(err)
        })
      }).then(() => {
        login().then(
          () => { this.$router.push('main') },
          (err) => { this.notify(getErrorMessage(err, this.$t('error.UNKNOWN_ERROR'))) }
        )
      }, () => { /* validate error */ })
    },
    notify (desc) {
      this.$notification.error({
        key: `${LOGIN_ERROR_NOTIFICATION_KEY}${++this.currentKeyIndex}`,
        message: 'LOGIN ERROR',
        description: desc
      })
    }
  },
  mounted () {
    // To disabled submit button at the beginning.
    this.form.validateFields(() => { /* Ignore */ })
  },
  beforeDestroy () {
    for (let i = this.currentKeyIndex; i > 0; --i) {
      this.$notification.close(`${LOGIN_ERROR_NOTIFICATION_KEY}${i}`)
    }
  },
  render () {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.form

    const userNameError = isFieldTouched('userName') && getFieldError('userName')
    const passwordError = isFieldTouched('password') && getFieldError('password')

    return (
      <div id="login">
        <div class="login-logo-wrapper">
          <img src={logo} alt="logo" />
          <h1>Admin Seed</h1>
        </div>
        <Form onSubmit={this.login} class="login-form">
          <Form.Item
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            label={this.$t('login.userNameLabel')}
          >
            {
              getFieldDecorator('userName', { rules: [{ required: true, message: this.$t('login.userNameTip') }] })(
                <Input placeholder={this.$t('login.userNameTip')}><Icon slot="prefix" type="user" /></Input>
              )
            }
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            label={this.$t('login.passwordLabel')}
          >
            {
              getFieldDecorator('password', { rules: [{ required: true, message: this.$t('login.passwordTip') }] })(
                <Input type="password" autocomplete placeholder={this.$t('login.passwordTip')}>
                  <Icon slot="prefix" type="lock" />
                </Input>
              )
            }
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} class="login-button">{this.$t('login.loginLabel')}</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create({})(LoginForm)
</script>
