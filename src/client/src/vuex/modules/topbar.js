// 导航条

const state = {
  // 导航条菜单数据
  topbarData: {
    home: {
      name: '首页',
      url: '',
      routerName: 'home'
    },
    tags: {
      name: '标签',
      url: 'tags',
      routerName: 'tags'
    },
    newarticle: {
      name: '投稿',
      url: 'newarticle',
      routerName: 'newarticle'
    },
    about: {
      name: '关于',
      url: 'about',
      routerName: 'about'
    },
    user: {
      name: '用户',
      url: 'user',
      routerName: 'user'
    }
  },
  // 当前屏幕宽度
  screenWidth: '',
  // 当前使用的导航条类型【Topbar/TopbarMobile】
  topbarMobile: false,
  // 是否显示siderbar
  siderbarShow: false
}

// getters
const getters = {
  topbarData: state => state.topbarData,
  screenWidth: state => state.screenWidth,
  topbarMobile: state => state.topbarMobile,
  siderbarShow: state => state.siderbarShow
}

// mutations
const mutations = {
  screenWidth (state, width) {
    // 根据屏幕宽度，更新state.screenWidth、切换导航条类型、选择是否显示siderbar
    state.screenWidth = width
    if (width < 550) { // 屏幕宽度小于550像素时，切换导航条类型
      state.topbarMobile = true
    } else {
      state.topbarMobile = false
      state.siderbarShow = false // 宽度大于550像素时自动关闭siderbar
    }
  },
  siderbarToggle (state) {
    // 切换siderbar状态
    state.siderbarShow = !state.siderbarShow
  },
  siderbarClose (state) {
    // 关闭siderbar
    state.siderbarShow = false
  },
  showUsername: (state, username) => {
    // 如果找得到用户缓存且缓存不为空
    if (username && username !== '') {
      state.topbarData.user.name = username
    } else {
      state.topbarData.user.name = '用户'
    }
  }
}

// actions
const actions = {
  // 计算屏幕宽度
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
