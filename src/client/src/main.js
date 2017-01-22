import Vue from 'vue'
import Vuex from 'vuex'

import App from './App'
import Topbar from './components/Topbar.vue'
import TopbarMobile from './components/TopbarMobile.vue'
import Siderbar from './components/Siderbar.vue'
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
    TopbarMobile,
    Siderbar,
    ArticleList,
    TagsList
  }
}, {
  path: '/tags',
  name: 'tags',
  components: {
    Topbar,
    TopbarMobile,
    Siderbar
  }
}, {
  path: '/archive',
  name: 'archive',
  components: {
    Topbar,
    TopbarMobile,
    Siderbar
  }
}, {
  path: '/resources',
  name: 'resources',
  components: {
    Topbar,
    TopbarMobile,
    Siderbar
  }
}, {
  path: '/search',
  name: 'search',
  components: {
    Topbar,
    TopbarMobile,
    Siderbar
  }
}, {
  path: '/about',
  name: 'about',
  components: {
    Topbar,
    TopbarMobile,
    Siderbar
  }
}, {
  path: '/login',
  name: 'login',
  components: {
    Topbar,
    TopbarMobile,
    Siderbar
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
  },
  mounted: function () {
    let _this = this
    let getWidth = () => {
      _this.$store.dispatch('screenWidth', {
        width: document.body.clientWidth
      })
    }
    getWidth()
    // 组件装载完毕后绑定事件处理函数到resize事件
    window.addEventListener('resize', function () {
      getWidth()
    }, true)
  }
}).$mount('#app')
