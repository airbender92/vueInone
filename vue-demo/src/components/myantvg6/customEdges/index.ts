import G6 from '@antv/g6';
import {  edgeShapeOptions } from '../types';

export function registEdges(edges: edgeShapeOptions[]) {
  (edges || []).forEach((redge) => {
     registEdge(redge);
  });
}

function registEdge(redge: edgeShapeOptions) {
  const { typeName, edgeDefinition, extendShapeType } = redge;
  G6.registerEdge(
    typeName,
    edgeDefinition,
    extendShapeType
  )
}
