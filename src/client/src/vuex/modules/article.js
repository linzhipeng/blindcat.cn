// 文章列表

import axios from 'axios'
const state = {
  // 文章列表
  articleList: '',
  // 新文章
  newArticle: {
    title: '',
    content: '',
    tags: '',
    creativeType: '',
    articleType: ''
  }
}
// getters
const getters = {
  articleList: state => state.articleList,
  newArticle: state => state.newArticle
}
// mutations
const mutations = {
  // 更新文章列表
  updateList (state, listData) {
    state.articleList = listData
  },
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
  // 初始化文章列表
  initArticleList (context) {
    axios
      .get('http://localhost:8081/article')
      .then(function (res) {
        if (res && res.data.state) {
          context.commit('updateList', res.data.data)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  // 提交新文章
  updateNewArticle (context) {
    axios.post('http://localhost:8081/newarticle', {
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
