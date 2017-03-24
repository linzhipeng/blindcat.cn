<template>
  <div id="app">
    <router-view name="Siderbar"></router-view>
    <router-view name="Topbar"></router-view>
    <!-- 1列布局居中容器 -->
    <div class="main1">
      <div class="container">
        <router-view name="TagsList"></router-view>
        <router-view name="ArticleList"></router-view>
        <router-view name="Register" v-if="!hasLogin"></router-view>
        <router-view name="About"></router-view>
        <router-view name="NewArticle"></router-view>
        <router-view name="ArticleDetail"></router-view>
        <el-row v-if="hasLogin">
          <el-col :xs="24" :sm="5" :md="5" :lg="5">
            <router-view name="UserCenter"></router-view>
          </el-col>

          <el-col :xs="24" :sm="19" :md="19" :lg="19">
            <router-view name="UserArticleList"></router-view>
          </el-col>
        </el-row>
      </div>
    </div>
    <router-view name="FooterBar"></router-view>

    <!-- 左右2列布局 -->
    <!--<div class="main2">
      <div class="left_box">
        <router-view name="ArticleList"></router-view>
      </div>
      <div class="right_box" v-if="screenWidth > 804">
        <router-view name="TagsList"></router-view>
      </div>
    </div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: mapGetters({
    topbarName: 'topbarName',
    screenWidth: 'screenWidth',
    hasLogin: 'hasLogin'
  })
}
</script>

<style>
  ::-webkit-scrollbar {
      width: 8px;
  }
  
  ::-webkit-scrollbar-track {
      background-color: #eee;
      border-radius: 0;
  }
  
  ::-webkit-scrollbar-thumb {
      background-color: #bbb;
      border-radius: 0;
  }
</style>

<style scoped>
  @import './assets/iconfont/iconfont.css';
  .main1, .main2 {
    margin-top: 2rem;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    flex-wrap: wrap;
    justify-content: center;
  }
  .container {
    max-width: 100rem;
    flex: 1 1 auto;
    overflow: hidden;
  }
  /*宽度小于67rem时候会换行*/
  .left_box {
    max-width: 75rem;
    flex: 1 1 42rem;
    overflow: hidden;
  }

  .right_box {
    margin-left: 2rem;
    flex: 0 0 23rem;
  }
</style>
