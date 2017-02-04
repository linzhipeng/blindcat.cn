<!-- 提交新文章 -->

<template>
  <div id="NewArticle">
    <input type="text" placeholder="标题" name="title" :value="newArticle.title" @input="recordNewArticle">
    <markdown-editor :configs="mdConfigs" :value="newArticle.content" @input="recordNewArticleContent" preview-class="markdown-body"></markdown-editor>
    <select name="articleType" :value="newArticle.articleType" @input="recordNewArticle">
      <option value="" disabled>选择文章分类</option>
      <option v-for="option in submission.articleType.options" :value="option.value">{{option.text}}</option>
    </select>
    <select name="creativeType" :value="newArticle.creativeType" @input="recordNewArticle">
      <option value="" disabled>选择原创类型</option>
      <option v-for="option in submission.creativeType.options" :value="option.value">{{option.text}}</option>
    </select>
    <input type="text" placeholder="标签（回车添加一个标签）" name="tags" :value="newArticle.tags" @input="recordNewArticle">
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
        submission: 'submission',
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

  input[type="text"], select {
    display: block;
    width: 90%;
    max-width: 350px;
    margin: 5px 0;
    padding: 8px;
    border: 1px solid #bbb;
    border-radius: 4px;
  }

  select {
    width: 150px;
  }

  option {
    height: 50px;
    line-height: 50px;
  }

  input[type="button"] {
    display: block;
    background-color: #41b883;
    color: #fff;
    width: 100px;
    height: 40px;
    line-height: 40px;
    border: none;
    border-radius: 4px;
    outline: none;
    margin-top: 10px;
  }
</style>