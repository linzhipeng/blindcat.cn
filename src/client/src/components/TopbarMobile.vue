<template>
  <div class="topbar_box">
    <div id="logo_box">
      <a @click="siderbarToggle" class="show_list_btn">
        <i class="iconfont icon-icon21"></i>
      </a>
      <img src="../assets/blindcat.jpg">
      <a href="#" class="search_btn">
        <i class="iconfont icon-search"></i>
      </a>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    name: 'TopbarMobile',
    computed: {
      ...mapGetters({
        topbarData: 'topbarData',
        screenWidth: 'screenWidth',
        siderbarShow: 'siderbarShow'
      })
    },
    methods: {
      ...mapMutations([
        'siderbarToggle'
      ])
    }
  }
</script>

<!-- 添加 "scoped" 属性使该css样式仅作用于该组件 -->
<style scoped>
  .topbar_box {
    border-bottom: 1px solid #ccc;
  }

  #logo_box{
    width: 100%;
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    /*flex-wrap: nowrap;*/
    justify-content: space-between;
  }

  .show_list_btn, .search_btn {
    line-height: 50px;
    padding: 0 15px;
    text-decoration: none;
  }

  .show_list_btn i.iconfont, .search_btn i.iconfont {
    font-size: 1.6rem;
  }

  .show_list_btn:hover, .search_btn:hover {
    text-decoration: none;
  }

  #logo_box img{
    width: 50px;
    height: 50px;
  }
</style>