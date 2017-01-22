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
  }],
  screenWidth: '',
  topbarName: 'Topbar',
  topbarHasShow: false
}

// getters
const getters = {
  topbarData: state => state.topbarData,
  screenWidth: state => state.screenWidth,
  topbarName: state => state.topbarName,
  topbarHasShow: state => state.topbarHasShow
}

const mutations = {
  screenWidth (state, width) {
    state.screenWidth = width
    // 屏幕宽度小于550像素时，更换手机导航条组件
    if (width < 550) {
      state.topbarName = 'TopbarMobile'
    } else {
      state.topbarName = 'Topbar'
      state.topbarHasShow = false
    }
  },
  topbarToggle (state) {
    state.topbarHasShow = !state.topbarHasShow
  }
}

// actions
const actions = {
  screenWidth (context, width) {
    context.commit('screenWidth', width.width)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
