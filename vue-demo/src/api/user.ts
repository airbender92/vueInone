/*
 * @Author: wangyunbo
 * @Date: 2022-07-13 10:26:47
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-13 11:06:00
 * @FilePath: \vueInone\vue-demo\src\api\user.js
 * @Description: file content
 */
import { http } from '@/utils/request'

export type Login = {
  username: string,
  password: string
}

export type Token = {
  params: {
    token: string
  }
}

export function login(data: Login) {
  return http.post<Login>('/vue-element-admin/user/login', data)
}

export function getInfo(token: string | undefined) {
  return http.get<Token>('/vue-element-admin/user/info', {params: {token}})
}

export function logout(token: string | undefined) {
  return http.post('/vue-element-admin/user/logout', {token})

}