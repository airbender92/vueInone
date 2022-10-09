import G6 from '@antv/g6';
import { ShapeOptions, ShapeDefine, RNode, RNodes } from '../types';

export function registNodes(nodes: RNodes) {
  (nodes || []).forEach((rnode) => {
    if (isJSXNode(rnode)) {
      registJSXNode(rnode);
    } else {
      registNode(rnode);
    }
  });
}

function registNode(rnode: RNode) {
  const {
    nodeName,
    draw,
    afterDraw,
    update,
    afterUpdate,
    setState,
    getAnchorPoints,
    extendedNodeName,
    options,
  } = rnode;
  const registerOptions: ShapeOptions | ShapeDefine = {};
  if (options) {
    registerOptions.options = options
  }
  if (draw) {
    /**
     * 绘制节点，包含文本
     * @param {Object} cfg 节点的配置项
     * @param {G.Group} group 图形分组，节点中图形对象的容器
     * @return {G.Shape} 返回一个绘制的图形作为keyShape, 通过 node.get('keyShape') 可以获取。
     */
    registerOptions.draw = function(cfg, group) {
      return draw?.(cfg, group);
    };
  }
  if (afterDraw) {
    /**
     * 绘制后的附加操作
     * @param {Object} cfg 节点的配置项
     * @param {G.Group} group 图形分组
     */
    registerOptions.afterDraw = function(cfg, group) {
      return afterDraw?.(cfg, group);
    };
  }
  if (update) {
    /**
     * 更新节点，包含文本
     * @param cfg
     * @param {Node} node 节点
     */
    registerOptions.update = function(cfg, node) {
      update?.(cfg, node);
    };
  }
  if (getAnchorPoints) {
    /**
     * 获取锚点 (相关边的连入点)
     * @param cfg
     * @return {Array|null} 锚点的数组
     */
    registerOptions.getAnchorPoints = function (cfg) {
      return getAnchorPoints(cfg);
    };
  }

  if (afterUpdate) {
    /**
     * 更新节点后的操作，一般同afterDraw配合使用
     * @param cfg
     * @param node
     */
    registerOptions.afterUpdate = function (cfg, node) {};
  }

   if (setState) {
     /**
      * 响应节点的状态变化
      * 在需要使用动画来响应状态变化时需要被复写
      * @param {String} name 状态名称
      * @param {Object} value 状态值
      * @param node
      */
     registerOptions.setState = function (name, value, node) {};
   }
    const finalRegisterOptions: ShapeOptions | ShapeDefine = {
      ...registerOptions,
    };

  G6.registerNode(nodeName, finalRegisterOptions, extendedNodeName);
}

function registJSXNode(rnode: RNode) {
  const { nodeName, jsxFn } = rnode;
  G6.registerNode(nodeName, jsxFn!);
}

function isJSXNode(node: any) {
  const isjsx = Object.prototype.hasOwnProperty.call(node, 'jsxFn');
  return isjsx;
}
