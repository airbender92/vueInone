import G6 from '@antv/g6';

import { ShapeOptions, ShapeDefine, RNode, RNodes } from '../types';

export function registNodes(nodes: RNodes) {
  (nodes || []).forEach((rnode) => {
    registNode(rnode);
  });
}

function registNode(rnode: RNode) {
  const {
    nodeName,
    draw,
    afterDraw,
    update,
    getAnchorPoints,
    extendedNodeName
  } = rnode;
  const registerOptions: ShapeOptions | ShapeDefine = {
    options: {
      style: {},
      stateStyles: {
        hover: {},
        selected: {},
      },
    },
    /**
     * 绘制节点，包含文本
     * @param {Object} cfg 节点的配置项
     * @param {G.Group} group 图形分组，节点中图形对象的容器
     * @return {G.Shape} 返回一个绘制的图形作为keyShape, 通过 node.get('keyShape') 可以获取。
     */
    draw(cfg, group) {
      return draw?.(cfg, group);
    },
    /**
     * 绘制后的附加操作
     * @param {Object} cfg 节点的配置项
     * @param {G.Group} group 图形分组
     */
    afterDraw(cfg, group) {
      return afterDraw?.(cfg, group)
    },
    /**
     * 更新节点，包含文本
     * @param cfg
     * @param {Node} node 节点
     */
    update(cfg, node) {
      update?.(cfg, node)
    },
    /**
     * 更新节点后的操作，一般同afterDraw配合使用
     * @param cfg
     * @param node
     */
    afterUpdate(cfg, node) { },
    /**
     * 响应节点的状态变化
     * 在需要使用动画来响应状态变化时需要被复写
     * @param {String} name 状态名称
     * @param {Object} value 状态值
     * @param node
     */
    setState(name, value, node) { },
    /**
     * 获取锚点 (相关边的连入点)
     * @param cfg
     * @return {Array|null} 锚点的数组
     */
    getAnchorPoints(cfg) {
      if (getAnchorPoints) {
        return getAnchorPoints(cfg)
      }
      return undefined
    },
  };
  const finalRegisterOptions: ShapeOptions | ShapeDefine = {
    ...registerOptions
  }
  // 继承指定的内置节点类型,则不去复写draw方法
  if (extendedNodeName && extendedNodeName !== 'single-node') {
    delete finalRegisterOptions.draw
  }
  G6.registerNode(
    nodeName,
    finalRegisterOptions,
  // 继承内置节点类型的名字
    extendedNodeName
  );
}
