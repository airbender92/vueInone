import { edgeShapeOptions} from '../types'
export const lineGrowth: edgeShapeOptions = {
  typeName: 'line-growth',
  edgeDefinition: {
    afterDraw(cfg, group) {
      const shape = group?.get('children')[0];
      const length = shape.getTotalLength();
      shape.animate(
        (ratio: any) => {
          const startLen = ratio * length;
          const cfg = {
            lineDash: [startLen, length - startLen]
          };
          return cfg;
        },
        {
          repeat: true,
          duration: 2000
        }
      )
    }
  },
  extendShapeType: 'cubic',
}