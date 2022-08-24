### Vue 合并单元格 （跟随合并指定列）
```js
  // 跨行列缓存
  const spanMap = new Map();
  const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
    // 初始清空跨行列缓存
    if (rowIndex === 0 && columnIndex === 0) {
      spanMap.clear();
    }
    const fields = ['checkWay'];
    const followedFields = [{ source: 'checkWay', target: 'action' }];
    if (fields.includes(column.property)) {
      const cellValue = row[column.property];
      if (cellValue && fields.includes(column.property)) {
        const prevRow = ctx.refs[tableRef].tableConfig.data[rowIndex - 1];
        let nextRow = ctx.refs[tableRef].tableConfig.data[rowIndex + 1];
        if (prevRow && prevRow[column.property] === cellValue) {
          if (!spanMap.get(column.property)) {
            spanMap.set(column.property, []);
          }
          spanMap.set(column.property,
            [...spanMap.get(column.property), { rowspan: 0, colspan: 0 }]);
          return { rowspan: 0, colspan: 0 };
        }
        let countRowspan = 1;
        while (nextRow && nextRow[column.property] === cellValue) {
          // eslint-disable-next-line no-plusplus
          nextRow = ctx.refs[tableRef].tableConfig.data[++countRowspan + rowIndex];
        }
        if (countRowspan > 1) {
          if (!spanMap.get(column.property)) {
            spanMap.set(column.property, []);
          }
          spanMap.set(column.property,
            [...spanMap.get(column.property), { rowspan: countRowspan, colspan: 1 }]);
          return { rowspan: countRowspan, colspan: 1 };
        }
        if (!spanMap.get(column.property)) {
          spanMap.set(column.property, []);
        }
        spanMap.set(column.property,
          [...spanMap.get(column.property), { rowspan: 1, colspan: 1 }]);
        return { rowspan: 1, colspan: 1 };
      }
    }
    const followedItem = followedFields.find((item) => item.target === column.property);
    if (followedItem) {
      const { source } = followedItem;
      const sourceSpanList = spanMap.get(source);
      if (sourceSpanList) {
        return sourceSpanList[rowIndex];
      }
    }
  };
```