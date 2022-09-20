import G6 from '@antv/g6'
import { GraphOptions } from '@antv/g6-core';
import { IG6GraphEvent } from '@antv/g6-core/lib/types';

import minimap from '../plugins/minimap';
import imageMiniMap from '../plugins/imageMiniMap';
import grid from '../plugins/grid';

import tooltip from '../modes/tooltip';

type DomAttr = {
  container: string,
  width: number,
  height: number,
  [key: string]: any
}

type GraphEvent = {
  eventName: string;
  eventFn:(e: IG6GraphEvent) => void;
}
type GraphEventList = Array<GraphEvent>

type Plugin = any;

type PluginsList = Array<Plugin>

const toolTipFormatter = (model: any) => {
  return 'label: ' + model.label + '<br/> class: ' + model.class;
}
class AntvG6 {

  graph = null as any;

  defaultNode = {
    type: 'circle',
    color: '#000',
  }

  defaultEdge = {
    type: 'polyline',
    color: '#000',
  }

  defaultLayout = {
    layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: 100
        }
  }

  plugins: PluginsList = []

  // 监听事件
  eventsList = [{
    eventName: 'node:mouseenter',
    eventFn: null
  }]

  // 交互模式
  modes ={
      // 默认模式 允许拖拽画布，缩放画布，拖拽节点
    default: [
      'drag-canvas',
      'zoom-canvas',
      'drag-node',
      tooltip(toolTipFormatter)
    ],
      // 编辑模式
      edit: []
    }

  // 节点不同状态下的样式
  nodeStateStyles = {
    hover: {
      fill: 'lightsteelblue',
    },
    click: {
      stroke: '#000',
      lineWidth: 3
    }
  }

  // 边不同状态下的样式集合
  edgeStateStyles = {
    click: {
      stroke: 'steelblue'
    }
  }

  defaultConfig: GraphOptions = {
     container: '',
    defaultNode: this.defaultNode,
    defaultEdge: this.defaultEdge,
    nodeStateStyles: this.nodeStateStyles,
    edgeStateStyles: this.edgeStateStyles,
    modes: this.modes,
    plugins: this.plugins
  }

  constructor(args: DomAttr) {
    const { isFitView, layoutType = 'force' } = args;
    // 是否是适配窗口大小
    if (isFitView) {
      this.defaultConfig = {
        ...this.defaultConfig,
        fitView: true,
        fitViewPadding: [20, 40, 50, 20],
      }
    } else {
      // 否则根据布局类型计算布局
      this.updateDefaultLayout(this.defaultLayout.layout, 'type', layoutType);
      this.defaultConfig = {
        ...this.defaultConfig,
        // 配置布局
        ...this.defaultLayout
      }
    }

    if (!this.graph) {
      this.initG6(args)
    }
  }

  initG6(args: DomAttr) {

    this.updateConfig(args);
    this.addPlugins([imageMiniMap, grid]);
    const graph = new G6.Graph({
      ...this.defaultConfig
    });

    this.graph = graph;
    return graph;
  }

  getGraph() {
    return this.graph
  }

  render(data: any) {
    this.graph.data(data);
    this.graph.render();
    this.updateGraphImg();
  }

  updateGraphImg() {
    const imageMiniMap = this.plugins.find(p => p.displayName === 'imageMinimap');
    if (imageMiniMap) {
      const dataURL = this.graph.toDataURL()
        imageMiniMap.updateGraphImg(dataURL)
    }
  }

  updateDefaultLayout<T, P extends keyof T>(model: T, prop: P, value:any):void {
   model[prop] = value;
  }

  updateConfig(args ={}) {
    this.defaultConfig = {
      ...this.defaultConfig,
      ...args
    }
  }

  updateNodesStyle(nodes: any = []) {
    nodes.forEach((node: any) => {
      if (!node.style) {
        node.style = {};
      }
      switch (node.class) {
        case 'c0': {
          node.type = 'circle';
          break;
        }
        case 'c1': {
          node.type = 'rect';
          node.size = [35, 20];
          break;
          }
      }
    })
  }

  updateEdgesStyle(edges: any = []) {
    edges.forEach((edge: any) => {
      if (!edge.style) {
        edge.style = {};
      }
      edge.style.lineWidth = edge.weight;
      edge.style.opacity = 0.6;
      edge.style.stroke = 'grey'
    });
  }

  addEvents(eventsList: GraphEventList) {
    eventsList.forEach(eventObj => {
      const { eventName, eventFn } = eventObj;
      this.graph.on(eventName, (e: IG6GraphEvent) => {
        if (eventFn) {
          eventFn(e);
        }
      })

    })
  }

  addPlugins(plugins: PluginsList) {
    this.plugins = [...plugins]
    this.defaultConfig.plugins = this.plugins;
  }
}

export default AntvG6;