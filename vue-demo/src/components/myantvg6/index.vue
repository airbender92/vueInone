<template>
  <div ref="containerRef" class="g6container"></div>
</template>

<script lang="ts" setup>

import { unref, ref, onMounted, defineProps } from 'vue';
import MyG6 from '.';
import useEvent from './configs/useEvent';

import { registNodes } from './customNodes';
import { diamond1 } from './customNodes/diamond';
import { diamond2 } from './customNodes/diamond2';
import { innerAnimate } from './customNodes/inner-animate'
import { rectXml } from './customNodes/rectXml'
import { xmlCard } from './customNodes/xmlCard'

import { registEdges } from './customEdges'
import { hvh } from './customEdges/hvh';
import { lineGrowth } from './customEdges/lineGrowth';
import { midPointEdge } from './customEdges/midPointEdge';
import { stateEdge } from './customEdges/stateEdge';

import { registCombos } from './customCombos'
import { cRect } from './customCombos/cRect'

import { registerBehaviors } from './customBehaviors'
import { dragCanvasExcludeLockedNode } from './customBehaviors/dragCanvasExcludeLockedNode'
import { activateNode } from './customBehaviors/activateNode'

import { Cfg, MyG6Instance, GraphData, GraphEvents, EventNames } from './types'

const props = defineProps<{
  data?: GraphData,
  defaultCfg?: Partial<Cfg>,
  defaultEvents?: GraphEvents,
  excludeEvents?: EventNames[]
}>()

const containerRef = ref<HTMLDivElement | null>(null);

let instance: MyG6Instance | null = null;

// 注册自定义节点
registNodes([diamond1, diamond2, innerAnimate, rectXml, xmlCard]);
registEdges([hvh, lineGrowth, midPointEdge, stateEdge]);
registCombos([cRect])
registerBehaviors([dragCanvasExcludeLockedNode, activateNode])

// 实例化容器
function initg6() {

  const dom = unref(containerRef) as HTMLDivElement;

  const { clientWidth, clientHeight } = dom;

  const {
    defaultCombo: pDefaultCombo = {},
    ...restPDefaultCfg
  } = props.defaultCfg as Partial<Cfg>;

  const cfgOptions: Cfg = {
    container: dom,
    width: clientWidth,
    height: clientHeight,
    /**
     * groupByTypes 是图的一个配置项，
     * 当其为默认值 true 时，
     * 所有节点在一个名为 nodeGroup 的分组，
     * 所有边在另一个名为 edgeGroup 的分组，且 nodeGroup 在 edgeGroup 上层。
     * 将其设置为 false 后，将不存在 nodeGroup 和 edgeGroup，
     * 所有节点和边在同一个分组，它们的层级根据生成的顺序决定。
     */
    // 必须将 groupByTypes设置为false, 带有combo的图中元素的视觉层级才能合理
    groupByTypes: false,
    defaultCombo: {
      labelCfg: {
        position: 'top',
        refX: -20,
      refY: -20,
        style: {
          fill: '#666',
          fontSize: 12
        }
      },
      collapsedSubstituteIcon: {
        show: true,
        img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IEQFS5VtXX8AAAAAAAAAAABkARQnAQ'
      },
      ...pDefaultCombo
    },
    modes: {
      default: [dragCanvasExcludeLockedNode.type, activateNode.type]
    },
    ...restPDefaultCfg
  }
  instance = new MyG6(cfgOptions);
}

// 渲染数据
async function initData() {
  const data = await Promise.resolve(props.data);
  instance?.data(data);
  instance?.render();
  instance?.updateZLevel('node', 'toFront');
}

// 事件监听
function initEventListener() {
  useEvent(instance!, props.defaultEvents)
}

onMounted(() => {
  initg6();
  initEventListener();
  initData();
  })
</script>

<style scoped lang="scss">
  .g6container {
    width: 100%;
   height: 100%;
  }
</style>