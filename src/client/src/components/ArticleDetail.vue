<!-- 文章详情 -->

<template>
  <div>
    {{$route.params.id}}
    {{articleNow}}
  </div>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  export default {
    name: 'ArticleDetail',
    computed: {
      ...mapGetters({
        articleNow: 'articleNow'
      })
    },
    created: function () {
      this.$store.dispatch('getArticleDetail', this.$route.params.id)
    }
  }
</script>