
// 数据源
export const data7 = {
  nodes: [
    {
      id: 'node0',
      x: 100,
      y: 100,
      size: 20,
      style: {
        fill: 'red'
      },
      text: 'bug',
      type: 'iconfont'
    },
    {
      id: 'node1',
      x: 200,
      y: 200,
      size: 20,
      style: {
        fill: 'red'
      },
      text: 'chart',
      type: 'iconfont'
    },
    {
      id: 'node2',
      x: 150,
      y: 150,
      size: [20, 20],
      type: 'circle-animate',
    },
    {
      id: 'node3',
      x: 150,
      y: 250,
      size: 20,
      type: 'background-animate',
    },
    {
      id: 'node4',
      x: 150,
      y: 200,
      size: 20,
    },
    {
      id: 'node5',
      x: 250,
      y: 200,
      size: 20,
      type: 'can-running',
    },
  ],
  edges: [
    {
      id: 'edge0',
      source: 'node0',
      target: 'node1',
      type: 'circle-running',
    },
    {
      id: 'edge1',
      source: 'node2',
      target: 'node3',
      type: 'line-dash',
    },
    {
      id: 'edge2',
      source: 'node4',
      target: 'node5',
      type: 'can-running',
    },
    {
      id: 'edge3',
      source: 'node0',
      target: 'node5',
      type: 'can-running',
    },
  ],
};