<!--
 * @Author: wangyunbo
 * @Date: 2022-06-28 10:52:30
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-06-28 16:21:37
 * @FilePath: \vueInone\vue-demo\src\components\SvgIcon.vue
 * @Description: file content
-->
<template>
  <div v-html="require(`!html-loader!../assets/svg/${icon}.svg`)" class="svg-container"></div>
</template>

<script>

function recursivelyRemoveFill(el) {
  if (!el) {
    return
  }
  el.removeAttribute('fill');
  [].forEach.call(el.children, child => {
    recursivelyRemoveFill(child)
  })
}

export default {
  name: 'svg-icon',
  props: {
    icon: {
      type: String,
      default: null
    },
    hasFill: {
      type: Boolean,
      default: false
    },
    growByHeight: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    if (this.$el.firstElementChild.nodeName === 'svg') {
      const svgElement = this.$el.firstElementChild;
      const viewBox = svgElement.getAttribute('viewBox').split(' ').map(n => Number(n));
      const widthToHeight = (viewBox[2] / viewBox[3]).toFixed(2);
      if (this.hasFill) {
        recursivelyRemoveFill(svgElement);
      }
      if (this.growByHeight) {
        svgElement.setAttribute('height', '1em');
        svgElement.setAttribute('width', `${widthToHeight}em`);
      } else {
        svgElement.setAttribute('width', '1em');
        svgElement.setAttribute('height', `${1 / widthToHeight}em`)
      }
      svgElement.classList.add('svg-class')
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-container {
  display: inline-flex;
}
</style>