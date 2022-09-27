
import { ModelConfig, IShape, RNode } from '../types'

export const diamond1: RNode = {
  nodeName: 'diamond1',
  draw(cfg, group) {
    // 如果 cfg 中定义了 style 需要同这里的属性进行融合
    const keyShape = group?.addShape('path', {
      attrs: {
        path: getPath(cfg),
        stroke: cfg?.color ?? '#333',
      },
      name: 'path-shape',
      // 设置 draggable 以允许响应鼠标的拖拽事件
      draggable: true,
    }) as IShape;
    if (cfg?.label) {
      // 如果有文本
      // 如果有复杂的文本配置项，可通过 labelCfg 传入
      // const style = (cfg.labelCfg && cfg.labelCfg.style {};
      // style.text = cfg.label;
      const label = group?.addShape('text', {
        attrs: {
          x: 0,
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.label,
          fill: 'red'
        },
        name: 'text-shape',
        draggable: true
      })
    }
    return keyShape
  },
  update(cfg, node) {
    // 获取容器
    const group = node.getContainer();
    //按照添加的顺序， 获取 keyShape
    const shape = group.get('children')[0];
    const label = group.get('children')[1]
    const style = {
      path: getPath(cfg),
      stroke: cfg?.color ?? 'red'
    };
    // 更新属性
    shape.attr(style);
    if (label) {
      label.attr({
         fill: '#333'
       })
    }
  },
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