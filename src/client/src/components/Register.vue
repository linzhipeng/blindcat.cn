<!-- 用户注册 -->

<template>
  <el-form :model="registerForm" :rules="rules" ref="registerFormRef" label-width="100px">
    <el-form-item label="昵称" prop="username">
      <el-input
        :value="registerForm.username"
        @change="recordRegisterData('username', $event)"
      ></el-input>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input
        :value="registerForm.email"
        @change="recordRegisterData('email', $event)"
      ></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        :value="registerForm.password"
        @change="recordRegisterData('password', $event)"
        auto-complete="off"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('registerFormRef')">立即注册</el-button>
  </el-form>
</template>

<script type="text/javascript">
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        registerForm: 'registerForm',
        rules: 'rules'
      })
    },
    methods: {
      ...mapActions([
        'submitRegister'
      ]),
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('submit!')
            this.$store.dispatch('submitRegisterData')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      recordRegisterData (name, value) {
        this.$store.commit('recordRegisterData', {
          name: name,
          value: value
        })
      }
    }
  }
</script>