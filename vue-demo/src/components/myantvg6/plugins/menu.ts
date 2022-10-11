
import G6 from '@antv/g6';
import { MenuConfig, Instance } from '../types';
export default function useMenu() {
  const options: MenuConfig = {
    offsetX: 6,
    offsetY: 10,
    itemTypes: ['node'],
    getContent(e: any, graph: Instance) {
      const outDiv = document.createElement('div');
      outDiv.style.width = '180px';
      outDiv.innerHTML = `
      <url>
        <li>测试01</li>
        <li>测试02</li>
      </url>
      `;
      return outDiv;
    },
    handleMenuClick(target:any, item:any, graph: Instance) {
      console.log(target, item, graph);
    },
  };
  const menu = new G6.Menu(options);
  return menu;
}