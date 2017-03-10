import Vue from 'vue'
import Vuex from 'vuex'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

const App = resolve => require(['./App'], resolve)
const Topbar = resolve => require(['./components/Topbar.vue'], resolve)
const Siderbar = resolve => require(['./components/Siderbar.vue'], resolve)
const ArticleList = resolve => require(['./components/ArticleList.vue'], resolve)
const TagsList = resolve => require(['./components/TagsList.vue'], resolve)
const NewArticle = resolve => require(['./components/NewArticle.vue'], resolve)
const ArticleDetail = resolve => require(['./components/ArticleDetail.vue'], resolve)
const Register = resolve => require(['./components/Register.vue'], resolve)
const UserCenter = resolve => require(['./components/UserCenter.vue'], resolve)

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueSimplemde from 'vue-simplemde' // markdown编辑器

import store from './vuex/store'

// 注册插件
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueSimplemde)
Vue.use(ElementUI)

// 路由
var routes = [{
  path: '/',
  exact: true,
  name: 'home',
  components: {
    Topbar,
    Siderbar,
    ArticleList,
    TagsList
  }
}, {
  path: '/tags',
  name: 'tags',
  components: {
    Topbar,
    Siderbar
  }
}, {
  path: '/newarticle',
  name: 'newarticle',
  components: {
    Topbar,
    Siderbar,
    NewArticle
  }
}, {
  path: '/resources',
  name: 'resources',
  components: {
    Topbar,
    Siderbar
  }
}, {
  path: '/search',
  name: 'search',
  components: {
    Topbar,
    Siderbar
  }
}, {
  path: '/about',
  name: 'about',
  components: {
    Topbar,
    Siderbar
  }
}, {
  path: '/user',
  name: 'user',
  components: {
    Topbar,
    Siderbar,
    Register,
    UserCenter
  }
}, {
  path: '/articleDetail/:id',
  name: 'articleDetail',
  components: {
    Topbar,
    Siderbar,
    ArticleDetail
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
    // 读取本地用户数据缓存
    _this.$store.dispatch('updateUserInfo')
  }
}).$mount('#app')
