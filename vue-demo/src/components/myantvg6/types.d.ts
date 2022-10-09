import G6 from '@antv/g6';
import { GraphOptions } from '@antv/g6-core';
import {
  GraphData,
  IG6GraphEvent,
  NodeEventType,
  EdgeEventType,
  ComboEventType,
  CanvasEventType,

  ModelConfig,
  ModeOption,
  IShape,
  IGroup,
  Item,
  INode,

  ShapeOptions,
  ShapeDefine,

  IEdge,
  IGroup,

  BehaviorOption
} from '@antv/g6-core/lib/types'

export type Instance = InstanceType<typeof G6.Graph>

export type Cfg = GraphOptions

export type EventNames = NodeEventType
  | EdgeEventType
  | ComboEventType
  | CanvasEventType
  | 'click'
  | string

/// MyG6类实例
export interface MyG6Instance extends Instance {
  /// 更新所有节点或线的层级
  updateZLevel(targetType: TargetType, position: PositionFnName): void

  /// 更新事件关联节点或线的层级
  updateRelatedZLevel(targetType: TargetType, evt:IG6GraphEvent, evtName: 'mouseenter' | 'mouseleave'): void
}

type GraphEvent = {
  eventName: EventNames;
  eventFn:(e: IG6GraphEvent, instance: MyG6Instance) => void;
}

export type GraphEvents = Array<GraphEvent>

export type RNode = {
  nodeName: string;
  draw?(cfg: ModelConfig | undefined, group: IGroup | undefined): IShape;
  update?(cfg: ModelConfig | undefined, node: Item): void;
  afterDraw?(cfg: ModelConfig | undefined, group: IGroup): void;
  getAnchorPoints?(cfg: ModelConfig | undefined): number[][] | undefined;
  extendedNodeName?: string;
  jsxFn?(cfg: ModelConfig | undefined): any;
} & ShapeOptions;

export type RNodes = Array<RNode>

export interface edgeShapeOptions {
  typeName: string,
  edgeDefinition: ShapeOptions,
  extendShapeType?: string
}

export type comboShapeOptions = {
  shapeType: string;
  comboDefinition: ShapeOptions;
  extendShapeType?: string
}

export interface RegisterBehaviorOption {
  type: string
  behavior: BehaviorOption
}

export type PositionFnName = 'toFront' | 'toBack'
export type TargetType = 'node' | 'edge'

export {
  GraphData,
  ModelConfig,
  ModeOption,
  IShape,
  IG6GraphEvent,
  ShapeOptions,
  ShapeDefine,
  IEdge,
  IGroup,
  INode,
  BehaviorOption
}