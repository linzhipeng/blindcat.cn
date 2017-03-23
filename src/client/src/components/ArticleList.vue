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
                <i class="iconfont icon-myshape"></i>{{ item.writer.username }}
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
        userInfo: 'userInfo',
        articleListQuery: 'articleListQuery'
      })
    },
    methods: {
      // searchType：文章列表类型('all', 'tags', 'writer')
      // queryData: 查询数据（按标签查询则输入标签、按作者查询则输入writerId、查询所有文章传空字符串）
      // pageNum: 查询页码
      getArticleList (searchType, queryData, pageNum) {
        let artcleParams = {
          'pageNum': pageNum,
          'queryData': queryData || '',
          'searchType': searchType
        }
        // 提交查询文章列表
        this.$store.dispatch('getArticleList', artcleParams)
        .catch((error) => {
          Notification({
            title: '出错了',
            message: error,
            type: 'error'
          })
        })
      },
      // 根据页码变化进行router切换
      currentChange (currentPage) {
        if (this.$route.name === 'tagsSearch' || this.$route.name === 'tags') {
          this.$router.push({name: 'tagsSearch', params: { pageNum: currentPage }})
        } else if (this.$route.name === 'home' || this.$route.name === 'allArticle') {
          this.$router.push({name: 'allArticle', params: { pageNum: currentPage }})
        } else if (this.$route.name === 'user' || this.$route.name === 'userArticle') {
          this.$router.push({name: 'userArticle', params: { pageNum: currentPage }})
        }
      },
      // 根据router切换更新文章列表数据
      routerChange () {
        let routeName = this.$route.name
        if (routeName === 'user' || routeName === 'userArticle') {
          let pageNum = this.$route.params.pageNum || 1
          this.getArticleList('writer', this.userInfo.userId, pageNum)
        } else if (routeName === 'tags' || routeName === 'tagsSearch') {
          let pageNum = this.$route.params.pageNum || 1
          this.getArticleList('tags', this.$route.params.tags, pageNum)
        } else if (routeName === 'home' || routeName === 'allArticle') {
          let pageNum = this.$route.params.pageNum || 1
          this.getArticleList('all', '', pageNum)
        }
      }
    },
    created () {
      this.routerChange()
    },
    watch: {
      '$route' (to, from) {
        this.routerChange()
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