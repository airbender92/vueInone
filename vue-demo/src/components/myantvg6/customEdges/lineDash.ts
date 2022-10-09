import { edgeShapeOptions, ModelConfig, IGroup } from '../types';

const lineDashArr = [4, 2, 1, 2];

export const lineDash: edgeShapeOptions = {
  typeName: 'line-dash',
  edgeDefinition: {
    afterDraw(cfg, group) {
      const shape = group?.get('children')[0];
      let index = 0;
      shape.animate(
        () => {
          index++;
          if (index > 9) {
            index = 0;
          }
          const res = {
            lineDash: lineDashArr,
            lineDashOffset: -index,
          };
          return res;
        },
        {
          repeat: true, // 动画重复
          duration: 3000, // 一次动画的时长为 3000
        }
      );
    }
  },
  extendShapeType: 'cubic'
}