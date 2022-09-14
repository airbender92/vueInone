/*
 * @Author: wangyunbo
 * @Date: 2022-07-12 10:53:26
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-12 10:55:14
 * @FilePath: \vueInone\vue-demo\src\utils\validate.js
 * @Description: file content
 */
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}