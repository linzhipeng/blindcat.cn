<template>
  <div id="app">
    <router-view name="Topbar"></router-view>
    <router-view name="Home"></router-view>
    <router-view name="Add"></router-view>
    {{ countAdd }}
  </div>
</template>

<script>
import { mapState } from 'Vuex'

export default {
  name: 'app',
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAdd: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
</script>
