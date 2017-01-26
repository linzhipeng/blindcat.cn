import Vue from 'vue'
import Vuex from 'vuex'
import topbarData from './modules/topbar'
import articleList from './modules/articleList'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    topbarData,
    articleList
  },
  strict: debug,
  middlewares: debug ? [] : []
})
