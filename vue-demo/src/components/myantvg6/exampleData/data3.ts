export const data3 = {
  nodes: [
    {
      id: 'node1', x: 50, y: 100, type: 'diamond2',
      style: {
        // 仅在 keyShape 上生效
        fill: 'lightblue',
        stroke: '#888',
        lineWidth: 1,
        radius: 7,
      },
    },
    { id: 'node2', x: 150, y: 100, type: 'diamond1', size: [50, 100] },
    { id: 'node3', x: 250, y: 100, color: 'red', type: 'diamond1' },
    { id: 'node4', x: 350, y: 100, label: '菱形', type: 'diamond1'},
    { id: 'node5', x: 350, y: 100, label: '', type: 'inner-animate', size: [50, 50], img: '/img/earth.svg'},
  ],
}