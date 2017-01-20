<template>
  <div>
    <div id="logo_box">
      <img src="../assets/blindcat.jpg">
    </div>
    <!-- 为根路由导航设置exact属性true -->
    <ul id="topbar">
      <li v-for="topbar_item in topbarData">
        <router-link 
          :to="{name: topbar_item.routerName}" 
          :class="$route.name" 
          :exact="topbar_item.routerName == 'home'? true : false"
        >
          {{ topbar_item.name }}
        </router-link>
      </li>
      <div class="clear"></div>
    </ul>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  export default {
    name: 'Topbar',
    computed: mapGetters({
      topbarData: 'topbarData'
    })
  }
</script>

<!-- 添加 "scoped" 属性使该css样式仅作用于该组件 -->
<style scoped>
  .clear {
    clear: both;
  }

  #logo_box{
    width: 100%;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    /*flex-wrap: nowrap;*/
    justify-content: center;
  }

  #logo_box img{
    width: 150px;
    height: 150px;
  }

  #topbar {
    width: 100%;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    justify-content: center;

    border-bottom: 1px solid #ccc;
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