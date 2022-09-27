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
  IShape,
  IGroup,
  Item,

  ShapeOptions,
  ShapeDefine,

  IEdge,
  IGroup
} from '@antv/g6-core/lib/types'

export type Instance = InstanceType<typeof G6.Graph>

export type Cfg = GraphOptions

export type EventNames = NodeEventType | EdgeEventType | ComboEventType | CanvasEventType

type GraphEvent = {
  eventName: EventNames;
  eventFn:(e: IG6GraphEvent, instance: Instance) => void;
}

export type GraphEvents = Array<GraphEvent>

export type RNode = {
  nodeName: string,
  draw?(cfg: ModelConfig | undefined, group: IGroup | undefined): IShape,
  update?(cfg: ModelConfig | undefined, node: Item):void,
  afterDraw?(cfg: ModelConfig | undefined, group: IGroup): void,
  getAnchorPoints?(cfg: ModelConfig | undefined):number[][] | undefined,
  extendedNodeName?: string,
  jsxFn?(cfg: ModelConfig | undefined): any
}

export type RNodes = Array<RNode>

export interface edgeShapeOptions extends ShapeOptions {
  typeName: string,
  edgeDefinition: ShapeOptions,
  extendShapeType?: string
}

export {
  GraphData,
  ModelConfig,
  IShape,
  ShapeOptions,
  ShapeDefine,
  IEdge,
  IGroup
}