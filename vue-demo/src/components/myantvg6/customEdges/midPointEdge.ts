import { edgeShapeOptions} from '../types'
export const midPointEdge: edgeShapeOptions = {
  typeName: 'mid-point-edge',
  edgeDefinition: {
    afterDraw(cfg, group) {
      const shape = group?.get('children')[0];
      const midPoint = shape.getPoint(0.5);
      group?.addShape('rect', {
        attrs: {
          width: 10,
          height: 10,
          fill: '#f00',
          x: midPoint.x - 5,
          y: midPoint.y - 5
        }
      })
    },
    update: undefined
  },
  extendShapeType: 'cubic',
}