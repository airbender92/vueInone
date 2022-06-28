<!--
 * @Author: wangyunbo
 * @Date: 2022-06-28 09:43:39
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-06-28 10:31:30
 * @FilePath: \vueInone\vue-demo\src\components\menu\TreeMenu.vue
 * @Description: file content
-->
<template>
  <div class="tree-menu">
    <div :style="indent" @click="toggleChildren">{{ label }}</div>
    <div v-if="showChildren">
      <tree-menu
        v-for="(node, index) in nodes"
        :nodes="node.nodes"
        :label="node.label"
        :key="node.label + index"
        :depth="depth + 1"
      >
      </tree-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'label', 'nodes', 'depth'
  ],
  name: 'tree-menu',
  computed: {
    indent() {
      return {
        transform: `translate(${this.depth * 50}px)`
      }
    }
  },
  data() {
    return {
      showChildren: false
    }
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren
    }
  }
}
</script>

<style>

</style>
