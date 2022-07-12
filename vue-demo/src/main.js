/*
 * @Author: wangyunbo
 * @Date: 2022-06-28 09:38:33
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-12 09:54:33
 * @FilePath: \vueInone\vue-demo\src\main.js
 * @Description: file content
 */
import { createApp } from 'vue'
import router from './router'

import App from './App.vue'

createApp(App)
  .use(router)
  .mount('#app')
