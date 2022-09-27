
import { Instance, GraphEvents, EventNames } from '../types'

// 内置监听事件
const defaultEvents: GraphEvents = [
  {
    eventName: 'node:mouseenter',
    eventFn(evt, instance) {
      const node = evt.item!;
      instance.setItemState(node, 'hover', true)
    }
  },
  {
    eventName: 'node:mouseleave',
    eventFn(evt, instance) {
      const node = evt.item!;
      instance.setItemState(node, 'hover', false)
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
      instance.setItemState(edge, 'active', true)
    }
  },
  {
    eventName: 'edge:mouseleave',
    eventFn(evt, instance) {
      const edge = evt.item!;
      instance.setItemState(edge, 'active', false)
    }
  },
]

/**
 * 
 * @param instance g6实例对象
 * @param events 监听事件列表
 * @param excludeEvents 剔除的事件名
 */
export default function useEvent(instance: Instance, events?: GraphEvents, excludeEvents?: EventNames[]) {
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