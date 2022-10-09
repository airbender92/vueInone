// @ts-nocheck
import G6, { Item } from '@antv/g6';
import { RegisterBehaviorOption, IG6GraphEvent, MyG6Instance } from '../types';

export const activateNode: RegisterBehaviorOption = {
  type: 'activate-node',
  behavior: {
    getDefaultCfg() {
      return {
        multiple: false,
      };
    },
    getEvents() {
      return {
        'node:click': 'onNodeClick',
        'canvas:click': 'onCanvasClick',
      };
    },
    onNodeClick(e: IG6GraphEvent) {
      const graph = this.graph as MyG6Instance;
      const item = e.item as Item;
      if (item?.hasState('active')) {
        graph.setItemState(item, 'active', false);
        return;
      }
      // 如果不允许多个‘active' 先取消其他节点的’active‘状态
      if (!this.multiple) {
        this.removeNodesState();
      }
      // 置点击的节点状态 ’active‘ 为 true
      graph.setItemState(item, 'active', true);
    },
    onCanvasClick(e: IG6GraphEvent) {
      // shouldUpdate 可以由用户复写， 返回true时取消所有节点的’active‘状态
      if (this.shouldUpdate(e)) {
        this.removeNodesState();
      }
    },
    removeNodesState() {
      this.graph.findAllByState('node', 'active').forEach((node) => {
        this.graph.setItemState(node, 'active', false);
      });
    },
  },
};
