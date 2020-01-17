import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Config from '../views/config.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/config',
    name: ' 配置',
    component: Config
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
