export const data5 = {
  nodes: [
    {
      id: 'node1',
      x: 100,
      y: 200,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'node2',
      x: 200,
      y: 100,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'node3',
      x: 200,
      y: 300,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
     {
      id: 'node4',
      x: 200,
      y: 400,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
       {
      id: 'node5',
      x: 300,
      y: 460,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
        {
      id: 'node6',
      x: 400,
      y: 400,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
       {
      id: 'node7',
      x: 400,
      y: 460,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
  ],
   edges: [
    {
      id: 'edge1',
      target: 'node2',
      source: 'node1',
      type: 'hvh',
    },
    {
      id: 'edge2',
      target: 'node3',
      source: 'node1',
      type: 'hvh',
     },
    {
      id: 'edge3',
      target: 'node4',
      source: 'node5',
      type: 'line-growth',
     },
     {
        id: 'edge4',
      target: 'node6',
      source: 'node5',
       type: 'state-edge'
     },
     {
      id: 'edge5',
      target: 'node6',
      source: 'node7',
      type: 'mid-point-edge',
    },
  ],
}