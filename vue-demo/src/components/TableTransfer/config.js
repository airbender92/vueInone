/*
 * @Author: wangyunbo
 * @Date: 2022-06-23 09:02:28
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-06-30 08:42:01
 * @FilePath: \ui\src\components\TableTransfer\config.js
 * @Description: file content
 */
import store from "@/store_config";

export default {
  title: "",
  // 表格ID，系统中表格唯一
  id: store.state.userInfo.name + "-" + "tableTransfer",
  // 数据访问路径   storage
  url: "",
  tableWidth: "100%",
  // 显隐列读取用户习惯
  showCellUrl: "/archetype-ui-istorm/rs/auths/tableCell/select",
  // 拖拽列保存入库路径，记录用户习惯
  dropCellUrl: "/archetype-ui-istorm/rs/auths/tableCell/insert",
  // 分页，当前页
  page: 1,
  // 分页，每页默认显示10条数据
  size: 10,
  pageSize: [10, 20, 50, 100],
  // 表格编号列显 示隐藏设置
  isIndexShow: true,
  // 表格选择框列显示隐藏设置
  isSelectShow: false,
  // 表格数据渲染
  data: [],
  // 数据多选
  select: [],
  // 当前表格数据总数
  count: 0,
  search: {
    // 查询条件
    pageIndex: 1,
    pageLimit: 10,
    userId: store.state.userInfo.id,
    params: {
       portName: "",
       storageId: "",
    }
  },
  column: [],
  // 是否显示头部右侧操作按钮
  showHeaderOption: false,
  headerOption: [],
  // 是否显示列表右侧操作按钮
  showTableOption: true,
  // 表格右侧列操作按钮集合宽度
  cellOptionWidth: "120px",
  cellOption: [],
  isRowClick: false,
  // el-table 属性
  table: {
    height: 350
  },
  handleTableBySelf: true,
  fetchTableEventName: 'fetchLeftTableData'
};
