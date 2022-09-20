<template>
  <div ref="antvg6Ref" id="g6Instance"></div>
</template>

<script lang="ts" setup>

import { ref, onMounted } from 'vue';
import AntvG6 from './configs';
import { getG6Data1 } from '@/api/antv';
import { IG6GraphEvent, Item } from '@antv/g6-core/lib/types'

const antvg6Ref = ref<HTMLElement | null>(null);
const g6Instance = ref<InstanceType<typeof AntvG6> | null>(null);
const graphInstance = ref<any>(null);
const getContainerSize = () => {
  const dom = antvg6Ref;
  const { clientWidth, clientHeight} = dom.value as HTMLElement
  return { clientWidth, clientHeight}
}

const handleAddG6Events = () => {
  const event1 = {
    eventName: 'node:mouseenter',
    eventFn: (e: IG6GraphEvent) => {
      // 获取鼠标进入的节点元素对象
      const nodeItem = e.item;
      // 设置当前节点的hover状态为true
      graphInstance.value.setItemState(nodeItem, 'hover', true)
    }
  }
  const event2 = {
    eventName: 'node:mouseleave',
    eventFn: (e: IG6GraphEvent) => {
      const nodeItem = e.item;
      graphInstance.value.setItemState(nodeItem, 'hover', false)
    }
  }
  const event3 = {
    eventName: 'node:click',
    eventFn: (e: IG6GraphEvent) => {
      // 先将所有当前是click状态的节点设置为非click状态
      const clickNodes = graphInstance.value.findAllByState('node', 'click');
      clickNodes.forEach((cn:Item) => {
        graphInstance.value.setItemState(cn, 'click', false);
      });
      const nodeItem = e.item;
      graphInstance.value.setItemState(nodeItem, 'click', true)
    }
  }
  const event4 = {
    eventName: 'edge:click',
    eventFn: (e: IG6GraphEvent) => {
      // 先将所有当前是click状态的边置为非click状态
      const clickEdges = graphInstance.value.findAllByState('edge', 'click');
      clickEdges.forEach((ce: Item) => {
        graphInstance.value.setItemState(ce, 'click', false);
      });
      const edgeItem = e.item;
      graphInstance.value.setItemState(edgeItem, 'click', true);
    }
  }
  g6Instance.value!.addEvents([event1, event2, event3, event4])
}

const initGraph = () => {
  const { clientWidth, clientHeight } = getContainerSize();
  const params = {
    container: 'g6Instance',
    width: clientWidth,
    height: clientHeight,
  }
  g6Instance.value = new AntvG6(params);
  // 添加监听事件
  graphInstance.value = g6Instance.value.getGraph()
  handleAddG6Events();
}

const initData = async () => {
  const { data } = await getG6Data1();
  g6Instance.value!.updateNodesStyle(data.nodes);
  g6Instance.value!.updateEdgesStyle(data.edges);
  g6Instance.value!.render(data);
}

onMounted(() => {
  initGraph();
  initData();
})
</script>
<style scoped lang="scss">
#g6Instance {
  width: 100%;
  height: 100%;
}
</style>