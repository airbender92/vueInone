/*
 * @Author: wangyunbo
 * @Date: 2022-08-03 08:54:37
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-08-03 08:57:52
 * @Description: file content
 */
import { createRouter, createWebHistory} from 'vue-router';
import ACom from '../components/ACom.vue'

const routes = [
  {
    path: '/poc-vue/a-com',
    name: 'ACom',
    component: ACom
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;