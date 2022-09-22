import { Graph } from '@antv/g6';

import { Instance, Cfg } from './types'


class MyG6 extends Graph {

  private static _instance: Instance | null  = null;

  constructor(cfg: Cfg) {
    super(cfg)
    if (MyG6._instance) {
      return MyG6._instance
    }
    MyG6._instance = this;
  }

}

export default MyG6;
