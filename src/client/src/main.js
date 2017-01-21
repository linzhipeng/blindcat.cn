import Vue from 'vue'
import Vuex from 'vuex'

import App from './App'
import Topbar from './components/Topbar.vue'
import ArticleList from './components/ArticleList.vue'
import TagsList from './components/TagsList.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import store from './vuex/store'

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
    Topbar,
    ArticleList,
    TagsList
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
}, {
  path: '/login',
  name: 'login',
  components: {
    Topbar
  }
}]

var router = new VueRouter({
  routes,
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
}).$mount('#app')
