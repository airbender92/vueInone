/*
 * @Author: wangyunbo
 * @Date: 2022-07-13 10:27:32
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-13 11:03:06
 * @FilePath: \vueInone\vue-demo\src\utils\request.js
 * @Description: file content
 */
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store';
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // url = baseURL + requestURL
  baseURL: process.env.VUE_APP_BASE_API,
  // send cookies when cross-domain requests
  // withCredentials: true,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      config.headers['X-Token'] = getToken()
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data;

    if (res.code !== 20000) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other Client logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          debugger;
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service