<!-- 顶部提示组件 -->

<template>
  <transition name="topTip">
    <div id="TopTip" v-if="isShow">
      <div class="word">{{ tipWord }}</div>
      <div class="close_btn" @click="closeTip">
        <i class="iconfont icon-close"></i>
      </div>
    </div>
  </transition>
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
  .topTip-enter-active, .topTip-leave-active {
    transition: all 1.8s
  }
  .topTip-enter, .topTip-leave-to {
    margin-top: -100%
  }
  #TopTip {
    position: fixed;
    top: 15px;
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
    border-top: none;
    letter-spacing: 0.1rem;
    border-radius: 6px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
  }

  .word, .close_btn {
    flex: 1 1 auto;
  }

  .word {
    max-width: 200px;
    padding: 11px 10px;
    font-size: 1.4rem;
  }

  .close_btn {
    padding-right: 4px;
    cursor: pointer;
  }

  .close_btn i.iconfont {
    font-size: 1.5rem;
  }
</style>