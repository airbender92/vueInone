import { edgeShapeOptions, ModelConfig, IGroup } from '../types';

const lineDashArr = [4, 2, 1, 2];

export const canRunning: edgeShapeOptions = {
  typeName: 'can-running',
  edgeDefinition: {
    // 复写setState方法
    setState(name, value, item) {
      const shape = item?.get('keyShape');
      // 监听running状态
      if (name === 'running') {
        // running 状态为true时
        if (value) {
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
        } else {
          // running 状态为false时
          // 结束动画
          shape.stopAnimate();
          // 清空 lineDash
          shape.attr('lineDash', null)
        }
      }
    },
  },
  extendShapeType: 'cubic'
}