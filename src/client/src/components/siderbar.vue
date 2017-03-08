<!-- 侧边导航 -->

<template>
  <transition name="siderbar">
    <div class="siderbar" v-if="siderbarShow">
      <div class="mask" @click="siderbarClose"></div>
      <!-- 为根路由导航设置exact属性true -->
      <ul>
        <li v-for="topbar_item in topbarData" @click="siderbarToggle" >
          <router-link 
            :to="{name: topbar_item.routerName}" 
            :class="$route.name" 
            :exact="topbar_item.routerName == 'home'? true : false"
          >
            {{ topbar_item.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script type="text/javascript">
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    name: 'Siderbar',
    computed: {
      ...mapGetters({
        topbarData: 'topbarData',
        screenWidth: 'screenWidth',
        siderbarShow: 'siderbarShow'
      })
    },
    methods: {
      ...mapMutations([
        'siderbarToggle',
        'siderbarClose'
      ])
    }
  }
</script>

<!-- 添加 "scoped" 属性使该css样式仅作用于该组件 -->
<style scoped>
  .siderbar {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  .mask {
    width: 200%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 14rem;
    z-index: -10;
    background-color: rgba(0,0,0,0.6);
  }

  .siderbar ul {
    margin-top: 0;
    width: 15rem;
    height: 100%;
    background-color: #fff;
  }

  .siderbar ul li {
    list-style: none;
    height: 3.5rem;
    width: 14rem;
    padding-left: 1rem;
    border-bottom: 1px solid #ddd;
  }

  .siderbar li a {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 3.5rem;
    color: #555;
    font-size: 1.6rem;
    font-weight: 600;
    text-decoration: none;
  }

  .siderbar li a.router-link-active {
    color: #41b883;
    font-size: 1.8rem;
    font-weight: 700;
  }

  .siderbar li a:hover {
    text-decoration: none;
    color: #41b883;
  }

  .siderbar-enter-active, .siderbar-leave-active {
    transition: left .4s, opacity .4s;
  }
  .siderbar-enter, .siderbar-leave-to {
    left: -100%;
    opacity: 0;
  }
</style>