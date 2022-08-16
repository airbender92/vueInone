/*
 * @Author: wangyunbo
 * @Date: 2022-07-22 08:41:09
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-22 08:41:09
 * @FilePath: \vue-ts-demo\src\store\index.ts
 * @Description: file content
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface IRootState {}

export default new Vuex.Store<IRootState>({})
