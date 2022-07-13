/*
 * @Author: wangyunbo
 * @Date: 2022-07-12 17:27:33
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-12 18:12:06
 * @FilePath: \vueInone\vue-demo\src\icons\index.js
 * @Description: file content
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

Vue.component('svg-icon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/)
console.log('context:::', req)
debugger;
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
