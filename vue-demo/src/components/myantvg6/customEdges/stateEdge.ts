import { edgeShapeOptions} from '../types'
export const stateEdge: edgeShapeOptions = {
  typeName: 'state-edge',
  edgeDefinition: {
    // 响应状态变化
    setState(name?, value?, item?) {
      const group = item?.getContainer();
      const shape = group?.get('children')[0];
      if (name === 'active') {
        if (value) {
          shape.attr('stroke', 'red');
        } else {
          shape.attr('stroke', '#333');
        }
      }
      if (name === 'selected') {
        if (value) {
          shape.attr('lineWidth', 3);
        } else {
          shape.attr('lineWidth', 2)
        }
      }
    },
  },
  extendShapeType: 'line'
}