// 文章列表

import globalConfig from '../../config/config.js'
import axios from 'axios'
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
  updateArticleDetail (state, articleData) {
    state.articleNow = articleData
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
