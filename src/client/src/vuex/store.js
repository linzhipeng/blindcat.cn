import Vue from 'vue'
import Vuex from 'vuex'
import topbarData from './modules/topbar'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    topbarData
  },
  strict: debug,
  middlewares: debug ? [] : []
})
