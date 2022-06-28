<!--
 * @Author: wangyunbo
 * @Date: 2022-06-28 09:38:33
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-06-28 10:18:57
 * @FilePath: \vueInone\vue-demo\src\App.vue
 * @Description: file content
-->
<template>
  <div>
    <tree-menu 
    :label="treeData.label" 
    :nodes="treeData.nodes"
    :depth="0"
    ></tree-menu>
  </div>
</template>

<script>
import TreeMenu from './components/menu/TreeMenu.vue';
import treeData from './components/menu/config/config'; 

export default {
  name: 'App',
  components: {
    TreeMenu
  },
  data() {
    return {
      treeData
    }
  }
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
