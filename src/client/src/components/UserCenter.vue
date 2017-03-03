<template>
  <div>
    <h1>欢迎你！{{userInfo.username}}</h1>
    <el-button type="primary" @click="logout">退出登录</el-button>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'userCenter',
    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      })
    },
    methods: {
      ...mapActions([
        'logout'
      ])
    }
  }
</script>
