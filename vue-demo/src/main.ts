
import { createApp } from 'vue'
import SvgIconPlugin from './plugins/svgIconPlugin'
import store from './store'
import router from './router'

import App from './App.vue'

 import './assets/fonts/font.css';

const app = createApp(App);
app.use(SvgIconPlugin, {
  imports: []
  });
  app.use(router)
  .use(store)
  .mount('#app')
