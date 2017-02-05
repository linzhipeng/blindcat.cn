// 顶部提示组件

const state = {
  tipWord: '',
  isShow: true
}

const getters = {
  tipWord: state => state.tipWord,
  isShow: state => state.isShow
}

const mutations = {
  closeTip (state) {
    state.isShow = false
  },
  showTip (state, tipWord) {
    state.isShow = true
    state.tipWord = tipWord
    setTimeout(() => {
      console.log(123)
    }, 1500)
  }
}

export default {
  state,
  getters,
  mutations
}
