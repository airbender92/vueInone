/*
 * @Author: wangyunbo
 * @Date: 2022-07-20 17:42:06
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-08-04 16:38:53
 * @Description: file content
 */
import Vue, { DirectiveOptions } from 'vue';

import 'normalize.css';
import ElementUI from 'element-ui';
import SvgIcon from 'vue-svgicon';

import '@/styles/element-variables.scss'
import '@/styles/index.scss'

import App from '@/App.vue';
import store from '@/store';
import router from '@/router'


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
