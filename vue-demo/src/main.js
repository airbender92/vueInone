/*
 * @Author: wangyunbo
 * @Date: 2022-06-28 09:38:33
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-12 09:54:33
 * @FilePath: \vueInone\vue-demo\src\main.js
 * @Description: file content
 */
import { createApp } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import store from './store';
import router from './router';
import App from './App.vue';
const app = createApp(App);
app.component(SvgIcon.name, SvgIcon);
app.use(router)
    .use(store)
    .mount('#app');
//# sourceMappingURL=main.js.map