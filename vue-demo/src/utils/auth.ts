/*
 * @Author: wangyunbo
 * @Date: 2022-07-13 10:36:39
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-13 10:38:24
 * @FilePath: \vueInone\vue-demo\src\utils\auth.js
 * @Description: file content
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}