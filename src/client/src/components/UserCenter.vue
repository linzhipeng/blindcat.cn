<template>
  <div id="userCenter">
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
    <div class="user_box">
      <h1 class="user_name">{{userInfo.username}}</h1>
      <p><b>邮箱：</b>{{userInfo.account.email}}</p>
      <p><b>签名：</b>{{userInfo.userIntro}}</p>

      <el-button
        :plain="true"
        type="danger"
        size="small"
        @click="logout"
      >退出登录</el-button>
    </div>
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
    -webkit-box-shadow: 0 0 8px 2px #999;
    box-shadow: 0 0 8px 2px #999;
    border-radius: 75px;
    overflow: hidden;
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

  .avatar {
    margin: 10px auto;
  }

  .avatar_clip.vue-image-crop-upload .vicp-wrap {
    max-width: 600px;
    width: 80%;
  }

  .user_box {
    margin-top: 30px;
    padding-left: 15px;
  }

  .user_name {
    display: block;
    width: 100%;
    margin-bottom: 20px;
  }

  .user_box p {
    display: block;
    font-size: 1.3rem;
  }
</style>
