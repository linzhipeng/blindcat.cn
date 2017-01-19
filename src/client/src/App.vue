<template>
  <div id="app">
    <router-view name="Topbar"></router-view>
    <router-view name="Home"></router-view>
    <router-view name="Add"></router-view>
    <p class="routeName">{{ $route.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style type="text/css">
	.routeName{
		font-size: 20px;
		display: block;
		width: 100%;
		height: 100px;
		text-align: center;
		line-height: 100px;
	}
</style>