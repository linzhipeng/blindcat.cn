<template>
  <div>
    <my-upload
      field="avatar"
      v-model="show"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      :width="250"
      :height="250"
      :url="updateAvatarUrl"
      :headers="getHeaders"
      img-format="png"
      class="avatar_clip"
    ></my-upload>
    <div class="avatar" @click="toggleShow">
      <img :src="apiUrl + userInfo.avatar">
      <i class="el-icon-edit mask"></i>
    </div>
    <h1>欢迎你！{{userInfo.username}}</h1>
    <el-button type="primary" @click="logout">退出登录</el-button>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters, mapActions } from 'vuex'
  import { Notification } from 'element-ui'
  import myUpload from 'vue-image-crop-upload/upload-2.vue'
  import globalConfig from '../config/config.js'
  export default {
    name: 'userCenter',
    components: {
      'my-upload': myUpload
    },
    data () {
      return {
        apiUrl: globalConfig.apiUrl,
        updateAvatarUrl: globalConfig.apiUrl + 'updateAvatar',
        show: false
      }
    },
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      }),
      getHeaders () {
        return {
          'userid': this.userInfo.userId,
          'token': this.userInfo.token
        }
      }
    },
    methods: {
      ...mapActions([
        'logout'
      ]),
      toggleShow () {
        this.show = !this.show
      },
      cropSuccess (imgDataUrl, field) {
        this.imgDataUrl = imgDataUrl
      },
      cropUploadSuccess (jsonData, field) {
        if (jsonData.state) {
          this.$store.commit('updateUserLocalStorage', {
            name: 'avatar',
            value: jsonData.data.url
          })
        } else {
          Notification({
            title: '出错了',
            message: jsonData.info,
            type: 'error'
          })
        }
      },
      cropUploadFail (status, field) {
        if (status === 403) {
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
  .avatar {
    width: 150px;
    height: 150px;
    position: relative;
    cursor: pointer;
  }

  .avatar:hover .mask {
    display: block;
  }

  .avatar .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    line-height: 150px;
    text-align: center;
    font-size: 20px;
    display: none;
  }

  .avatar img{
    width: 100%;
    height: 100%;
  }

  .avatar_clip.vue-image-crop-upload .vicp-wrap {
    max-width: 600px;
    width: 80%;
  }
</style>
