import { edgeShapeOptions, ModelConfig,  IGroup} from '../types'
export const hvh: edgeShapeOptions = {
  typeName: 'hvh',
  edgeDefinition: {
    draw(cfg, group) {
      const startPoint = cfg!.startPoint!;
      const endPoint = cfg!.endPoint!;
      const shape = group!.addShape('path', {
        attrs: {
          stroke: '#3e75ff',
          path: [
            ['M', startPoint.x, startPoint.y],
            ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
            ['L', endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
            ['L', endPoint.x, endPoint.y]
          ]
        },
        name: 'path-shape'
      });
      return shape;
    }
  }
}