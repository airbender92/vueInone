## hatech-crud 表格优化-插槽

### 使用
- 1. 建议针对表格的column使用插槽的时候插槽参数使用table-column-columnProp;
  这样在crud里只需要正则匹配筛选出跟table-column相关的插槽转发给hatech-table组件

### 优化crud
- 1. hatech-table里添加如下slot转发代码片段；
    通过作用域插槽 `$scopedSlots` 获取插槽名称slotName, 
    根据正则匹配筛选出名称以`table-column-`开头的插槽传递给hatech-table 就可以正常使用table插槽了。

```vue
/**
 * @description 表格插槽的使用
 */
<hatech-crud>
      <!-- table的参数格式：table-column-columnProp -->
      <template v-slot:table-column-validateStatus="{scope}">
        <el-tooltip class="item" effect="dark"  placement="top-start">
        <div slot="content">
          {{scope.row.resultLog}}
          </div>
        <el-button type="text">sss</el-button>
        </el-tooltip>
      </template>
    </hatech-crud>


/**
 * @description crud源码需要优化的代码片段
 * path：node_modules\@hatech\crud\packages\component\src\main.vue
 * */
<!-- 表格 -->
<div v-if="tableConfig && !tableConfig.hide" ref="tableDivRef" id="table" v-loading="tableLoading"
  class="table_page_table">
  <hatech-table>
    <template v-for="(x, slotName) in $scopedSlots" v-slot:[slotName]="context">
      <slot v-if="/^table-column-/.test(slotName)" :name="slotName" v-bind="context" />
    </template>
    </hatech-table>
</div>
```
替换\r\n
 {{scope.row.resultLog.replace(/(?:\r\n|\r|\n)/g, '<br>');}}