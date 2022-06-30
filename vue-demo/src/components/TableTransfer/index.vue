<!--
 * @Author: wangyunbo
 * @Date: 2022-06-22 14:53:32
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-06-30 08:44:28
 * @FilePath: \ui\src\components\TableTransfer\index.vue
 * @Description: file content
-->
<template>
  <div class="table_transfer" v-loading="loading">
    <div class="left_block">
      <template v-if="transforData.leftTitle">
        <div class="title">{{ transforData.leftTitle }}</div>
      </template>
      <slot name="leftContent">
        <hatech-table ref="hatechTableLeft" :hatechTable="instance" :table="leftTableConfig">
          <div class="hatech-search" slot="hatech-search">
            <el-form
              :model="searchFormLeft"
              ref="leftSearchForm"
              class="demo-form-inline"
              @submit.native.prevent
            >
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item>
                    <el-input
                      v-model="searchFormLeft.name"
                      suffix-icon="el-icon-search"
                      placeholder="名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </hatech-table>
        <div class="countInfo">
          <div class="totalWrapper">
            <span>总数：</span>
            <span>{{ leftFiltedTotal }}</span>
          </div>
          <div class="selectWrapper">
            <span>选中：</span>
            <span>{{ leftSelectedCount }}</span>
          </div>
        </div>
      </slot>
    </div>
    <div class="center_btns">
      <el-button class="btn btn1" @click="onTransToRight" :disabled="rightBtnDisabled">
        <svg-icon iconClass="right" class="right"></svg-icon>
      </el-button>
      <el-button class="btn" @click="onTransToLeft" :disabled="leftBtnDisabled">
        <svg-icon iconClass="left" class="left"></svg-icon>
      </el-button>
    </div>
    <div class="right_block">
      <template v-if="transforData.rightTitle">
        <div class="title">{{ transforData.rightTitle }}</div>
      </template>
      <slot name="rightContent">
        <hatech-table ref="hatechTableRight" :hatechTable="instance" :table="rightTableConfig">
          <div class="hatech-search" slot="hatech-search">
            <el-form
              :model="searchFormRight"
              ref="rightSearchForm"
              class="demo-form-inline"
              @submit.native.prevent
            >
              <el-row :gutter="10">
                <el-col :span="6">
                  <el-form-item>
                    <el-input
                      v-model="searchFormRight.name"
                      suffix-icon="el-icon-search"
                      placeholder="名称"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </hatech-table>
         <div class="countInfo">
          <div class="totalWrapper">
            <span>总数：</span>
            <span>{{ rightFiltedTotal }}</span>
          </div>
          <div class="selectWrapper">
            <span>选中：</span>
            <span>{{ rightSelectedCount }}</span>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { merge, cloneDeep } from "lodash";
import SvgIcon from "@/components/SvgIcon";
import defaultTableConfig from "./config";
export default {
  name: "tableTransfer",
  components: {
    SvgIcon
  },
  props: {
    transforData: {
      type: Object,
      default: () => ({
        leftTitle: "",
        rightTitle: ""
      })
    },
    selectedLeftData: {
      type: Array,
      default: () => []
    },
    selectedRightData: {
      type: Array,
      default: () => []
    },
    tableConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    // 需要深拷贝默认的配置，否则后面业务用到的表格字段会互相覆盖混乱
    const pureDefaultConfig = cloneDeep(defaultTableConfig)
    const mergedConfig = merge(pureDefaultConfig, this.tableConfig);
    mergedConfig.handInit = true;
    return {
      leftTableConfig: cloneDeep(mergedConfig),
      rightTableConfig: cloneDeep(mergedConfig),
      instance: this,
      loading: false,
      leftBtnDisabled: true,
      rightBtnDisabled: true,
      // 缓存查询之前的所有数据
      leftTotalData: [],
      rightTotalData: [],
      // 左侧勾选的数据
      selLeftData: [],
      selRightData: [],
      searchFormLeft: {
        name: ""
      },
      searchFormRight: {
        name: ""
      }
    };
  },
  mounted() {
    this.init();
    this.fetchTableData();
  },
  computed: {
    leftFiltedTotal() {
      return this.leftTableConfig.data.length;
    },
    leftSelectedCount() {
      return this.leftTableConfig.select.length;
    },
    rightFiltedTotal() {
      return this.rightTableConfig.data.length;
    },
    rightSelectedCount() {
      return this.rightTableConfig.select.length;
    }
  },
  watch: {
    "leftTableConfig.select": function(newV) {
      this.rightBtnDisabled = newV.length === 0;
    },
    "rightTableConfig.select": function(newV) {
      this.leftBtnDisabled = newV.length === 0;
    },
    "searchFormLeft.name": function(name) {
      const result = this.leftTotalData.filter(data => {
        return (data.name || "").includes(name);
      });
      this.leftTableConfig.data = result;
    },
    "searchFormRight.name": function(name) {
      const result = this.rightTotalData.filter(data => {
        return (data.name || "").includes(name);
      });
      this.rightTableConfig.data = result;
    },
    leftTotalData: {
      immediate: true,
      handler(newV) {
        const { name } = this.searchFormLeft;
        const result = newV.filter(data => {
          return (data.name || "").includes(name);
        });
        this.leftTableConfig.data = result;
      }
    },
    rightTotalData: {
      immediate: true,
      handler(newV) {
        const { name } = this.searchFormRight;
        const result = newV.filter(data => {
          return (data.name || "").includes(name);
        });
        this.rightTableConfig.data = result;
      }
    }
  },
  methods: {
    // 处理回调
    handleLeftTableData(result) {
      const { count, data, success } = result;
      if (success) {
        this.leftTableConfig.count = count || 0;
        this.leftTableConfig.data = data || [];
        this.leftTotalData = data || [];
      }
       this.loading = false;
    },
    async fetchTableData() {
      this.loading = true;
      this.$emit('onHandleLeftTableData', {
        cb: this.handleLeftTableData
      })
    },
    init() {
      // 移除hatechTable默认的loading;
      if (this.$refs.hatechTableLeft) {
        this.$refs.hatechTableLeft.isLoading = false;
      }
      if (this.$refs.hatechTableRight) {
        this.$refs.hatechTableRight.isLoading = false;
      }
    },
    resetSearch() {
      this.searchFormLeft.name = "";
      this.searchFormRight.name = "";
    },
    onTransToLeft() {
      this.resetSearch();
      const { select } = this.rightTableConfig;
      this.$emit("onTransToLeft");
      this.leftTotalData.push(...select);
      select.forEach(item => {
        const key = this.rightTotalData.findIndex(d => d.id === item.id);
        this.rightTotalData.splice(key, 1);
      });
    },
    onTransToRight() {
      const { select } = this.leftTableConfig;
      this.resetSearch();
      this.$emit("onTransToRight");
      this.rightTotalData.push(...select);
      select.forEach(item => {
        const key = this.leftTotalData.findIndex(d => d.id === item.id);
        this.leftTotalData.splice(key, 1);
      });
    },
    getSelectedData() {
      return this.rightTotalData;
    }
  }
};
</script>

<style lang="less" scoped>
.table_transfer {
  display: grid;
  grid-template-columns: 45% 10% 45%;
  align-items: flex-start;
  justify-content: center;

  /deep/ .hatech {
    display: flex;
    flex-direction: column;
  }
  .left_block, .right_block {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;

    .title{
      padding: 6px 0;
      border-bottom: 1px solid #DCDFE6;
      margin-bottom: 15px;
    }
    .countInfo{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 15px;
      .totalWrapper{
        margin-right: 40px;
      }
    }
  }
  .center_btns {
    align-items: center;
    align-self: center;
    width: 100%;
    padding-top: 90px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .btn {
      margin: 0;
    }
    .btn1 {
      margin-bottom: 15px;
    }
  }
  /deep/ .hatech-table {
    overflow: auto;
    flex: 1;
    .el-table{
      min-height: 280px;
    }
  }
}
</style>
