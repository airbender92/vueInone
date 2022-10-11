import G6 from '@antv/g6';

const tc = document.createElement('div');
tc.id = 'toolbarContainer';
document.body.appendChild(tc);

export default function useToolBar() {
  const toolbar = new G6.ToolBar({
    container: tc,
    getContent() {
      return `
      <url>
        <li code='add'>增加节点</li>
        <li code='undo'>撤销</li>
        <li code='nodecolor'>
          <input value="加粗" type='button' />
        </li>
      </url>
      `;
    },
    handleClick(code: string, graph) {
      if (code === 'add') {
        graph.addItem('node', {
          id: 'node' + new Date().valueOf(),
          label: 'newNode',
          x: 300,
          y: 150,
        });
      } else if (code === 'undo') {
        console.log(toolbar);
        toolbar.undo();
      } else if (code === 'nodecolor') {
        const nodes = graph.getNodes();
        nodes.forEach(node => {
          graph.updateItem(node, {
            style: {
              lineWidth: 3
            }
          })
        })
      }
    },
  });
  return toolbar;
}
