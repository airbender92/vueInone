import { RNode } from '../types';
export const backgroundAnimate: RNode = {
  nodeName: 'background-animate',
  afterDraw(cfg: any, group: any) {
    let r = cfg.size / 2;
    if (isNaN(r)) {
      r = cfg.size[0] / 2;
    }
    // 第一个背景圆
    const back1 = group.addShape('circle', {
      zIndex: -3,
      attrs: {
        x: 0,
        y: 0,
        r,
        fill: cfg.color,
        opacity: 0.6,
      },
      name: 'circle-shape1',
    });
    // 第二个圆背景
    const back2 = group.addShape('circle', {
      zIndex: -2,
      attrs: {
        x: 0,
        y: 0,
        r,
        fill: 'blue',
        opacity: 0.6,
      },
      name: 'circle-shape2',
    });
    // 第三个背景圆
    const back3 = group.addShape('circle', {
      zIndex: -1,
      attrs: {
        x: 0,
        y: 0,
        r,
        fill: 'green',
        opacity: 0.6,
      },
      name: 'circle-shape3',
    });
    // 根据zIndex排序
    group.sort();
    // 第一个圆逐渐放大并消失
    back1.animate(
      {
        r: r + 10,
        opacity: 0.1,
      },
      {
        repeat: true,
        duration: 3000,
        easing: 'easeCubic',
        delay: 0,
      }
    );
    // 第二个背景圆逐渐放大，并消失
    back2.animate(
      {
        r: r + 10,
        opacity: 0.1,
      },
      {
        repeat: true, // 循环
        duration: 3000,
        easing: 'easeCubic',
        delay: 1000, // 1 秒延迟
      }
    ); // 1 秒延迟

    // 第三个背景圆逐渐放大，并消失
    back3.animate(
      {
        r: r + 10,
        opacity: 0.1,
      },
      {
        repeat: true, // 循环
        duration: 3000,
        easing: 'easeCubic',
        delay: 2000, // 2 秒延迟
      }
    );
  },
  extendedNodeName: 'circle'
}