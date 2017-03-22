<!-- 文章列表 -->

<template>
  <transition name="article-list" v-if="articleListShow">
    <div id="ArticleList">
      <ul>
        <li class="one_list" v-for="item in articleList.listData">
          <img class="list_img" src="../assets/blindcat.jpg" alt="">
          <div class="list_text">
            <router-link 
              :to="'/articledetail/' + item._id" 
              class="title"
            >
              {{ item.title }}
            </router-link>
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
      <div class="pagination_block">
        <el-pagination
          layout="prev, pager, next"
          :page-count="articleList.pageCount"
          :current-page="articleList.pageNum"
          class="pagination"
          @current-change="currentChange"
        >
        </el-pagination>
      </div>
  </transition>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import { Notification } from 'element-ui'
  export default {
    name: 'ArticleList',
    computed: {
      ...mapGetters({
        articleList: 'articleList',
        articleListShow: 'articleListShow',
        userInfo: 'userInfo'
      })
    },
    methods: {
      getArticleList (params) {
        // 对象解构赋值
        // ================ params ==================
        // searchType  ——查询类型（tags：按标签查，writer：按作者Id查）（默认tags）
        // pageNum  —— 第几页（默认1）
        // articleNum  —— 每页规定文章数（默认10）
        // tags  ——文章标签（all表示全部文章）
        // writerId ——作者Id，使用作者Id查询文章列表时不得为空
        let {searchType = 'tags', pageNum = 1, articleNum = 10, tags = 'all', writerId = this.userInfo.userId} = params
        // 转为整型、正整数
        pageNum = (parseInt(pageNum) > 0) ? parseInt(pageNum) : 1
        articleNum = (parseInt(articleNum) > 0) ? parseInt(articleNum) : 10
        // 如果查询类型为writer而作者Id格式不符合，则返回错误
        if (!writerId.match(/^[0-9a-fA-F]{24}$/) && searchType === 'writer') {
          Notification({
            title: '出错了',
            message: '作者Id错误',
            type: 'error'
          })
          return false
        }

        let artcleParams = {
          'pageNum': pageNum,
          'articleNum': articleNum,
          'searchType': searchType
        }

        if (searchType === 'writer') {
          artcleParams.writerId = writerId
        } else {
          artcleParams.tags = tags
        }
        this.$store.dispatch('getArticleList', artcleParams).catch((error) => {
          Notification({
            title: '出错了',
            message: error,
            type: 'error'
          })
        })
      },
      currentChange (currentPage) {
        this.getArticleList({
          tags: this.articleList.tags,
          pageNum: currentPage,
          articleNum: this.articleList.articleNum,
          searchType: this.articleList.searchType
        })
      }
    },
    created () {
      let routeName = this.$route.name
      if (routeName === 'user') {
        this.getArticleList({
          'searchType': 'writer',
          'pageNum': this.$route.params.pageNum || 1,
          'writerId': this.userInfo.userId
        })
      } else {
        this.getArticleList({
          'tags': this.$route.params.tags,
          'pageNum': this.$route.params.pageNum || 1
        })
      }
    },
    watch: {
      '$route' (to, from) {
        this.getArticleList({
          'tags': to.params.tags,
          'pageNum': to.params.pageNum || 1
        })
      }
    }
  }
</script>

<!-- 添加 "scoped" 属性使该css样式仅作用于该组件 -->
<style scoped>
  .article-list-enter-active {
    transition: all 0.8s;
  }
  .article-list-enter {
    opacity: 0;
    margin-top: 50px;
  }

  #ArticleList {
    width: 100%;
    padding-bottom: 60px;
  }
  #ArticleList ul {
    -webkit-padding-start: 0;
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

  .pagination_block {
    margin: 40px 0;
  }

  .pagination {
    text-align: center;
  }
</style>