<template>
  <div class="header">
    <div class="header-left" :class="{collapsed}">
      <div class="title-wrap">
        <img src="@/assets/logo.png" alt="" class="header-icon">
        <span class="header-title">Admin See</span>
      </div>
      <AIcon type="menu-fold" class="icon" @click="collapse" v-if="!collapsed" />
        <AIcon type="menu-unfold" class="icon" v-if="collapsed" @click="collapse" />
    </div>
    <div class="header-right">
      <div>
        <img src="@/assets/logo.png" alt="" class="user-icon">
        <ADropdown :trigger="['click']">
          <span class="user-name" href="#">
            你好 {{userInfo.userName}} <AIcon type="down" />
          </span>
          <AMenu slot="overlay">
            <AMenuItem key="0">
              <a type="logout" class="logout" @click="logout">退出</a>
            </AMenuItem>
            <AMenuItem key="1">
              <a @click="updatePassword">修改密码</a>
            </AMenuItem>
          </AMenu>
        </ADropdown>
      </div>
    </div>
     <AModal
      width="400px"
      v-model="passwordDialog"
      title="修改密码"
      :mask-closable="false"
      :closable="false"
      :destroy-on-close="true"
      okText="提交"
      cancelText="取消"
      @ok="confirmOperation"
      @cancel="passwordDialog = false"
      >
      <AForm @submit.prevent :autoFormCreate="(form)=>{this.form = form}">
        <AFormItem :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" label="当前密码" fieldDecoratorId="currentPassword" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入原密码' }]}">
          <AInput placeholder="请输入"></AInput>
        </AFormItem>
        <AFormItem :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" label="新密码"  fieldDecoratorId="newPassword" :fieldDecoratorOptions="{rules: [{ required: true, validator: fieldValiNewPassword }]}">
          <AInput placeholder="请输入"></AInput>
        </AFormItem>
        <AFormItem :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" label="再次输入" fieldDecoratorId="confirmPassword" :fieldDecoratorOptions="{rules: [{ required: true, validator: fieldValiConfirmPassword }]}">
          <AInput placeholder="请输入"></AInput>
        </AFormItem>
      </AForm>
    </AModal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { showErrorTip, showSuccessTip } from '@/utils/helpers'

export default {
  name: 'AppHeader',
  data () {
    return {
      passwordDialog: false
    }
  },
  props: [ 'collapsed' ],
  computed: {
    ...mapGetters([ 'userInfo' ])
  },
  methods: {
    ...mapActions([ 'setUserInfo' ]),
    collapse () {
      this.$emit('toggle-collapse-menu')
    },
    updatePassword () {
      this.passwordDialog = true
    },
    fieldValiNewPassword (rule, value, callback) {
      if (typeof (value) === 'undefined' || value === '') {
        callback('请输入新密码')
      }
      if (this.form.getFieldValue('confirmPassword') && value !== this.form.getFieldValue('confirmPassword')) {
        callback('两次输入密码不一致')
      }
      callback()
    },
    fieldValiConfirmPassword (rule, value, callback) {
      if (typeof (value) === 'undefined' || value === '') {
        callback('请再次输入')
      }
      if (this.form.getFieldValue('newPassword') && value !== this.form.getFieldValue('newPassword')) {
        callback('两次输入密码不一致')
      }
      callback()
    },
    confirmOperation (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.currentPassword !== this.userInfo.password) {
            showErrorTip(null, '原密码错误')
            return
          }
          const userInfo = {
            userName: this.userInfo.userName,
            password: values.newPassword
          }
          this.setUserInfo(userInfo)
          this.passwordDialog = false
          showSuccessTip('修改密码成功')
        }
      })
    },
    logout () {
      this.$confirm({
        title: '是否退出系统',
        onOk () {
          window.location.href = document.location.origin + '/login.html'
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/vars.less";
  .header {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .header-left {
    display: flex;
    width: calc(@app-menu-width + 36px);
    align-items: center;
    .title-wrap {
      width: @app-menu-width;
      font-size: 18px;
      background: #002140;
      color: #FFF;
      height: @app-header-height;
      line-height: @app-header-height;
      .header-icon {
        width: 30px;
        height: 30px;
        margin-left: 25px;
      }
    }
    .icon {
      text-align: center;
      font-size: 20px;
      cursor: pointer;
      margin-left: 16px;
    }
  }
  .header-right {
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30px;
    .user-icon {
      width: 15px;
      height: 15px;
    }
    .user-name {
      cursor: pointer;
    }
    .logout {
      cursor: pointer;
      font-size: 18px;
      margin-left: 20px;
    }
  }
  .collapsed {
    width: calc(~"@{collapsed-menu-width} + 36px");
    .header-title {
      display: none;
    }
  }
</style>
