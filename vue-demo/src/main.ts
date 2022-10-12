/*
 * @Author: wangyunbo
 * @Date: 2022-06-28 09:38:33
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-12 09:54:33
 * @FilePath: \vueInone\vue-demo\src\main.js
 * @Description: file content
 */
import { createApp } from 'vue'
import SvgIconPlugin from './plugins/svgIconPlugin'
import store from './store'
import router from './router'

import App from './App.vue'

const app = createApp(App);
app.use(SvgIconPlugin, {
    imports: []
  });
  app.use(router)
  .use(store)
  .mount('#app')
