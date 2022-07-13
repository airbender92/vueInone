/*
 * @Author: wangyunbo
 * @Date: 2022-07-12 09:43:05
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-13 11:10:39
 * @FilePath: \vueInone\vue-demo\src\router\index.js
 * @Description: file content
 */
import * as Router from 'vue-router'

const { createWebHashHistory } = Router;
/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

const createRouters = () => Router.createRouter({
  scrollBehavior: () => ({ y: 0 }),
  history: createWebHashHistory(),
  routes: constantRoutes
});

const router = createRouters()

export function resetRouter() {
  const newRouter = createRouters();
  debugger;
  // reset router
  router.matcher = newRouter.matcher
}

export default router;