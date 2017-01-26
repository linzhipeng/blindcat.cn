// 文章列表

import axios from 'axios'
const state = {
  articleList: ''
}
// getters
const getters = {
  articleList: state => state.articleList
}
// mutations
const mutations = {
  updateList (state, listData) {
    state.articleList = listData
  }
}
// actions
const actions = {
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
