<!-- 提交新文章 -->

<template>
  <div id="NewArticle">
    <!-- 标题 -->
    <elInput
      class="input-title"
      :value="newArticle.title"
      @change="recordNewArticle('title', $event)"
      placeholder="标题"
    >
    </elInput>
    <!-- 正文 -->
    <markdown-editor
      :configs="mdConfigs"
      :value="newArticle.content"
      @input="recordNewArticleContent"
      preview-class="markdown-body"
    >
    </markdown-editor>
    <!-- 文章分类 -->
    <el-select
      class="type-select"
      @input="recordNewArticle('articleType', $event)"
      placeholder="选择文章分类"
      :value="newArticle.articleType"
    >
      <el-option
        v-for="option in submission.articleType.options"
        :label="option.text"
        :value="option.value"
      >
      </el-option>
    </el-select>
    <!-- 创作类型 -->
    <el-select
      class="type-select"
      :value="newArticle.creativeType"
      @input="recordNewArticle('creativeType', $event)"
      placeholder="选择创作类型"
    >
      <el-option
        v-for="option in submission.creativeType.options"
        :label="option.text"
        :value="option.value"
      >
      </el-option>
    </el-select>
    <!-- 文章标签 -->
    <el-tag
      class="one-tag"
      type="primary"
      v-for="(tag, index) in newArticle.tags"
      :closable="true"
      @close="removeTag(index)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      class="input-tag"
      v-if="inputVisible"
      v-model="newTag"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="addTags"
      @blur="addTags"
      placeholder="输入标签，按回车添加"
    >
    </el-input>
    <el-button
      v-if="!inputVisible"
      size="small"
      @click="showInput"
    >+ 添加标签</el-button>
    <!-- 投稿按钮 -->
    <el-button
      class="submit_btn"
      type="primary"
      :loading="true"
      v-if="isLoading"
    >正在投稿</el-button>
    <el-button
      v-else
      class="submit_btn"
      @click="updateNewArticle"
      type="primary"
      size="large"
    >投稿<i class="el-icon-upload el-icon--right"></i></el-button>
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
        },
        inputVisible: false,
        newTag: ''
      }
    },
    computed: {
      ...mapGetters({
        submission: 'submission',
        newArticle: 'newArticle',
        isLoading: 'isLoading'
      })
    },
    methods: {
      ...mapMutations([
        'removeTag'
      ]),
      ...mapActions([
        'updateNewArticle'
      ]),
      // 记录键入的新文章元素
      recordNewArticle (name, value) {
        this.$store.commit('recordNewArticle', {
          inputName: name,
          data: value
        })
      },
      // 记录键入的正文内容
      recordNewArticleContent (e) {
        this.$store.commit('recordNewArticle', {
          inputName: 'content',
          data: e
        })
      },
      // 记录键入的tag
      recordNewArticleTag (e) {
        this.$store.commit('recordNewArticleTag', e.target.value)
      },
      showInput () {
        this.inputVisible = true
      },
      addTags () {
        this.inputVisible = false
        this.$store.commit('addTags', this.newTag)
        this.newTag = ''
      }
    }
  }
</script>

<style scoped>
  .input-title {
    display: block;
    margin-bottom: 10px;
    width: 90%;
    max-width: 370px;
  }

  .type-select {
    display: block;
    margin-bottom: 10px;
    width: 90%;
    max-width: 200px;
  }

  .one-tag {
    margin-right: 10px;
  }

  .input-tag {
      display: inline-block;
      margin-bottom: 10px;
      width: 70%;
      max-width: 170px;
  }

  .submit_btn {
    display: block;
    margin-top: 20px;
    margin-left: 0;
  }
</style>