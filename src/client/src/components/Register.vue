<!-- 用户注册 -->

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="注册" name="register" class="form_box">
      <el-form :model="userForm" :rules="rules" ref="registerFormRef" label-width="60px">
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
      </el-form>
    </el-tab-pane>

    <el-tab-pane label="登录" name="login" class="form_box">
      <el-form :model="userForm" :rules="rules" ref="loginFormRef" label-width="60px">
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
      submitForm (formName, submitType) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (submitType === 'register') {
              this.$store.dispatch('submitRegisterData')
            } else {
              this.$store.dispatch('submitLoginData')
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