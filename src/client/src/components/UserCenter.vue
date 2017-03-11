<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="updateAvatarUrl"
      name="avatar"
      :headers="getHeaders"
      :show-file-list="false"
      :on-success="handleAvatarScucess"
      :before-upload="beforeAvatarUpload">
      <img :src="apiUrl + userInfo.avatar " class="avatar">
    </el-upload>
    <h1>欢迎你！{{userInfo.username}}</h1>
    <el-button type="primary" @click="logout">退出登录</el-button>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters, mapActions } from 'vuex'
  import globalConfig from '../config/config.js'
  export default {
    name: 'userCenter',
    data () {
      return {
        apiUrl: globalConfig.apiUrl,
        updateAvatarUrl: globalConfig.apiUrl + 'updateAvatar'
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
      handleAvatarScucess (res, file) {
        this.$store.commit('updateUserLocalStorage', {
          name: 'avatar',
          value: file.response.data.url
        })
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style scoped>
  .avatar {
    width: 150px;
    height: 150px;
  }
</style>
