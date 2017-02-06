// 顶部提示组件

const state = {
  tipWord: '',
  isShow: false
}

const getters = {
  tipWord: state => state.tipWord,
  isShow: state => state.isShow
}

const mutations = {
  // 关闭topTip
  closeTip (state) {
    state.isShow = false
  },
  // 打开topTip
  showTip (state, tipWord) {
    state.isShow = true
    state.tipWord = tipWord
  }
}

const actions = {
  // 打开头部提示并在2s后关闭
  toggleTip (context, tipWord) {
    context.commit('showTip', tipWord)
    setTimeout(() => {
      context.commit('closeTip')
    }, 2000)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
