<!-- 顶部提示组件 -->

<template>
  <div id="TopTip" v-if="isShow">
    <div class="word">{{ tipWord }}</div>
    <div class="close_btn" @click="closeTip">
      <i class="iconfont icon-close"></i>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'TopTip',
    computed: {
      ...mapGetters({
        tipWord: 'tipWord',
        isShow: 'isShow'
      })
    },
    methods: {
      ...mapMutations([
        'closeTip'
      ])
    }
  }
</script>

<style scoped>
  #TopTip {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */
    display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */
    flex-wrap: nowrap;
    align-items: center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
    border-radius: 0 0 6px 6px;
  }

  .word, .close_btn {
    flex: 1 1 auto;
  }

  .word {
    max-width: 200px;
    padding: 13px 20px;
  }

  .close_btn {
    padding-right: 4px;
    cursor: pointer;
  }

  .close_btn i.iconfont {
    font-size: 1.5rem;
  }
</style>