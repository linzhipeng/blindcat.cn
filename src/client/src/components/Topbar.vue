<!-- 顶部导航条 -->

<template>
  <div class="topbar_box">
    <div id="logo_box" :class="topbarMobile ? 'justify_content_space_between' : 'justify_content_center'">
      <a v-if="topbarMobile" @click="siderbarToggle" class="show_list_btn">
        <i class="iconfont icon-icon21"></i>
      </a>
      <img src="../assets/blindcat.jpg" :class="topbarMobile ? 'img_small' : ''">
      <a v-if="topbarMobile" href="#" class="search_btn">
        <i class="iconfont icon-search"></i>
      </a>
    </div>
    <!-- 为根路由导航设置exact属性true -->
    <ul id="topbar" v-if="!topbarMobile">
      <li v-for="topbar_item in topbarData">
        <router-link 
          :to="{name: topbar_item.routerName}" 
          :class="$route.name" 
          :exact="topbar_item.routerName == 'home'? true : false"
        >
          {{ topbar_item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'Topbar',
    computed: {
      ...mapGetters({
        topbarData: 'topbarData',
        screenWidth: 'screenWidth',
        topbarMobile: 'topbarMobile'
      })
    },
    methods: {
      ...mapMutations([
        'siderbarToggle'
      ])
    }
  }
</script>

<!-- 添加 "scoped" 属性使该css样式仅作用于该组件 -->
<style scoped>
  .topbar_box {
    border-bottom: 1px solid #ccc;
  }

  #logo_box{
    width: 100%;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    /*flex-wrap: nowrap;*/
  }

  #logo_box.justify_content_center {
    justify-content: center;
  }

  #logo_box.justify_content_space_between {
    justify-content: space-between;
  }

  .show_list_btn, .search_btn {
    line-height: 50px;
    padding: 0 15px;
    text-decoration: none;
  }

  .show_list_btn i.iconfont, .search_btn i.iconfont {
    font-size: 1.6rem;
  }

  .show_list_btn:hover, .search_btn:hover {
    text-decoration: none;
  }

  #logo_box img{
    width: 150px;
    height: 150px;
    transition: all .7s;
    -webkit-transition: all .7s;
  }

  #logo_box img.img_small{
    width: 50px;
    height: 50px;
  }

  #topbar {
    width: 100%;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    justify-content: center;
  }

  ul {
    -webkit-padding-start: 0;
  }

  #topbar li {
    list-style: none;
    height: 40px;
    width: 80px;
    -webkit-flex: 0 1 1;
    flex: 0 1 1;
    flex-grow : 0;
    flex-shrink : 1;
    flex-basis : 1;
  }

  #topbar li a {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 40px;
    text-align: center;
    color: #333;
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: 0.2rem;
    text-decoration: none;
  }

  #topbar li a.router-link-active {
    color: #41b883;
    font-size: 1.8rem;
    font-weight: 700;
  }

  #topbar li a:hover {
    text-decoration: none;
    color: #41b883;
  }
</style>