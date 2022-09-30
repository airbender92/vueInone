
import G6 from '@antv/g6';
import { RegisterBehaviorOption } from '../types';

export function registerBehaviors(behaviors: RegisterBehaviorOption[]) {
  behaviors.forEach(b => {
    const { type, behavior} = b;
    G6.registerBehavior(type, behavior)
  })
}