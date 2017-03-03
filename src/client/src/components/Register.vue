<!-- 用户注册 -->

<template>
  <el-tabs :active-name="activeName">
    <el-tab-pane label="注册" name="register" class="form_box">
      <el-form :model="userForm" :rules="rules" ref="registerFormRef" label-width="68px">
        <el-form-item label="昵称" prop="username">
          <el-input
            :value="userForm.username"
            @change="recordUserData('username', $event)"
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input
            :value="userForm.email"
            @change="recordUserData('email', $event)"
          ></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="verifyCode">
          <el-input
            placeholder="请输入内容"
            style="max-width: 300px;"
            :value="userForm.verifyCode"
            @change="recordUserData('verifyCode', $event)"
          >
            <el-button slot="append" @click="sendEmailVerifyCode">获取验证码</el-button>
          </el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            :value="userForm.password"
            @change="recordUserData('password', $event)"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('registerFormRef', 'register')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>

    <el-tab-pane label="登录" name="login" class="form_box">
      <el-form :model="userForm" :rules="rules" ref="loginFormRef" label-width="68px">
        <el-form-item label="邮箱" prop="email">
          <el-input
            :value="userForm.email"
            @change="recordUserData('email', $event)"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            :value="userForm.password"
            @change="recordUserData('password', $event)"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginFormRef', 'login')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script type="text/javascript">
  import { mapGetters, mapActions } from 'vuex'
  import { Notification } from 'element-ui'

  export default {
    computed: {
      ...mapGetters({
        userForm: 'userForm',
        rules: 'rules',
        activeName: 'activeName'
      })
    },
    methods: {
      ...mapActions([
        'submitRegister'
      ]),
      // 发送邮件验证码
      sendEmailVerifyCode () {
        // 检查邮箱合法性
        this.$refs['registerFormRef'].validateField('email', valid => {
          if (valid) {
            Notification({
              title: '出错了',
              message: valid,
              type: 'error'
            })
          } else {
            // 提交邮箱获取验证码
            this.$store.dispatch('sendEmailVerifyCode')
              .then(res => {
                if (res && res.data) {
                  if (res.data.state) {
                    Notification({
                      title: '成功',
                      message: '已经向您的邮箱发送验证码，请注意查收。（若没收到，请留意邮箱的垃圾箱）',
                      type: 'success'
                    })
                  } else {
                    Notification({
                      title: '出错了',
                      message: res.data.info,
                      type: 'error'
                    })
                  }
                }
              })
              .catch(e => {
                Notification({
                  title: '服务器错误',
                  message: e,
                  type: 'error'
                })
              })
          }
        })
      },
      // 提交注册/登录表单
      submitForm (formName, submitType) {
        // 检查表单合法性
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交注册表单
            if (submitType === 'register') {
              this.$store.dispatch('submitRegisterData')
                .then(res => {
                  if (res && res.data) {
                    if (res.data.state) {
                      Notification({
                        title: '成功',
                        message: '注册成功！请输入密码进行登录！',
                        type: 'success'
                      })
                      this.$store.commit('toLogin')
                    } else {
                      Notification({
                        title: '出错了',
                        message: res.data.info,
                        type: 'error'
                      })
                    }
                  }
                })
                .catch(e => {
                  Notification({
                    title: '服务器错误',
                    message: e,
                    type: 'error'
                  })
                })
            } else {
              // 提交登录表单
              this.$store.dispatch('submitLoginData')
                .then(res => {
                  if (res && res.data) {
                    if (res.data.state) {
                      // 缓存用户信息
                      window.localStorage.userInfo = JSON.stringify(res.data.data)
                      // 读取缓存数据
                      this.$store.dispatch('updateUserInfo')
                      // 跳转到首页
                      this.$router.push('/')
                      Notification({
                        title: '成功',
                        message: '登录成功！',
                        type: 'success'
                      })
                    } else {
                      Notification({
                        title: '出错了',
                        message: res.data.info,
                        type: 'error'
                      })
                    }
                  }
                })
                .catch(e => {
                  Notification({
                    title: '服务器错误',
                    message: e,
                    type: 'error'
                  })
                })
            }
          } else {
            Notification({
              title: '出错了',
              message: '请先完善表单！',
              type: 'error'
            })
            return false
          }
        })
      },
      // 根据输入数据的类型存储用户输入信息
      recordUserData (name, value) {
        this.$store.commit('recordUserData', {
          name: name,
          value: value
        })
      }
    }
  }
</script>

<style scoped>
  .form_box {
    margin-right: 20px;
  }
</style>