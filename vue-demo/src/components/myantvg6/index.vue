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

import { Cfg, Instance, GraphData, GraphEvents, EventNames } from './types'

const props = defineProps<{
  data?: GraphData,
  defaultCfg?: Partial<Cfg>,
  defaultEvents?: GraphEvents,
  excludeEvents?: EventNames[]
}>()

const containerRef = ref<HTMLDivElement | null>(null);

let instance: Instance | null = null;

// 注册自定义节点
registNodes([diamond1, diamond2, innerAnimate, rectXml, xmlCard]);
registEdges([hvh, lineGrowth, midPointEdge, stateEdge])

// 实例化容器
function initg6() {

  const dom = unref(containerRef) as HTMLDivElement;

  const { clientWidth, clientHeight } = dom;

  const cfgOptions: Cfg = {
    container: dom,
    width: clientWidth,
    height: clientHeight,
    ...props.defaultCfg
  }
  instance = new MyG6(cfgOptions);
}

// 渲染数据
async function initData() {
  const data = await Promise.resolve(props.data);
  instance?.data(data);
  instance?.render();
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