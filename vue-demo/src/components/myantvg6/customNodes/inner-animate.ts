import G6 from '@antv/g6';
import { Util } from '@antv/g6-core';

import { ModelConfig, IShape, RNode } from '../types'

export const innerAnimate: RNode = {
  nodeName: 'inner-animate',
  afterDraw(cfg, group) {
    const size: any = cfg?.size || [40, 40];
    const width = size[0] - 14;
    const height = size[1] - 14;
    // 添加图片
    const image = group.addShape('image', {
      attrs: {
        x: - width / 2,
        y: - height / 2,
        width,
        height,
        img: cfg?.img
      },
      name: 'image-shape'
    });
    // 执行旋转动画
    image.animate((ratio: any) => {
      const matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      const toMatrix = Util.transform(matrix, [
        ['r', ratio * Math.PI * 2]
      ]);
      return {
        matrix: toMatrix
      }
    }, {
      repeat: true,
      duration: 3000,
      easing: 'easeCubic'
    })
  },
  getAnchorPoints(cfg) {
    return [
        [0, 0.5], // 左侧中间
        [1, 0.5], // 右侧中间
      ];
  },
  extendedNodeName: 'rect'
}