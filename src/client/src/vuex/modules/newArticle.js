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
  // 新文章键入记录
  newArticle: {
    title: '',
    content: '',
    creativeType: '',
    articleType: '',
    tags: []
  },
  isLoading: false
}
// getters
const getters = {
  submission: state => state.submission,
  newArticle: state => state.newArticle,
  isLoading: state => state.isLoading
}
// mutations
const mutations = {
  // 将新tag增加进tag数组
  addTags (state, newTag) {
    if (newTag !== '') {
      state.newArticle.tags.push(newTag)
      newTag = ''
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
  // 标记当前为文章提交loading状态
  isLoading (state) {
    state.isLoading = true
  },
  // 标记当前不是文章提交loading状态
  notLoading (state) {
    state.isLoading = false
  },
  clearArticleState (state) {
    state.newArticle = {
      title: '',
      content: '',
      creativeType: '',
      articleType: '',
      tags: []
    }
  }
}
// actions
const actions = {
  // 提交新文章
  updateNewArticle (context) {
    let {title, content, tags, articleType, creativeType} = context.getters.newArticle
    let errMsg = ''

    context.commit('isLoading')
    if (!title || title === '') {
      errMsg = '文章标题不能为空！'
    } else if (!content || content === '') {
      errMsg = '文章正文不能为空！'
    } else if (!articleType || articleType === '') {
      errMsg = '文章分类不能为空！'
    } else if (!creativeType || creativeType === '') {
      errMsg = '创作类型不能为空！'
    }

    if (errMsg !== '') {
      return new Promise((resolve, reject) => {
        reject(errMsg)
      })
    }

    let instance = axios.create({
      headers: {
        'token': context.getters.userInfo.token || '',
        'userid': context.getters.userInfo.userId || ''
      }
    })
    return instance.post(globalConfig.apiUrl + 'newarticle', {
      title: title,
      content: content,
      tags: tags,
      articleType: articleType,
      creativeType: creativeType
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
