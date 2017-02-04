// 文章列表

import axios from 'axios'
const state = {
  // 投稿选项
  submission: {
    articleType: {
      options: [
        {text: '资讯', value: '资讯'},
        {text: '分享', value: '分享'},
        {text: '经验', value: '经验'},
        {text: '项目', value: '项目'},
        {text: '资讯', value: '资讯'},
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
  // 新文章
  newArticle: {
    title: '',
    content: '',
    creativeType: '',
    articleType: '',
    tags: []
  }
}
// getters
const getters = {
  submission: state => state.submission,
  newArticle: state => state.newArticle
}
// mutations
const mutations = {
  // 添加新文章
  recordNewArticle (state, message) {
    switch (message.inputName) {
      case 'title':
        state.newArticle.title = message.data
        break
      case 'content':
        state.newArticle.content = message.data
        break
      case 'tags':
        state.newArticle.tags = message.data
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
  }
}
// actions
const actions = {
  // 提交新文章
  updateNewArticle (context) {
    axios.post('http://api.blindcat.cn/newarticle', {
      title: context.getters.newArticle.title,
      content: context.getters.newArticle.content,
      tags: context.getters.newArticle.tags,
      articleType: context.getters.newArticle.articleType,
      creativeType: context.getters.newArticle.creativeType
    })
    .then(function (res) {
      if (res && res.data.state) {
        console.log('投稿成功')
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
