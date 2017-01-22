<template>
  <div id="TagsList">
    <div class="hot_tags">热门标签</div>
    <div class="tags_div">
      <a href="#">Vue</a>
      <a href="#">前端</a>
      <a href="#">框架</a>
      <a href="#">node</a>
      <a href="#">JavaScript</a>
      <a href="#">数据结构</a>
      <a href="#">React</a>
      <a href="#">Angular</a>
      <a href="#">开源</a>
      <a href="#">webpack</a>
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
    padding-top: 2rem;
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
  }

  .tags_div a{
    text-decoration: none;
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid #41b883;
    color: #41b883;
    font-size: 1.3rem;
    line-height: 1.8rem;
    border-radius: 4px;
    padding: 0.2rem 0.8rem;
    margin: 1rem 0.5rem 0 0.5rem;
  }

  .tags_div a:hover {
    text-decoration: none;
    background-color: #41b883;
    color: #fff;
  }
</style>