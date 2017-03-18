// 文章列表

import globalConfig from '../../config/config.js'
import axios from 'axios'
import { Notification } from 'element-ui'
const state = {
  // 文章投稿选项
  submission: {
    articleType: {
      options: [
        {text: '资讯', value: '资讯'},
        {text: '分享', value: '分享'},
        {text: '经验', value: '经验'},
        {text: '项目', value: '项目'},
        {text: '无用技能', value: '无用技能'}
      ]
    },
    creativeType: {
      options: [
        {text: '原创', value: '原创'},
        {text: '转载', value: '转载'}
      ]
    }
  },
  // 新文章键入记录
  newArticle: {
    title: '',
    content: '',
    creativeType: '',
    articleType: '',
    tags: []
  },
  isLoading: false
}
// getters
const getters = {
  submission: state => state.submission,
  newArticle: state => state.newArticle,
  isLoading: state => state.isLoading
}
// mutations
const mutations = {
  // 将新tag增加进tag数组
  addTags (state, newTag) {
    if (newTag !== '') {
      state.newArticle.tags.push(newTag)
      newTag = ''
    }
  },
  // 移除tag
  removeTag (state, index) {
    state.newArticle.tags.splice(index, 1)
  },
  // 记录新文章内容
  recordNewArticle (state, message) {
    switch (message.inputName) {
      case 'title':
        state.newArticle.title = message.data
        break
      case 'content':
        state.newArticle.content = message.data
        break
      case 'creativeType':
        state.newArticle.creativeType = message.data
        break
      case 'articleType':
        state.newArticle.articleType = message.data
        break
      default:
        break
    }
  },
  // 标记当前为文章提交loading状态
  isLoading (state) {
    state.isLoading = true
  },
  // 标记当前不是文章提交loading状态
  notLoading (state) {
    state.isLoading = false
  },
  clearArticleState (state) {
    state.newArticle = {
      title: '',
      content: '',
      creativeType: '',
      articleType: '',
      tags: []
    }
  }
}
// actions
const actions = {
  // 提交新文章
  updateNewArticle (context) {
    context.commit('isLoading')
    let instance = axios.create({
      headers: {
        'token': context.getters.userInfo.token,
        'userid': context.getters.userInfo.userId
      }
    })
    instance.post(globalConfig.apiUrl + 'newarticle', {
      title: context.getters.newArticle.title,
      content: context.getters.newArticle.content,
      tags: context.getters.newArticle.tags,
      articleType: context.getters.newArticle.articleType,
      creativeType: context.getters.newArticle.creativeType
    })
    .then(function (res) {
      context.commit('notLoading')
      if (res && res.data) {
        if (res.data.state) {
          Notification({
            title: '成功',
            message: '投稿成功！',
            type: 'success'
          })
        }
      }
    })
    .catch(function (error) {
      context.commit('notLoading')
      if (error.response) {
        if (error.response.status === 403) {
          context.commit('logout')
          Notification({
            title: '出错了',
            message: error.response.data.info,
            type: 'error'
          })
        }
      } else {
        Notification({
          title: '出错了',
          message: error.message,
          type: 'error'
        })
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
