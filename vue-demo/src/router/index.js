/*
 * @Author: wangyunbo
 * @Date: 2022-07-12 09:43:05
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-12 10:35:35
 * @FilePath: \vueInone\vue-demo\src\router\index.js
 * @Description: file content
 */
import * as Router from 'vue-router'

const { createWebHashHistory } = Router;
/* Layout */
// import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

const router = Router.createRouter({
  scrollBehavior: () => ({ y: 0 }),
  history: createWebHashHistory(),
  routes: constantRoutes
});

export default router;