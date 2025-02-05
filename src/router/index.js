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
    {
      path: '/tentang-kami',
      name: 'tentangKami',
      component: () => import('../views/TentangKami.vue'),
    },
    {
      path: '/cara-berdonasi',
      name: 'caraBerdonasi',
      component: () => import('../views/CaraBerdonasi.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue'),
    },
    {
      path: '/panti-detail',
      name: 'pantiDetail',
      component: () => import('../views/PantiDetail.vue'),
    },
  ],
})

export default router
