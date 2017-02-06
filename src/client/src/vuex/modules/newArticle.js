// 文章列表

import globalConfig from '../../config/config.js'
import axios from 'axios'
const state = {
  // 文章投稿选项
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
    },
    newTag: ''
  },
  // 新文章键入记录
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
  // 将新tag增加进tag数组
  addTags (state) {
    if (state.submission.newTag !== '') {
      state.newArticle.tags.push(state.submission.newTag)
      state.submission.newTag = ''
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
  // 暂存键入的tag
  recordNewArticleTag (state, newTag) {
    state.submission.newTag = newTag
  }
}
// actions
const actions = {
  // 提交新文章
  updateNewArticle (context) {
    axios.post(globalConfig.apiUrl + 'newarticle', {
      title: context.getters.newArticle.title,
      content: context.getters.newArticle.content,
      tags: context.getters.newArticle.tags,
      articleType: context.getters.newArticle.articleType,
      creativeType: context.getters.newArticle.creativeType
    })
    .then(function (res) {
      if (res && res.data) {
        if (res.data.state) {
          context.dispatch('toggleTip', '投稿成功')
        } else {
          context.dispatch('toggleTip', res.data.info)
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
