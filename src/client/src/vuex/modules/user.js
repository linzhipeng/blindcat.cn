// 用户注册登录信息

import globalConfig from '../../config/config.js'
import axios from 'axios'
const state = {
  userForm: {
    username: '',
    email: '',
    password: '',
    verifyCode: ''
  },
  rules: {
    username: [
      { required: true, message: '请输入昵称', trigger: 'blur' },
      { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur, change' }
    ],
    email: [
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, message: '密码长度至少是6位哦~', trigger: 'blur, change' }
    ],
    verifyCode: [
      { required: true, message: '请输入验证码', trigger: 'blur' },
      { min: 6, max: 6, message: '验证码长度是6位哦~', trigger: 'blur, change' }
    ]
  },
  // 当前选项卡的name
  activeName: 'register'
}

const getters = {
  userForm: state => state.userForm,
  rules: state => state.rules,
  activeName: state => state.activeName,
  verifyCode: state => state.verifyCode
}

const mutations = {
  // 记录用户输入数据
  recordUserData: (state, data) => {
    switch (data.name) {
      case 'username':
        state.userForm.username = data.value
        break
      case 'email':
        state.userForm.email = data.value
        break
      case 'password':
        state.userForm.password = data.value
        break
      case 'verifyCode':
        state.userForm.verifyCode = data.value
        break
      default:
        break
    }
  },
  // 清除注册时的数据并跳转到登录表单
  toLogin: (state) => {
    state.userForm.username = ''
    state.userForm.password = ''
    state.userForm.verifyCode = ''
    state.activeName = 'login'
  }
}

const actions = {
  // 提交注册数据
  submitRegisterData: (context) => {
    return axios.post(globalConfig.apiUrl + 'register', {
      username: context.getters.userForm.username,
      email: context.getters.userForm.email,
      password: context.getters.userForm.password,
      verifyCode: context.getters.userForm.verifyCode
    })
  },
  // 向用户邮箱发送邮件验证码
  sendEmailVerifyCode: (context) => {
    return axios.post(globalConfig.apiUrl + 'sendemail', {
      email: context.getters.userForm.email
    })
  },
  submitLoginData: (context) => {
    return axios.post(globalConfig.apiUrl + 'login', {
      email: context.getters.userForm.email,
      password: context.getters.userForm.password
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
