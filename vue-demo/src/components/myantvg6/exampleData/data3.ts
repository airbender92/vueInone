export const data3 = {
  nodes: [
    {
      id: 'node1',
      x: 50,
      y: 100,
      type: 'diamond2',
      anchorPoints: [
        [0, 0.5], // 左侧中间
        [1, 0.5], // 右侧中间
      ],
      style: {
        // 仅在 keyShape 上生效
        fill: 'lightblue',
        stroke: '#888',
        lineWidth: 1,
        radius: 7,
      },
    },
    {
      id: 'node2',
      x: 150,
      y: 100,
      type: 'diamond1',
      size: [50, 100],
      anchorPoints: [
        [0, 0.5], // 左侧中间
        [1, 0.5], // 右侧中间
      ],
    },
    { id: 'node3', x: 250, y: 100, color: 'red', type: 'diamond1' },
    {
      id: 'node4',
      x: 350,
      y: 100,
      label: '菱形',
      type: 'diamond1',
      anchorPoints: [
        [0, 0.5],
        [0.5, 1],
      ],
    },
    {
      id: 'node5',
      x: 450,
      y: 200,
      label: '',
      type: 'inner-animate',
      size: [50, 50],
      img: '/img/earth.svg',
    },
    {
      id: 'node5-0',
      x: 650,
      y: 500,
      label: '',
      type: 'circle-animate',
      size: [50, 50],
      img: '/img/earth.svg',
    },
    {
      id: 'node6',
      x: 250,
      y: 400,
      label: '',
      type: 'rect-xml',
      size: [50, 50],
    },
    {
      id: 'node7',
      x: 350,
      y: 300,
      label: '',
      type: 'xml-card',
      metric: 'CPU usage',
      cpuUsage: 80,
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
    {
      source: 'node4',
      target: 'node5',
    },
  ],
};