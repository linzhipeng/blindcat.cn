// 文章列表

import globalConfig from '../../config/config.js'
import axios from 'axios'
const md = require('markdown-it')()
const state = {
  // 文章列表
  articleList: '',
  articleNow: ''
}
// getters
const getters = {
  articleList: state => state.articleList,
  articleNow: state => state.articleNow
}
// mutations
const mutations = {
  // 更新文章列表state数据
  updateList (state, listData) {
    state.articleList = listData
  },
  // 更新获取到的文章详情
  updateArticleDetail (state, articleData) {
    articleData.content = md.render(articleData.content)
    state.articleNow = articleData
  },
  // 清除文章详情缓存
  clearArticleDetail (state) {
    state.articleNow = ''
  }
}
// actions
const actions = {
  // 初始化文章列表
  initArticleList (context) {
    axios
      .get(globalConfig.apiUrl + 'article')
      .then(function (res) {
        if (res && res.data.state) {
          context.commit('updateList', res.data.data)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  // 获取指定文章id的文章详情
  getArticleDetail (context, id) {
    axios
      .get(globalConfig.apiUrl + 'articledetail?id=' + id)
      .then(function (res) {
        if (res && res.data.state) {
          context.commit('updateArticleDetail', res.data.data)
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
