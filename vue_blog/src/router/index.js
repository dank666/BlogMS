import { createRouter, createWebHistory } from 'vue-router';
import BlogPage from '@/views/BlogPage.vue';      // 确保这个文件名没有变化
import LoginPage from '@/views/LoginPage.vue'; // 更新为新的文件名

const routes = [
  {
    path: '/',
    name: 'BlogPage',
    component: BlogPage
  },
  {
    path: '/login',
    name: 'LoginPage', // 可选，更新为新的名称
    component: LoginPage // 更新为新的文件名
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

