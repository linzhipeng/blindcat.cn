// topbar
const state = {
  topbarData: [{
    name: '首页',
    url: '',
    routerName: 'home'
  }, {
    name: '分类',
    url: 'tags',
    routerName: 'tags'
  }, {
    name: '归档',
    url: 'archive',
    routerName: 'archive'
  }, {
    name: '资源',
    url: 'resources',
    routerName: 'resources'
  }, {
    name: '搜索',
    url: 'search',
    routerName: 'search'
  }, {
    name: '关于',
    url: 'about',
    routerName: 'about'
  }, {
    name: '登录',
    url: 'login',
    routerName: 'login'
  }]
}

// getters
const getters = {
  topbarData: state => state.topbarData
}

export default {
  state,
  getters
}
