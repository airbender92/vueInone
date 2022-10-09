import { edgeShapeOptions, ModelConfig,  IGroup} from '../types'
export const circleRunning: edgeShapeOptions = {
  typeName: 'circle-running',
  edgeDefinition: {
    afterDraw(cfg, group) {
      // 获取当前边的第一个图形，这里是边本身的path
      const shape = group?.get('children')[0];
      // 边path的起点位置
      const startPoint = shape.getPoint(0);

      // 添加红色 circle 图形
      const circle = group?.addShape('circle', {
        attrs: {
          x: startPoint.x,
          y: startPoint.y,
          fill: 'red',
          r: 3,
        },
        name: 'circle-shape',
      });

      // 对红色圆点添加动画
      circle?.animate(
        (ratio: number) => {
          // 根据比例值，获取在边 path上对应比例的位置
          const tmpPoint = shape.getPoint(ratio);
          // 返回需要变化的参数集，这里返回位置x和y
          return {
            x: tmpPoint.x,
            y: tmpPoint.y,
          }
        },
        {
          repeat: true,
          duration: 3000,
        }
      )
    }
  },
  extendShapeType: 'cubic'
}