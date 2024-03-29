/*
 * @Author: wangyunbo
 * @Date: 2022-07-22 08:38:21
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-22 16:14:53
 * @FilePath: \vue-ts-demo\src\utils\request.ts
 * @Description: file content
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, MessageBox } from 'element-ui';
import { UserModule } from '@/store/moudles/user';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers === undefined) {
      config.headers = {};
    }
    if (UserModule.token) {
      config.headers['X-Access-Token'] = UserModule.token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    const res = response.data;
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          UserModule.ResetToken()
          location.reload()
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data;
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service
