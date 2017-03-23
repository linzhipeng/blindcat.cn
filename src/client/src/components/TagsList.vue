<!-- 热门标签 -->

<template>
  <div id="TagsList">
    <div class="tags_div">
      <router-link to="/tags/散文/1">散文</router-link>
      <router-link to="/tags/css/1">css</router-link>
      <router-link to="/tags/测试/1">测试</router-link>
      <router-link to="/tags/Vue/1">Vue</router-link>
      <router-link to="/tags/前端/1">前端</router-link>
      <router-link to="/tags/框架/1">框架</router-link>
      <router-link to="/tags/node/1">node</router-link>
      <router-link to="/tags/JavaScript/1">JavaScript</router-link>
      <router-link to="/tags/数据结构/1">数据结构</router-link>
      <router-link to="/tags/React/1">React</router-link>
      <router-link to="/tags/Angular/1">Angular</router-link>
      <router-link to="/tags/开源/1">开源</router-link>
      <router-link to="/tags/webpack/1">webpack</router-link>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'TagsList'
  }
</script>

<style scoped>
  #TagsList {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    width: 100%;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: center;
  }

  .hot_tags {
    flex: 0 0 100%;
    text-align: center;
    background-color: #41b883;
    color: #fff;
    font-size: 2.1rem;
    line-height: 3.5rem;
    border-radius: 4px;
  }

  .tags_div {
    flex: 0 0 100%;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    align-items: flex-start;
    flex-wrap: wrap;
    padding-top: 1rem;
    justify-content: center;
  }

  .tags_div a{
    text-decoration: none;
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid #41b883;
    color: #41b883;
    font-size: 1.3rem;
    line-height: 2.2rem;
    border-radius: 4px;
    padding: 0.1rem 1.2rem;
    margin: 1rem 0.5rem 0 0.5rem;
  }

  .tags_div a:hover {
    text-decoration: none;
    background-color: #41b883;
    color: #fff;
  }
</style>