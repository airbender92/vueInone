/*
 * @Author: wangyunbo
 * @Date: 2022-07-12 17:27:33
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-12 18:12:06
 * @FilePath: \vueInone\vue-demo\src\icons\index.js
 * @Description: file content
 */
// https://segmentfault.com/a/1190000022893908
const req = require.context('./svg', true, /\.svg$/)

const requireAll = (requireContext: any) => requireContext.keys().map(requireContext)
requireAll(req)
