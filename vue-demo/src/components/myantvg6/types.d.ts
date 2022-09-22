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
  Item
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
  draw(cfg: ModelConfig | undefined, group: IGroup | undefined): IShape,
  update?(cfg: ModelConfig | undefined, node: Item):void,
  extendedNodeName?: string,
}

export type RNodes = Array<RNode>

export {
  GraphData,
  ModelConfig,
  IShape
}