import G6 from '@antv/g6';

type DomAttr = {
  container: string,
  width: number,
  height: number,
  [key: string]: any
}


class AntvG6 {

  graph = null as any;

  defaultNode = {
    type: 'circle',
    color: '#000',
  }

  defaultEdge = {
    type: 'polyline',
    color: '#000',
  }

  defaultConfig = {
     container: '',
    fitView: true,
    fitViewPadding: [20, 40, 50, 20],
    defaultNode: this.defaultNode,
    defaultEdge: this.defaultEdge
  }

  constructor(args: DomAttr) {
    if (!this.graph) {
      this.initG6(args)
    }
  }

  initG6(args: DomAttr) {

    this.updateConfig(args);

    const graph = new G6.Graph({
      ...this.defaultConfig
    });

    this.graph = graph;

    return graph;
  }

  getGraph() {
    return this.graph
  }

  updateConfig(args ={}) {
    this.defaultConfig = {
      ...this.defaultConfig,
      ...args
    }
  }

  updateNodesStyle(nodes: any = []) {
    nodes.forEach(node => {
      if (!node.style) {
        node.style = {};
      }
      switch (node.class) {
        case 'c0': {
          node.type = 'circle';
          break;
        }
        case 'c1': {
          node.type = 'rect';
          node.size = [35, 20];
          break;
          }
      }
    })
  }
}

export default AntvG6;