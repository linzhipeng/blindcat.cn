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
    <input type="text" placeholder="标签（回车添加一个标签）" name="tags" :value="submission.newTag" @input="recordNewArticleTag" @keyup.enter="addTags">
    <div class="tags_box" v-if="newArticle.tags.length && newArticle.tags.length !== 0">
      <p class="tag_title">文章标签：</p>
      <div v-for="(tag, index) in newArticle.tags" class="tag">
        <i class="iconfont icon-close1" @click="removeTag(index)"></i>
        {{ tag }}
      </div>
    </div>
    <input type="button" value="投稿" @click="updateNewArticle">
    <!-- {{submission.newTag}}
    {{newArticle.tags}} -->
  </div>
</template>

<script type="text/javascript">
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { markdownEditor } from 'vue-simplemde'
  import 'github-markdown-css'

  export default {
    name: 'NewArticle',
    components: {
      markdownEditor
    },
    data () {
      return {
        // 配置md编辑器
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
      ...mapMutations([
        'addTags',
        'removeTag'
      ]),
      ...mapActions([
        'updateNewArticle'
      ]),
      // 记录键入的新文章元素
      recordNewArticle (e) {
        this.$store.commit('recordNewArticle', {
          inputName: e.target.name,
          data: e.target.value
        })
      },
      // 记录键入的文章内容
      recordNewArticleContent (e) {
        this.$store.commit('recordNewArticle', {
          inputName: 'content',
          data: e
        })
      },
      // 记录键入的tag
      recordNewArticleTag (e) {
        this.$store.commit('recordNewArticleTag', e.target.value)
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

  .tags_box {
    width: 100%;
    max-width: 300px;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
  }

  .tag_title {
    line-height: 2.2rem;
    font-weight: 700;
    color: #41b883;
    font-size: 1.4rem;
  }

  .tags_box .tag {
    background-color: #fff;
    border: 1px solid #41b883;
    border-radius: 4px;
    font-size: 1.3rem;
    line-height: 1.8rem;
    height: 1.8rem;
    padding: 0.2rem 0.8rem;
    border-radius: 4px;
    color: #41b883;
    flex: 0 0 auto;
    margin-right: 10px;
    text-align: center;
    cursor: pointer;
    position: relative;
  }

  .tags_box .tag i.iconfont {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    line-height: 2.2rem;
    font-size: 2rem;
    opacity: 0;
    color: #ddd;
  }

  .tags_box .tag i.iconfont:hover {
    opacity: 1;
    background-color: rgba(0,0,0,0.8);
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
    cursor: pointer;
  }
</style>