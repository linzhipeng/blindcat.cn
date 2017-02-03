<!-- 提交新文章 -->

<template>
  <div id="NewArticle">
    <input type="text" placeholder="标题" name="title" :value="newArticle.title" @input="recordNewArticle">
    <textarea placeholder="正文" name="content" :value="newArticle.content" @input="recordNewArticle"></textarea>
    <input type="text" placeholder="标签" name="tags" :value="newArticle.tags" @input="recordNewArticle">
    <input type="text" placeholder="创作类型" name="CreativeType" :value="newArticle.CreativeType" @input="recordNewArticle">
    <input type="text" placeholder="文章分类" name="type" :value="newArticle.type" @input="recordNewArticle">
    <input type="button" value="投稿" @click="updateNewArticle">
    <h1>{{newArticle}}</h1>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'NewArticle',
    computed: {
      ...mapGetters({
        newArticle: 'newArticle'
      })
    },
    methods: {
      ...mapActions([
        'updateNewArticle'
      ]),
      recordNewArticle (e) {
        this.$store.commit('recordNewArticle', {
          inputName: e.target.name,
          data: e.target.value
        })
      }
    }
  }
</script>

<style scoped>
  #NewArticle input {
    display: block;
  }
</style>