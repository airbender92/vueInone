
import { RNode } from '../types'

export const circleAnimate: RNode = {
  nodeName: 'circle-animate',
  afterDraw(cfg: any, group) {
    const shape = group.get('children')[0];
    shape.animate(
      (ratio: any) => {
        // 每一帧的操作，入参 ratio: 这一帧的比例值(Number). 返回值：这一帧需要变化的参数集（Object）.
        // 先变大，再变小
        const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
        let radius: any = cfg.size || 20;
        if (isNaN(radius)) radius = radius[0];
        // 返回这一帧需要变化的参数集，这里只包含了半径
        return {
          r: (radius as number) / 2 + diff,
        };
      },
      {
        // 动画重复
        repeat: true,
        duration: 3000,
        easing: 'easeCubic',
      }
    );
  },
  extendedNodeName: 'circle',
};