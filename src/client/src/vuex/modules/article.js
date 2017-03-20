// 文章列表

import globalConfig from '../../config/config.js'
import axios from 'axios'
import { Notification } from 'element-ui'
const md = require('markdown-it')()
const state = {
  // 文章列表
  articleList: '',
  articleNow: '',
  articleListShow: true
}
// getters
const getters = {
  articleList: state => state.articleList,
  articleNow: state => state.articleNow,
  articleListShow: state => state.articleListShow
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
  },
  // 销毁文章列表组件
  destroyArticleList (state, isShow) {
    state.articleListShow = isShow
  }
}
// actions
const actions = {
  // 获取文章列表
  getArticleList (context, data) {
    context.commit('destroyArticleList', false)
    // data = { tags, pageNum, articleNum }
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
      .then((res) => {
        context.commit('destroyArticleList', true)
        if (res && res.data.state) {
          if (res.data.data.listData && res.data.data.listData !== '') {
            let d = new Date()
            res.data.data.listData.forEach(element => {
              ((element) => {
                d.setTime(Date.parse(element.publishTime))
                element.publishTime = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日' + ' ' + d.getHours() + ':' + d.getMinutes()
              })(element)
            })
            context.commit('updateList', res.data.data)
          }
        } else {
          Notification({
            title: '出错了',
            message: res.data.info,
            type: 'error'
          })
        }
      })
      .catch((error) => {
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
          let d = new Date()
          d.setTime(Date.parse(res.data.data.publishTime))
          res.data.data.publishTime = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日' + ' ' + d.getHours() + ':' + d.getMinutes()
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
