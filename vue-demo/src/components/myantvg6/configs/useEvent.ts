
import { ICombo } from '@antv/g6-core';
import { MyG6Instance, GraphEvents, EventNames } from '../types'

// 内置监听事件
const defaultEvents: GraphEvents = [
  {
    eventName: 'node:mouseenter',
    eventFn(evt, instance) {
      const node = evt.item!;
      instance.setItemState(node, 'hover', true);
      instance.updateRelatedZLevel('node', evt, 'mouseenter');
    }
  },
  {
    eventName: 'node:mouseleave',
    eventFn(evt, instance) {
      const node = evt.item!;
      instance.setItemState(node, 'hover', false);
      instance.updateRelatedZLevel('node', evt, 'mouseleave');

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
      instance.updateRelatedZLevel('edge', evt, 'mouseenter');

    }
  },
  {
    eventName: 'edge:mouseleave',
    eventFn(evt, instance) {
      const edge = evt.item!;
      instance.setItemState(edge, 'active', false);
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
  }
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