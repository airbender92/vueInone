<template>
  <div ref="antvg6Ref" id="g6Instance"></div>
</template>

<script lang="ts" setup>

import { ref, onMounted } from 'vue';
import AntvG6, { Instance } from './configs';
import { getG6Data1 } from '@/api/antv';
import { IG6GraphEvent, Item } from '@antv/g6-core/lib/types'
import { data2} from './exampleData'


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
    eventFn: (e: IG6GraphEvent, instance: Instance) => {
      // 获取鼠标进入的节点元素对象
      const nodeItem = e.item!;
      // 设置当前节点的hover状态为true
      instance.setItemState(nodeItem, 'hover', true)
    }
  }
  const event2 = {
    eventName: 'node:mouseleave',
    eventFn: (e: IG6GraphEvent, instance: Instance) => {
      const nodeItem = e.item!;
      instance.setItemState(nodeItem, 'hover', false)
    }
  }
  const event3 = {
    eventName: 'node:click',
    eventFn: (e: IG6GraphEvent, instance: Instance) => {
      // 先将所有当前是click状态的节点设置为非click状态
      const clickNodes = instance.findAllByState('node', 'click');
      clickNodes.forEach((cn:Item) => {
        instance.setItemState(cn, 'click', false);
      });
      const nodeItem = e.item!;
      instance.setItemState(nodeItem, 'click', true)
    }
  }
  const event4 = {
    eventName: 'edge:click',
    eventFn: (e: IG6GraphEvent, instance: Instance) => {
      // 先将所有当前是click状态的边置为非click状态
      const clickEdges = instance.findAllByState('edge', 'click');
      clickEdges.forEach((ce: Item) => {
       instance.setItemState(ce, 'click', false);
      });
      const edgeItem = e.item!;
      instance.setItemState(edgeItem, 'click', true);
    }
  }
  g6Instance.value!.addEvents([event2, event1, event3, event4])
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
  graphInstance.value = g6Instance.value.getGraph();
  handleAddG6Events();
}

const initData = async () => {
  // const { data } = await getG6Data1();
  // g6Instance.value!.updateNodesStyle(data.nodes);
  // g6Instance.value!.updateEdgesStyle(data.edges);
  g6Instance.value!.render(data2);
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
    /* 提示框的样式 */
    .g6-tooltip {
      border: 1px solid #e2e2e2;
      border-radius: 4px;
      font-size: 12px;
      color: #545454;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 10px 8px;
      box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    }
}
</style>