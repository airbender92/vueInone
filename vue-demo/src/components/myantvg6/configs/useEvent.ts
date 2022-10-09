import { ICombo } from '@antv/g6-core';
import { MyG6Instance, GraphEvents, EventNames, INode } from '../types';

// 全局事件
const globalEvents: GraphEvents = [
  {
    eventName: 'click',
    eventFn(evt, instance) {
      const shape = evt.target;
      const item = evt.item;
      if (item) {
        const type = item.getType();
        console.log('global events: ', type, item)
      }
    }
  }
];

// canvas 事件
const canvasEvents: GraphEvents = [
  {
    eventName: 'canvas:click',
    eventFn(evt, instance) {
      const shape = evt.target;
      const item = evt.item;
      if (item) {
        const type = item.getType();
        console.log('canvasEvents：', type, item)
      }
    }
  },
  {
    eventName: 'canvas:dragstart',
    eventFn(evt, instance) {
      console.log('画布拖拽开始')
    }
  },
  {
   eventName: 'canvas:dragend',
    eventFn(evt, instance) {
      console.log('画布拖拽结束')
    }
  }
]

// 图形上的事件
const shapeEvents: GraphEvents = [
  {
    eventName: 'hvh-path-shape:click',
    eventFn(evt, instance) {
      const edge = evt.item;
      console.log('hvh-path-shape edge: ', edge)
    }
  }
]

// 时机事件
const lifeEvents: GraphEvents = [
  {
    eventName: 'afterrender',
    eventFn(evt, instance) {
      instance.emit('testCustomEvent', {
        param: 'testCustomEvent'
      })
      console.group('图形渲染');
      console.log('图形渲染完成', evt, instance);
      console.groupEnd();
    }
  },
  {
    eventName: 'nodeselectchange',
    eventFn(evt, instance) {
      // 当前操作的item
      console.log(evt.target);
      // 当前操作后，所有被选中的 items集合
      console.log(evt.selectedItems);
      // 当前操作是选中还是取消选中
      console.log(evt.select);
    }
  },
  {
    eventName: 'aftercreateedge',
    eventFn(evt, instance) {
      console.log(evt.edge);
    }
  }
]

// 自定义事件
const customEvents: GraphEvents = [
  {
    eventName: 'testCustomEvent',
    eventFn(evt, instance) {
      console.log('触发自定义事件testCustomEvent', evt);
    }
  }
]

// 内置监听事件
const defaultEvents: GraphEvents = [
  {
    eventName: 'node:mouseenter',
    eventFn(evt, instance) {
      const node = evt.item! as INode;
      instance.setItemState(node, 'hover', true);
      instance.updateRelatedZLevel('node', evt, 'mouseenter');
      // 获取目标节点的所有相关边
      const edges = node.getEdges();
      // 将所有相关边的running状态置为true, 此时会触发自定义节点的setState函数
      edges.forEach(edge => {
        instance.setItemState(edge, 'running', true);
      })

    }
  },
  {
    eventName: 'node:mouseleave',
    eventFn(evt, instance) {
      const node = evt.item! as INode;
      instance.setItemState(node, 'hover', false);
      instance.updateRelatedZLevel('node', evt, 'mouseleave');
      // 获取目标节点的所有相关边
      const edges = node.getEdges();
      // 将所有相关边的running状态置为true, 此时会触发自定义节点的setState函数
      edges.forEach((edge) => {
        instance.setItemState(edge, 'running', false);
      });
    }
  },
  {
    eventName: 'edge:click',
    eventFn(evt, instance) {
      const edge = evt.item!;
      // 切换选中
      instance.setItemState(edge, 'selected', !edge?.hasState('selected'))
    }
  },
   {
    eventName: 'edge:mouseenter',
    eventFn(evt, instance) {
      const edge = evt.item!;
      instance.setItemState(edge, 'active', true);
      instance.setItemState(edge, 'hover', true);
      instance.updateRelatedZLevel('edge', evt, 'mouseenter');

    }
  },
  {
    eventName: 'edge:mouseleave',
    eventFn(evt, instance) {
      const edge = evt.item!;
      instance.setItemState(edge, 'active', false);
         instance.setItemState(edge, 'hover', false);
      instance.updateRelatedZLevel('edge', evt, 'mouseleave');

    }
  },
  {
    eventName: 'combo:click',
    eventFn(evt, instance) {
      if (evt.target.get('name') === 'combo-circle-shape') {
        // Collapse or expand the combo
        instance.collapseExpandCombo(evt.item as ICombo);

        if (instance.get('layout')) {
          instance.layout();
        } else {
          instance.refreshPositions();
        }
      }
    }
  },
  ...shapeEvents,
  ...lifeEvents,
  ...customEvents,
  ...canvasEvents
]

/**
 * 
 * @param instance g6实例对象
 * @param events 监听事件列表
 * @param excludeEvents 剔除的事件名
 */
export default function useEvent(instance: MyG6Instance, events?: GraphEvents, excludeEvents?: EventNames[]) {
  let filtedEvents: GraphEvents = [
    ...defaultEvents,
    ...(events || [])
  ];
  if (excludeEvents && excludeEvents.length > 0) {
     filtedEvents = events?.filter(eItem => {
      return !(excludeEvents.includes(eItem.eventName));
    }) as GraphEvents;
  }

  (filtedEvents || []).forEach(eItem => {
    const { eventName, eventFn } = eItem;
    instance.on(eventName, (evt) => {
      eventFn(evt, instance)
    })
  })
} 