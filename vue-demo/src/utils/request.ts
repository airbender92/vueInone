/*
 * @Author: wangyunbo
 * @Date: 2022-07-13 10:27:32
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-13 11:03:06
 * @FilePath: \vueInone\vue-demo\src\utils\request.js
 * @Description: file content
 */
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store';
import { getToken } from '@/utils/auth'

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
  Success = 20000,
  IllegalToken = 50008,
  LoggedIn = 50012,
  TokenExpired = 50014

}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": true,
  "X-Requested-With": "XMLHttpRequest",
}

interface MyAxiosRequestConfig extends Omit<AxiosRequestConfig, 'headers'> {
  headers?: any;
}

const injectToken = (config: MyAxiosRequestConfig): MyAxiosRequestConfig => {
  try {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken();
    }
    return config;
  } catch (error: any) {
    throw new Error(error)
  }
}


class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: process.env.VUE_APP_BASE_API,
      withCredentials: true,
      timeout: 5000,
      headers
    });
    http.interceptors.request.use(injectToken, error => Promise.reject(error));
    http.interceptors.response.use((response) => response, error => {
      const { response } = error;
      return this.handleError(response)
    });
    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>{
    return this.http.get<T, R>(url, config)
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data,config)
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config)
  }

  private handleError(error: any) {
    ElMessage({
      message: error.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    const { status } = error;
    switch (status) {
      case StatusCode.InternalServerError: {
        break;
      }
      case StatusCode.Forbidden: {
        break;
      }
      case StatusCode.Unauthorized: {
        break;
      }
      case StatusCode.TooManyRequests: {
        break;
      }
        case StatusCode.IllegalToken:
        case StatusCode.TokenExpired:
      case StatusCode.LoggedIn: {
        // to re-login
        ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        }
          
    }
    return Promise.reject(error);
  }
}

export const http = new Http();

// create an axios instance
// const service = axios.create({
//   // url = baseURL + requestURL
//   baseURL: process.env.VUE_APP_BASE_API,
//   // send cookies when cross-domain requests
//   // withCredentials: true,
//   timeout: 5000
// })

// service.interceptors.request.use(
//   (config: AxiosRequestConfig):AxiosRequestConfig => {
//     // do something before request is sent
//     if (store.getters.token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       config.headers['X-Token'] = getToken()
//     }
//     return config;
//   },
//   error => {
//     // do something with request error
//     console.log(error)
//     return Promise.reject(error)
//   }
// )

// service.interceptors.response.use(
//   response => {
//     const res = response.data;

//     if (res.code !== 20000) {
//       ElMessage({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })

//       // 50008: Illegal token; 50012: Other Client logged in; 50014: Token expired;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error)
//     ElMessage({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

// export default service