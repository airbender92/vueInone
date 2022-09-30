import { comboShapeOptions, ModelConfig, IShape } from '../types';

export const cRect: comboShapeOptions = {
  shapeType: 'cRect',
  comboDefinition: {
    drawShape(cfg:any, group): IShape {
      const self = this;
      // 获取配置中的Combo 内边距
      cfg!.padding = cfg!.padding || [50, 20, 20, 20] as number[];
      // 获取样式配置， style.width 与 style.height 对应 rect Combo 位置中的width 与height
      const style = self.getShapeStyle(cfg);
      // 绘制一个矩形作为 keyShape， 与 ’rect' Combo 的 keyShape 一致
      const rect = group?.addShape('rect', {
        attrs: {
          ...style,
          x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
          y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
          width: style.width,
          height: style.height,
        },
        draggable: true,
        name: 'combo-keyShape'
      });

      // 增加右侧圆
      group?.addShape('circle', {
        attrs: {
          ...style,
          fill: '#fff',
          opacity: 1,
          // cfg.style.width 与 cfg.style.height 对应 rect combo 位置说明的 innnerWidth 与 innerHeight
          x: cfg.style.width / 2 + cfg.padding[1],
          y: (cfg.padding[2] - cfg.padding[0]) / 2,
          r: 5,
        },
        draggable: true,
        name: 'combo-circle-shape',
      });
      return rect;
    },
    // 定义新增的右侧圆的位置更新逻辑
    afterUpdate(cfg: any, combo) {
      const group = combo?.get('group');
      // 在该combo的图形分组根据name找到右侧圆图形
      const circle = group.find((ele: any) => ele.get('name') === 'combo-circle-shape');
      // 更新 右侧圆位置
      circle.attr({
         // cfg.style.width 与 cfg.style.height 对应 rect combo 位置说明的 innnerWidth 与 innerHeight
        x: cfg?.style?.width! / 2 + cfg.padding[1],
        y: (cfg.padding[2] - cfg.padding[0]) / 2
      })
    }
  },
  extendShapeType: 'rect',
}