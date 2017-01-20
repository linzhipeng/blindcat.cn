<i class="icon iconfont icon-close"></i>
<template>
  <div id="ArticleList">
    <ul>
      <li class="one_list">
        <img class="list_img" src="../assets/blindcat.jpg" alt="">
        <div class="list_text">
          <a class="title" href="#">【原创】这些年，前端开发已然今非昔比 | 百码山庄</a>
          <div class="tip">
            <div class="tip_btn">
              <i class="iconfont icon-time"></i>2017-1-20
            </div>
            <div class="tip_btn">
              <i class="iconfont icon-myshape"></i>瞎猫
            </div>
            <div class="tip_btn">
              <i class="iconfont icon-information"></i>23
            </div>
            <div class="tip_btn">
              <i class="iconfont icon-collect"></i>34
            </div>
          </div>
          <p class="context">
            多年前，有知名企业前端前辈如是说：前端是做什么的？在一个网页上你看到的就是前端工程师做的。也有人说：前端是设计师在UED最亲密的合作伙伴。很显然，这些概念放之今日都显得太片面。 诚然，让时光倒流几年，回到div+css刚刚统治网页设计前端领...
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'ArticleList'
  }
</script>

<!-- 添加 "scoped" 属性使该css样式仅作用于该组件 -->
<style scoped>
  @import '../assets/iconfont/iconfont.css';
  #ArticleList {
    width: 100%;
  }

  .one_list {
    padding: 1rem 1rem;
    border-bottom: 1px solid #ccc;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: center;
  }
  /*列表左图*/
  .list_img {
    height: 11rem;
    flex: 0 1 14rem;
    margin: 0 2rem;
  }
  /*列表右板块*/
  .list_text {
    width: 43rem;
    max-width: 110rem;
    flex: 1 1 auto;
  }
  /*文章标题*/
  .title {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3rem;
    color: #333;
    text-decoration: none;
  }

  .title:hover {
    text-decoration: none;
    color: #41b883;
  }
  /*文章tip*/
  .tip {
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .tip_btn {
    font-size: 1.4rem;
    line-height: 2.8rem;
    color: #777;
    margin-right: 1.5rem;
  }

  .tip_btn i{
    margin-right: 0.5rem;
  }
  /*文章内容*/
  .context {
    font-size: 1.5rem;
    line-height: 2rem;
    color: #333;
  }
</style>