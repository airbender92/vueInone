<!--
 * @Author: wangyunbo
 * @Date: 2022-08-03 08:51:02
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-08-03 14:19:35
 * @Description: file content
-->
<template>
<div>
  <div id="nav">
    <router-link to="/poc-vue">Home</router-link> | 
    <router-link to="/poc-vue/a-com">A Com</router-link>
  </div>
  <router-view />
</div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
