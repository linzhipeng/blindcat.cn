// 文章列表

import globalConfig from '../../config/config.js'
import axios from 'axios'
const md = require('markdown-it')()
const state = {
  // 文章列表
  articleList: '',
  // 文章详情
  articleNow: '',
  // 是否显示文章列表组件
  articleListShow: true,
  // 文章列表查询query
  articleListQuery: {
    pageNum: '',
    searchType: '',
    queryData: ''
  }
}
// getters
const getters = {
  articleList: state => state.articleList,
  articleNow: state => state.articleNow,
  articleListShow: state => state.articleListShow,
  articleListQuery: state => state.articleListQuery
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
  },
  // 更新articleListQuery
  updateArticleListQuery (state, articleListQuery) {
    state.articleListQuery = articleListQuery
  }
}
// actions
const actions = {
  // 获取文章列表
  getArticleList (context, data) { // data = { pageNum, searchType, queryData }
    // 如果查询类型为writer而作者Id格式不符合，则返回错误
    if (!data.queryData.match(/^[0-9a-fA-F]{24}$/) && data.searchType === 'writer') {
      return new Promise((resolve, reject) => {
        reject('作者Id错误')
      })
    }
    // 默认 pageNum 为1
    data.pageNum = (data.pageNum && parseInt(data.pageNum) > 0) ? parseInt(data.pageNum) : 1
    // 默认 searchType 为 ''
    data.searchType = data.searchType ? data.searchType : ''
    // 默认 queryData 为 'all'
    data.queryData = data.queryData ? data.queryData : 'all'
    context.commit('updateArticleListQuery', data)
    // 文章列表查询query
    let queryData = {
      pageNum: data.pageNum,
      articleNum: globalConfig.article.articleNum
    }
    // 文章列表查询 url
    let queryUrl = ''
    switch (data.searchType) {
      case 'writer':
        queryUrl = '/writer'
        queryData.writerId = data.queryData
        break
      case 'tags':
        queryUrl = '/tags'
        queryData.tags = data.queryData
        break
      case 'all':
        break
      default:
        return new Promise((resolve, reject) => {
          reject('文章列表查询参数错误')
        })
    }
    // 销毁文章列表组件
    context.commit('destroyArticleList', false)
    // 清除文章数据缓存
    context.commit('clearArticleList')

    return axios
      .get(globalConfig.apiUrl + 'article' + queryUrl, {
        params: queryData
      })
      .then((res) => {
        context.commit('destroyArticleList', true)
        if (res && res.data.state) {
          if (res.data.data.listData && res.data.data.listData !== '') {
            // 将时间转换成合适的格式
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
          return new Promise((resolve, reject) => {
            reject(res.data.info)
          })
        }
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
