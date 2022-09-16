<template>
  <div ref="antvg6Ref" id="antvg6"></div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import AntvG6 from './configs';
import { getG6Data1 } from '@/api/antv'; 
let antvg6 = null;
const antvg6Ref = ref<HTMLElement | null>(null);
const graphInstance = ref<any>(null);
const getContainerSize = () => {
  const dom = antvg6Ref;
  const { clientWidth, clientHeight} = dom.value as HTMLElement
  return { clientWidth, clientHeight}
}

const initGraph = () => {
  const { clientWidth, clientHeight } = getContainerSize();
  const params = {
    container: 'antvg6',
    width: clientWidth,
    height: clientHeight
  }
  antvg6 = new AntvG6(params);
  graphInstance.value = antvg6.getGraph(params)
}

const initData = async () => {
  const { data } = await getG6Data1();
  antvg6.updateNodesStyle(data.nodes);
  graphInstance.value.data(data);
  graphInstance.value.render()
}

onMounted(() => {
  initGraph();
  initData();
})
</script>
<style scoped lang="scss">
#antvg6 {
  width: 100%;
  height: 100%;
}
</style>