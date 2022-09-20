// 注意主画布更新时需要使用 updateGraphImg 方法替换 graphImg

import { ImageMinimap } from '@antv/g6';

class MyImageMinimap extends ImageMinimap {
  constructor(props: any) {
    super(props);
  }
  displayName = 'imageMinimap'
}

const imageMiniMap = new MyImageMinimap({
  width: 200,
  graphImg: '',
})


export default imageMiniMap