<!--页脚-->

<template>
  <div class="footer_main">
    <div class="box">{{beian}}</div>
    <div class="box">Power By <a href="http://blindcat.cn/about">瞎猫</a></div>
  </div>
</template>

<script type="text/javascript">
  import globalConfig from '../config/config.js'
  export default {
    name: 'FooterBar',
    data () {
      return {
        beian: globalConfig.beian
      }
    }
  }
</script>

<style scoped>
  .footer_main {
    width: 100%;
    display: block;
    margin-top: 40px;
    border-top: 1px solid #ddd;
    padding: 20px 0;
  }

  .footer_main .box {
    width: 100%;
    text-align: center;
    height: 20px;
    line-height: 20px;
    font-size: 1.3rem;
    color: #666;
  }

  .footer_main .box a {
    color: #41b883;
    text-decoration: none;
    font-size: 1.4rem;
  }
</style>