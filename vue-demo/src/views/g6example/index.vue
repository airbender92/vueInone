<template>
  <div class="g6container">
    <Antvg6
      :data="data7"
      :defaultCfg="defaultCfg"
     />
  </div>
</template>
<script lang="ts" setup>
import Antvg6 from '@/components/myantvg6/index.vue';
import { data7 } from '@/components/myantvg6/exampleData/data7';

const defaultCfg = {
  fitView: true,
  nodeStateStyles: {
    // 各状态下的样式，平铺的配置项仅在 keyShape上生效。
    hover: {
      fillOpacity: 0.1,
      lineWidth: 10
    }
  },
  edgeStateStyles: {
    hover: {
      lineWidth: 10,
      opacity: 0.5
    }
  },
  defaultCombo: {
    // 指定Combo类型，也可以将type写到 combo数据中
    type: 'cRect',
    padding: [20, 20, 20, 20],
  },
  defaultNode: {
    labelCfg: {
      position: 'left',
      style: {
        background: {
          fill: '#fff',
          stroke: 'green',
          padding: [3, 2, 3, 2],
          radius: 2,
          lineWidth: 3,
        }
      }
    }
  },
  defaultEdge: {
    labelCfg: {
      autoRotate: true,
      style: {
        background: {
          fill: '#ffffff',
          stroke: '#000000',
          padding: [2, 2, 2, 2],
          radius: 2
        }
      }
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