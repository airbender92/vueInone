/*
 * @Author: wangyunbo
 * @Date: 2022-07-13 09:46:36
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-13 10:06:17
 * @FilePath: \vueInone\vue-demo\src\store\index.js
 * @Description: file content
 */
import Vue from 'vue'
import {createStore } from 'vuex'
import getters from './getters'

Vue.use(Vuex);

const modulesFiles = require.context('./modules', true, /\.js$/);
console.group();
console.log('modulesFiles: ', modulesFiles)
console.groupEnd();
debugger;
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default
  return modules
}, {})

const store = createStore({
  modules,
  getters
})

export default store