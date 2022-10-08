import { IG6GraphEvent } from '@antv/g6-core/lib/types';
import {ModeOption } from '../types'

const dragCombo: ModeOption = {
  type: 'drag-combo',
  enableDelegate: true,
  activeState: 'actived',
  shouldUpdate: (e) => {
    // 不允许 id 为 'combo1' 的 combo 被拖拽
    if (e.item && e.item.getModel().id === 'combo1') return false;
    return true;
  },
  shouldEnd: (e) => {
    // 不可以将 combo 释放到 combo1 上
    console.log('shouldEnd: ', e);
    if (e.item && e.item.getModel().id === 'combo1') return false;
    return true;
  }
}

const dragCanvas: ModeOption = {
  type: 'drag-canvas',
  direction: 'x',
}

const scrollCanvas: ModeOption = {
  type: 'scroll-canvas',
  direction: 'x',
}

const dragNode: ModeOption = {
  type: 'drag-node',
  enableDelegate: true,
  shouldBegin: (e) => {
    // 不允许拖拽 id 为 'node1' 的节点
    if (e.item && e.item.getModel().id === 'node1') return false;
    return true;
  }
}

const clickSelect: ModeOption = {
  type: 'click-select',
  trigger: 'ctrl',
  // 是否允许该behavior 发生。若返回false, 被操作的item不会被选中，也不会触发'nodeselectchange'时机事件
  shouldBegin: (e) => {
    // 当点击的图形名为 'text-shape' 时，不允许该 behavior发生
    if (e.target.get('name') === 'text-shape') return false;
    // 当点击的节点/边/combo 的 id 为 ’id1‘ 时，不允许该 behavior 发生
    if (e.item?.getModel().id === 'id1') return false;
    return true;
  },
  // 是否允许对该 behavior 发生状态响应。若返回 false, 被操作的对象的状态及相关状态不会被更新， 但时仍然会触发’nodeselectchange‘ 时机事件
  shouldUpdate: (e) => {
    // 当点击的节点/边/combo的id为 ’id2‘时，该item不会发生状态的改变
    if (e.item?.getModel().id === 'id2') return false;
    return true;
  }
}

export function useBehavior() {
  return [
    dragCombo,
    dragCanvas,
    scrollCanvas,
    dragNode,
    clickSelect
  ]
}