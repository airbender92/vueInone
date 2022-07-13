/*
 * @Author: wangyunbo
 * @Date: 2022-07-13 10:26:47
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-13 11:06:00
 * @FilePath: \vueInone\vue-demo\src\api\user.js
 * @Description: file content
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: {token}
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}