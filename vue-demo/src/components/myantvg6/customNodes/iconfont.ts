import { getIcon } from '@/utils/lib/getIcon'
import { RNode } from '../types'

export const iconfont: RNode = {
  nodeName: 'iconfont',
  draw(cfg: any, group: any) {
    const { backgroundConfig: backgroundStyle, style, labelCfg: labelStyle } = cfg;

    if (backgroundStyle) {
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: cfg.size,
          ...backgroundStyle
        },
        name: 'circle-shape'
      });
    }
    const keyShape = group.addShape('text', {
      attrs: {
        x: 0,
        y: 0,
        fontFamily: 'my-icons',
        textAlign: 'center',
        textBaseline: 'middle',
        text: getIcon(cfg.text),
        fontSize: cfg.size,
        ...style
      },
      name: 'text-shape1'
    });
    const labelY = backgroundStyle ? cfg.size * 2 : cfg.size;
    group.addShape('text', {
      attrs: {
        x: 0,
        y: labelY,
        textAlign: 'center',
        text: cfg.label,
        ...labelStyle.style,
      },
      name: 'text-shape1'
    });
    return keyShape;
  },
  extendedNodeName: 'circle'
}