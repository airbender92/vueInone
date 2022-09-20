import G6 from '@antv/g6';

const minimap = new G6.Minimap({
  size: [100, 100],
  className: 'minimap',
  type: 'delegate'
});

export default minimap