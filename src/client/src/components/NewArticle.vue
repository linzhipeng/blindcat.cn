<!-- 提交新文章 -->

<template>
  <div id="NewArticle">
    <markdown-editor :configs="mdConfigs" :value="newArticle.content" @input="recordNewArticleContent" preview-class="markdown-body"></markdown-editor>
    <input type="text" placeholder="标题" name="title" :value="newArticle.title" @input="recordNewArticle">
    <!-- <textarea placeholder="正文" name="content" :value="newArticle.content" @input="recordNewArticle"></textarea> -->
    <input type="text" placeholder="标签" name="tags" :value="newArticle.tags" @input="recordNewArticle">
    <input type="text" placeholder="创作类型" name="creativeType" :value="newArticle.creativeType" @input="recordNewArticle">
    <input type="text" placeholder="文章分类" name="articleType" :value="newArticle.articleType" @input="recordNewArticle">
    <input type="button" value="投稿" @click="updateNewArticle">
  </div>
</template>

<script type="text/javascript">
  import { mapGetters, mapActions } from 'vuex'
  import { markdownEditor } from 'vue-simplemde'
  import 'github-markdown-css'

  export default {
    name: 'NewArticle',
    components: {
      markdownEditor
    },
    data () {
      return {
        mdConfigs: {
          spellChecker: false, // 禁用拼写检查
          // initialValue: 'hellow', // 设置初始值
          renderingConfig: {
            codeSyntaxHighlighting: true, // 开启代码高亮
            highlightingTheme: 'atom-one-light' // 自定义代码高亮主题，可选列表(https://github.com/isagalaev/highlight.js/tree/master/src/styles)
          },
          toolbar: ['bold', 'italic', 'heading', '|', 'code', 'unordered-list', 'ordered-list', 'link', 'image', 'table', 'quote', '|', 'preview', 'side-by-side', 'fullscreen']
        }
      }
    },
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
      },
      recordNewArticleContent (e) {
        this.$store.commit('recordNewArticle', {
          inputName: 'content',
          data: e
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