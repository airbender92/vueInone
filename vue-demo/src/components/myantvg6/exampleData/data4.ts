export const data4 = {
  nodes: [
    { id: '1', x: 50, y: 50, size: 20 },
    { id: '2', x: 150, y: 50, size: 20 },
    { id: '3', x: 200, y: 50, size: 20 },
    { id: '4', x: 300, y: 130, size: 20 },
    { id: '5', x: 350, y: 50, size: 20 },
    { id: '6', x: 450, y: 50, size: 20 },
    { id: '7', x: 500, y: 50, size: 20 },
    { id: '8', x: 600, y: 50, size: 20 },
    { id: '9', x: 650, y: 50, size: 20 },
    { id: '10', x: 750, y: 50, size: 20 },
    { id: '11', x: 800, y: 50, size: 20 },
    { id: '12', x: 900, y: 150, size: 20 },
    { id: '13', x: 950, y: 50, size: 20 },
    { id: '14', x: 1050, y: 150, size: 20 },
    { id: '15', x: 1100, y: 50, size: 20 },
  ],
  edges: [
    { source: '1', target: '2', type: 'hvh', label: 'hvh' },
    {
      source: '3', target: '4', type: 'polyline', label: 'polyline', style: {
      radius: 10, lineWidth: 5
    } },
    { source: '5', target: '6', type: 'arc', label: 'arc' },
    { source: '7', target: '8', type: 'quadratic', label: 'quadratic' },
    {
      source: '9', target: '10', type: 'cubic', label: 'cubic',
      labelCfg: { refY: -15 }
    },
    {
      source: '11', target: '12', type: 'cubic-vertical', label: 'cubic-vertical',
      color: '#722ed1',
      size: 5,
      style: {
        lineDash: [2,2]
      },
      labelCfg: {
        position: 'center',
        autoRotate: true,
        style: {
          stroke: 'white',
          lineWidth: 5,
          fill: '#722ed1'
        }
      }
    },
    { source: '13', target: '14', type: 'cubic-horizontal', label: 'cubic-horizontal' },
    { source: '15', target: '15', type: 'loop', label: 'loop' },
  ],
}