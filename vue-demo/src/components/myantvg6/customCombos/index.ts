import G6 from '@antv/g6';
import { comboShapeOptions } from '../types';

export function registCombos(combos: comboShapeOptions[]) {
   (combos || []).forEach((combo) => {
     registCombo(combo);
  });
}

// 不建议复写 update 和 draw 方法
function registCombo(combo: comboShapeOptions) {
  // 不建议“从无到有”地自定义 Combo，推荐使用继承的方式扩展内置的 'circle' 或 'rect' Combo；
  const { shapeType, comboDefinition, extendShapeType = 'circle' } = combo;
  G6.registerCombo(
    shapeType,
    comboDefinition,
    extendShapeType
  )
}