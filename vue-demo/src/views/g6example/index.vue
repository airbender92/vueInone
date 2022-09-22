<template>
  <div class="g6container">
    <Antvg6
      :data="data3"
      :defaultCfg="defaultCfg"
     />
  </div>
</template>
<script lang="ts" setup>
import Antvg6 from '@/components/myantvg6/index.vue';
import { data3 } from '@/components/myantvg6/exampleData';

const defaultCfg = {
  nodeStateStyles: {
    // 各状态下的样式，平铺的配置项仅在 keyShape上生效。
    hover: {
      fillOpacity: 0.1,
      lineWidth: 10.
    }
  }
}


</script>
<style lang="scss" scoped>
  .g6container{
    height: 80vh;
    width: 100%
  }
</style>