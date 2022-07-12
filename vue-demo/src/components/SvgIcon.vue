<!--
 * @Author: wangyunbo
 * @Date: 2022-06-28 10:52:30
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-12 11:08:17
 * @FilePath: \vueInone\vue-demo\src\components\SvgIcon.vue
 * @Description: file content
-->
<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-bind="$attrs" />
  <svg v-else :class="svgClass" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal as isExternalUtil } from '@/utils/validate'
export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {

    const { className, iconClass } = toRefs(props);

    const isExternal = computed(() => {
      return isExternalUtil(iconClass)
    })

    const iconName = computed(() => {
      return `#icon-${iconClass}`
    })

    const svgClass = computed(() => {
      if (className) {
        return 'svg-icon ' + className
      }
      return 'svg-icon'
    })

    const styleExternalIcon = computed(() => {
      return {
        mask: `url(${iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${iconClass}) no-repeat 50% 50%`,
      }
    })


    return {
      isExternal,
      iconName,
      svgClass,
      styleExternalIcon
    }
  }
})
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>