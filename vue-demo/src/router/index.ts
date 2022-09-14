
import * as Router from 'vue-router'

const { createWebHashHistory } = Router;
/* Layout */
import Layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
   {
    path: '/g6example',
    component: () => import('@/views/g6example/index.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  }
]

const createRouters = () => Router.createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
});

const router = createRouters()

export function resetRouter() {
  const newRouter = createRouters();
  // reset router
  // router.matcher = newRouter.matcher
}

export default router;