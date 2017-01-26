<template>
  <div id="ArticleList">
    <ul>
      <li class="one_list" v-for="item in articleList">
        <img class="list_img" src="../assets/blindcat.jpg" alt="">
        <div class="list_text">
          <a class="title" href="#">{{ item.title }}</a>
          <div class="tip">
            <div class="tip_btn">
              <i class="iconfont icon-time"></i>{{ item.publishTime }}
            </div>
            <div class="tip_btn">
              <i class="iconfont icon-myshape"></i>瞎猫
            </div>
            <div class="tip_btn">
              <i class="iconfont icon-information"></i>23
            </div>
            <div class="tip_btn">
              <i class="iconfont icon-collect"></i>{{ item.aticleCollect }}
            </div>
          </div>
          <p class="context">
            {{ item.abstract }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'ArticleList',
    computed: {
      ...mapGetters({
        articleList: 'articleList'
      })
    },
    methods: {
      ...mapActions([
        'initArticleList'
      ])
    },
    created () {
      this.initArticleList()
    }
  }
</script>

<!-- 添加 "scoped" 属性使该css样式仅作用于该组件 -->
<style scoped>
  #ArticleList {
    width: 100%;
  }

  .one_list {
    padding: 2rem 1rem;
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
  /*列表左图 11rem * 14rem */
  .list_img {
    height: 11rem;
    flex: 0 1 14rem;
    border: 1px solid #eee;
    margin: 0 2rem;
    overflow: hidden;
  }
  /*列表右板块*/
  .list_text {
    max-width: 110rem;
    flex: 1 1 40rem;
  }
  /*文章标题*/
  .title {
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 3rem;
    color: #555;
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
    font-size: 1.2rem;
    line-height: 2.8rem;
    color: #999;
    margin-right: 1.5rem;
  }

  .tip_btn i{
    margin-right: 0.5rem;
  }
  /*文章内容*/
  .context {
    font-size: 1.3rem;
    line-height: 2rem;
    color: #999;
  }
</style>