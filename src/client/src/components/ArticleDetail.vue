<!-- 文章详情 -->

<template>
  <div>
    <h1 class="article-title">{{articleNow.title}}</h1>
    <div class="markdown-body" v-html="articleNow.content"></div>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import 'github-markdown-css'
  export default {
    name: 'ArticleDetail',
    computed: {
      ...mapGetters({
        articleNow: 'articleNow'
      })
    },
    created: function () {
      // 清除文章详情缓存
      this.$store.commit('clearArticleDetail')
      // 获取指定文章id的文章详情
      this.$store.dispatch('getArticleDetail', this.$route.params.id)
    }
  }
</script>

<style scoped>
  .article-title {
    font-size: 2.8rem;
    display: block;
    padding: 15px 5px;
    border-bottom: 1px solid #ddd;
  }
</style>