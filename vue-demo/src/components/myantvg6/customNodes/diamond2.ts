import G6 from '@antv/g6';

import { ModelConfig, IShape, RNode } from '../types'

export const diamond2: RNode = {
  nodeName: 'diamond2',
  draw(cfg, group) {
    const color = cfg?.color ?? '#333';
    const path = getPath(cfg);
    const style = {
      ...{
        path,
        stroke: color,
      },
      ...(cfg?.style || {}),
    
    };
    const keyShape = group.addShape('path', {
      attrs: {
          ...style,
      },
      draggable: true,
      name: 'diamond-keyShape'
      })
    return keyShape
  },
  extendedNodeName: 'single-node'
};

function getPath(cfg: ModelConfig | undefined) {
      const size: any = cfg?.size || [40, 40];
      const [width, height] = size
      //   / 1 \
      //  4     2
      //   \ 3 /
      const path = [
        ['M', 0, 0 - height / 2], // 上顶点
        ['L', width / 2, 0], // 右侧顶点
        ['L', 0, height / 2], // 下部顶点
        ['L', -width / 2, 0], // 左侧顶点
        ['Z'], // 封闭
      ];
      return path;
}