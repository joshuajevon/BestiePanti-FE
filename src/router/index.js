import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'beranda',
      component: () => import('../views/Beranda.vue'),
    },
    {
      path: '/panti',
      name: 'panti',
      component: () => import('../views/Panti.vue'),
    },
  ],
})

export default router
