import Vue from 'vue'
import Vuex from 'vuex'
import topbarData from './modules/topbar'
import article from './modules/article'
import newArticle from './modules/newArticle'
import topTip from './modules/topTip'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    topbarData,
    article,
    newArticle,
    topTip
  },
  strict: debug,
  middlewares: debug ? [] : []
})
