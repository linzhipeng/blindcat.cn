<!-- 提交新文章 -->

<template>
  <div id="NewArticle">
    <!--根据topbar状态（即屏幕大小）改变dialog大小-->
    <el-dialog title="上传图片" v-model="dialogTableVisible" :size="topbarMobile ? 'large' : 'small'">
      <!--图片上传组件-->
      <el-upload
        class="upload-demo"
        type="drag"
        name="articleImage"
        :show-file-list="false"
        :action="updateImagesUrl"
        :headers="getHeaders"
        :before-upload="beforeAvatarUpload"
        :on-success="hasUploadImage"
        :on-error="uploadErr"
        mutiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2mb</div>
      </el-upload>
    </el-dialog>
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
  import { Notification } from 'element-ui'
  import { markdownEditor } from 'vue-simplemde'
  import 'github-markdown-css'
  import globalConfig from '../config/config.js'

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
          toolbar: ['bold', 'italic', 'heading', '|', 'code', 'unordered-list', 'ordered-list', 'link', {
            // 自定义图片上传事件
            name: 'image',
            action: (editor) => {
              // 调取显示图片上传组件
              this.dialogTableVisible = true
              // 存储编辑器示例，后面会用来像编辑区添加图片地址
              this.editor = editor
            },
            className: 'fa fa-image',
            title: '上传图片'
          }, 'table', 'quote', '|', 'preview', 'side-by-side', 'fullscreen']
        },
        inputVisible: false,
        newTag: '',
        dialogTableVisible: false, // 是否显示上传框
        editor: '', // 存储编辑器实例
        updateImagesUrl: globalConfig.apiUrl + 'updateArticleImage'
      }
    },
    computed: {
      ...mapGetters({
        submission: 'submission',
        newArticle: 'newArticle',
        isLoading: 'isLoading',
        topbarMobile: 'topbarMobile',
        userInfo: 'userInfo'
      }),
      // 获取生成headers
      getHeaders () {
        return {
          'userid': this.userInfo.userId,
          'token': this.userInfo.token
        }
      }
    },
    methods: {
      ...mapMutations([
        'removeTag'
      ]),
      ...mapActions([
        'logout'
      ]),
      // 提交文章到服务器进行投稿
      updateNewArticle () {
        this.$store.dispatch('updateNewArticle')
          .then(res => {
            this.$store.commit('notLoading')
            if (res && res.data) {
              if (res.data.state) {
                Notification({
                  title: '成功',
                  message: '投稿成功！',
                  type: 'success'
                })
              } else {
                Notification({
                  title: '出错了',
                  message: res.data.info,
                  type: 'error'
                })
              }
            }
          })
          .catch(error => {
            this.$store.commit('notLoading')
            if (error.response) {
              if (error.response.status === 403) {
                this.$store.commit('logout')
                Notification({
                  title: '出错了',
                  message: error.response.data.info,
                  type: 'error'
                })
              }
            } else {
              Notification({
                title: '出错了',
                message: error,
                type: 'error'
              })
            }
          })
      },
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
      // 显示tags输入框
      showInput () {
        this.inputVisible = true
      },
      // 添加tags
      addTags () {
        this.inputVisible = false
        this.$store.commit('addTags', this.newTag)
        this.newTag = ''
      },
      // 文章图片上传前进行格式、大小验证
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      // 文章图片上传成功
      hasUploadImage (res, file, fileList) {
        if (res.state) {
          this.editor.options.insertTexts.image = ['![](', globalConfig.apiUrl + res.data.url + ')']
          this.editor.drawImage()
          this.dialogTableVisible = false
        } else {
          Notification({
            title: '发生错误',
            message: res.info,
            type: 'error'
          })
        }
      },
      // 文章图片上传错误
      uploadErr (err, file, fileList) {
        if (err.status === 403) {
          Notification({
            title: '出错了',
            message: '请重新登录！',
            type: 'error'
          })
        }
        this.logout()
      }
    }
  }
</script>

<style>
  .upload-demo {
    max-width: 360px;
    width: 80%;
    margin: 10px auto;
  }
  
  .upload-demo .el-dragger  {
    width: 100%;
  }

  .markdown-editor .CodeMirror, .markdown-editor .CodeMirror-scroll {
    max-height: 450px;
  }
</style>

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