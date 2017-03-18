// 文章列表

import globalConfig from '../../config/config.js'
import axios from 'axios'
import { Notification } from 'element-ui'
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
  // 清空当前文章缓存
  clearArticleList (state) {
    state.articleList = ''
  },
  // 清除文章详情缓存
  clearArticleDetail (state) {
    state.articleNow = ''
  }
}
// actions
const actions = {
  // 获取文章列表
  getArticleList (context, data) {
    context.commit('clearArticleList')
    // 默认 pageNum 为1
    data.pageNum = (data.pageNum && parseInt(data.pageNum) > 0) ? parseInt(data.pageNum) : 1
    // 默认 tags 为all
    data.tags = (data.tags && data.tags !== '') ? data.tags : 'all'
    data.articleNum = globalConfig.article.articleNum
    axios
      .get(globalConfig.apiUrl + 'article', {
        params: data
      })
      .then(function (res) {
        if (res && res.data.state) {
          context.commit('updateList', res.data.data.listData)
        }
      })
      .catch(function (error) {
        Notification({
          title: '出错了',
          message: error,
          type: 'error'
        })
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
