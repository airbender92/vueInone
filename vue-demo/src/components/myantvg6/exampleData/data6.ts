export const data6 = {
  nodes: [
    {
      id: 'node1',
      label: '节点1',
      comboId: 'combo1',
      x: 450,
      y:100
    },
    {
      id: 'node2',
      comboId: 'combo1',
    },
    {
      id: 'node3'
    }
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      label: 'edge1'
    }
  ],
  combos: [
   { id: 'combo1', label: 'Combo 1', parentId: 'combo2'},
   { id: 'combo2', label: 'Combo 2',},
   { id: 'combo3', label: 'Combo 3' },
  ]
}