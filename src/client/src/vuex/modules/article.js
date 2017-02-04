// 文章列表

import globalConfig from '../../config/config.js'
import axios from 'axios'
const state = {
  // 文章列表
  articleList: ''
}
// getters
const getters = {
  articleList: state => state.articleList
}
// mutations
const mutations = {
  // 更新文章列表
  updateList (state, listData) {
    state.articleList = listData
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
