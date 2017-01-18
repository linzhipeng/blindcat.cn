import Vue from 'vue'
import Vuex from 'Vuex'

import App from './App'
import Topbar from './components/Topbar.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// 注册插件
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)

// 路由
var routes = [{
  path: '/',
  exact: true,
  name: 'home',
  components: {
    Topbar
  }
}, {
  path: '/tags',
  name: 'tags',
  components: {
    Topbar
  }
}, {
  path: '/archive',
  name: 'archive',
  components: {
    Topbar
  }
}, {
  path: '/resources',
  name: 'resources',
  components: {
    Topbar
  }
}, {
  path: '/search',
  name: 'search',
  components: {
    Topbar
  }
}, {
  path: '/about',
  name: 'about',
  components: {
    Topbar
  }
}]

var router = new VueRouter({
  routes,
  mode: 'history'
})

// 全局Vuex
const store = new Vuex.Store({
  strict: true,
  state: {
    // 导航条数据
    topbar_data: [{
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
    }]
  },
  mutations: {
    addCount (state) {
      state.count++
    }
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
