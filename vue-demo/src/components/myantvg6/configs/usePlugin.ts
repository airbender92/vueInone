import G6 from "@antv/g6";
import useMenu from '../plugins/menu'
import useToolBar from "../plugins/toolBar";
const grid = new G6.Grid();
const minimap = new G6.Minimap();

const pluginStrings = [
  { name: 'grid', value: grid },
  { name: 'minimap', value: minimap },
  { name: 'menu', value: useMenu() },
  { name: 'toolbar', value: useToolBar() },
];

export default function usePlugin(plugins: string[]) {
  return pluginStrings
    .filter(p => plugins.includes(p.name))
    .map(p => p.value);
}