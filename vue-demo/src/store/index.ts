/*
 * @Author: wangyunbo
 * @Date: 2022-07-13 09:46:36
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-13 10:06:17
 * @FilePath: \vueInone\vue-demo\src\store\index.js
 * @Description: file content
 */

import {createStore } from 'vuex'
import getters from './getters'

interface IModels extends Record<string, any> { }

const modulesFiles = require.context('./modules', true, /\.js$/);
console.group();
console.log('modulesFiles: ', modulesFiles)
console.groupEnd();


const modules: IModels = modulesFiles.keys().reduce((modules: IModels, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules
}, {})

const store = createStore({
  modules,
  getters
})

export default store;