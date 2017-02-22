// 用户注册登录信息

import globalConfig from '../../config/config.js'
import axios from 'axios'
import { Notification } from 'element-ui'
const state = {
  userForm: {
    username: '',
    email: '',
    password: ''
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
    ]
  },
  activeName: 'register'
}

const getters = {
  userForm: state => state.userForm,
  rules: state => state.rules,
  activeName: state => state.activeName
}

const mutations = {
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
      default:
        break
    }
  }
}

const actions = {
  submitRegisterData: (context) => {
    axios.post(globalConfig.apiUrl + 'register', {
      username: context.getters.userForm.username,
      email: context.getters.userForm.email,
      password: context.getters.userForm.password
    })
    .then(function (res) {
      context.commit('notLoading')
      if (res && res.data) {
        if (res.data.state) {
          Notification({
            title: '成功',
            message: '注册成功！',
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
    .catch(function (error) {
      console.log(error)
    })
  },
  submitLoginData: (context) => {
    Notification({
      title: '成功',
      message: '登录成功！',
      type: 'success'
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
