import { Graph, IEdge, INode } from '@antv/g6';

import { Cfg, PositionFnName, TargetType, MyG6Instance, IG6GraphEvent } from './types'


class MyG6 extends Graph {

  private static _instance: MyG6Instance | null  = null;

  constructor(cfg: Cfg) {
    super(cfg)
    if (MyG6._instance) {
      return MyG6._instance
    }
    MyG6._instance = this;
  }

  /**
   * 更新所有节点或线的层级
   * @param targetType 'node' | 'edge
   * @param position 'toFront' | 'toBack'
   */
  public updateZLevel(targetType: TargetType, position: PositionFnName) {
    if (targetType === 'node') {
      // 获取图上所有节点实例
      const nodes = this.getNodes();
      // 遍历节点实例，将所有节点提前
      nodes.forEach(node => {
        node[position]();
      })
    }
    if (targetType === 'edge') {
      const edges = this.getEdges();
      edges.forEach(edge => {
        edge[position]()
      })
    }
    // 更改层级后需要重新绘制图
    this.paint();
  }

  /**
   * 鼠标悬浮到目标时，更新节点|边以及关联节点|边的层级
   * @param targetType 鼠标悬浮目标
   * @param evt 事件
   * @param evtName 事件名称
   */
  public updateRelatedZLevel(targetType: TargetType, evt: IG6GraphEvent, evtName: 'mouseenter' | 'mouseleave') {
    if (targetType === 'edge' && evtName === 'mouseenter') {
      // 获取鼠标当前目标边
      const edge = evt.item as IEdge;
      // 该边的起始点
      const source = edge.getSource();
      // 该边的结束点
      const target = edge.getTarget();
      // 如果要提升边，先将边提前，再将端点提前。这样该边两个端点还是在该边上层，较符合常规。
      edge.toFront();
      source.toFront();
      target.toFront();
    }
    if (targetType === 'edge' && evtName === 'mouseleave') {
      // 获得图上所有边实例
      const edges = this.getEdges();
      // 遍历边，将所有边的层级放置在后方，以恢复原样
      edges.forEach(edge => { edge.toBack() })
    }

    if (targetType === 'node' && evtName === 'mouseenter') {
      // 获得鼠标当前目标节点
      const node = evt.item as INode;
      // 获取该节点的所有相关边
      const edges = node.getEdges();
      // 遍历相关边，将所有相关边提前，再将相关边的两个端点提前，以保证相关边的端点在边的上方
      edges.forEach(edge => {
        edge.toFront();
        edge.getSource().toFront();
        edge.getTarget().toFront();
      });
    }

    if (targetType === 'node' && evtName === 'mouseleave') {
      // 获得所有边实例
      const edges = this.getEdges();
      // 遍历边，将所有边的层级放在后方，恢复原样
      edges.forEach(edge => {
        edge.toBack();
      })
    }
    // 注意：必须调用以根据新的层级顺序重绘
    this.paint();
  }

}

export default MyG6;
