// 用户注册登录信息

import globalConfig from '../../config/config.js'
import axios from 'axios'
import { Notification } from 'element-ui'
const state = {
  registerForm: {
    username: '',
    email: ''
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
  }
}

const getters = {
  registerForm: state => state.registerForm,
  rules: state => state.rules
}

const mutations = {
  recordRegisterData: (state, data) => {
    switch (data.name) {
      case 'username':
        state.registerForm.username = data.value
        break
      case 'email':
        state.registerForm.email = data.value
        break
      case 'password':
        state.registerForm.password = data.value
        break
      default:
        break
    }
  }
}

const actions = {
  submitRegisterData: (context) => {
    axios.post(globalConfig.apiUrl + 'register', {
      username: context.getters.registerForm.username,
      email: context.getters.registerForm.email,
      password: context.getters.registerForm.password
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
