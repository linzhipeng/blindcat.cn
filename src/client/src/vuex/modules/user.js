// 用户信息

import globalConfig from '../../config/config.js'
import axios from 'axios'
const state = {
  // 用户填写注册登录表单信息
  userForm: {
    username: '',
    email: '',
    password: '',
    verifyCode: ''
  },
  // 注册登录表单规则
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
  // 当前注册登录选项卡的name
  activeName: 'register',
  // 用户个人信息
  userInfo: '',
  // 用户是否已经登录
  hasLogin: false
}

const getters = {
  userForm: state => state.userForm,
  rules: state => state.rules,
  activeName: state => state.activeName,
  verifyCode: state => state.verifyCode,
  userInfo: state => state.userInfo,
  hasLogin: state => state.hasLogin
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
  // 注册成功后清除数据并跳转到登录表单
  toLogin: (state) => {
    state.userForm.username = ''
    state.userForm.password = ''
    state.userForm.verifyCode = ''
    state.activeName = 'login'
  },
  // 退出登录，清除用户登录数据
  logout: (state) => {
    // 如果state总有用户的email，退出登录前自动帮用户填写email被表单
    if (state.userInfo.account) {
      if (state.userInfo.account.email && state.userInfo.account.email !== '') {
        state.userForm.email = state.userInfo.account.email
      }
    }
    window.localStorage.userInfo = ''
    state.userInfo = ''
    state.activeName = 'login'// 退出登录后用户界面切换到登录表单
    state.hasLogin = false
  },
  // 从localStorage中获取更新用户数据
  updateUserInfo: (state, userInfo) => {
    // 如果找得到用户缓存且缓存不为空
    if (userInfo && userInfo !== '') {
      state.userForm.password = ''// 登录成功后清除密码记录
      state.userInfo = userInfo
      state.hasLogin = true
    } else {
      state.activeName = 'login'// 退出登录后用户界面切换到登录表单
      state.hasLogin = false
    }
  },
  // 更新用户本地资料缓存
  updateUserLocalStorage: (state, data) => {
    var newData = JSON.parse(window.localStorage.userInfo)
    switch (data.name) {
      case 'avatar':
        state.userInfo.avatar = data.value
        newData.avatar = data.value
        window.localStorage.userInfo = JSON.stringify(newData)
        break
      default:
        break
    }
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
  // 提交登录数据
  submitLoginData: (context) => {
    console.log(context.state.topbarData)
    return axios.post(globalConfig.apiUrl + 'login', {
      email: context.getters.userForm.email,
      password: context.getters.userForm.password
    })
  },
  // 从localStorage中获取更新用户数据
  updateUserInfo: (context) => {
    let userInfo = JSON.parse(window.localStorage.userInfo)
    context.commit('updateUserInfo', userInfo)
    context.commit('showUsername', userInfo.username)
  },
  logout: (context) => {
    // 清除用户登录数据
    context.commit('logout')
    // 更新导航条用户名
    context.commit('showUsername')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
