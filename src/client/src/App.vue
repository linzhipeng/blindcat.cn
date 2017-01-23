<template>
  <div id="app">
    <router-view name="Siderbar"></router-view>
    <router-view name="Topbar"></router-view>
    <div class="main">
      <div class="left_box">
        <router-view name="ArticleList"></router-view>
      </div>
      <div class="right_box" v-if="screenWidth > 804">
        <router-view name="TagsList"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: mapGetters({
    topbarName: 'topbarName',
    screenWidth: 'screenWidth'
  })
}
</script>

<style scoped>
  @import './assets/iconfont/iconfont.css';
  .main {
    margin-top: 2rem;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    flex-wrap: wrap;
    justify-content: center;
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