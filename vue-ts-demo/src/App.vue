<!--
 * @Author: wangyunbo
 * @Date: 2022-07-20 17:42:06
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-08-05 14:12:25
 * @Description: file content
-->
<template>
  <div id="app">
    <router-view />
    <!-- <service-worker-update-popup /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',
  components: {

  }
})
export default class extends Vue { }
</script>
