<template>
  <div id="app">
    <router-view name="Topbar"></router-view>
    <router-view name="ArticleList"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>