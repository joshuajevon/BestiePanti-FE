import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "beranda",
      component: () => import("../views/Beranda.vue"),
    },
    {
      path: "/panti",
      name: "panti",
      component: () => import("../views/Panti.vue"),
    },
    {
      path: "/tentang-kami",
      name: "tentangKami",
      component: () => import("../views/TentangKami.vue"),
    },
    {
      path: "/cara-berdonasi",
      name: "caraBerdonasi",
      component: () => import("../views/CaraBerdonasi.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/Login.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/Register.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/panti-detail/:id",
      name: "pantiDetail",
      component: () => import("../views/PantiDetail.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Beranda.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    next("/login");
  } else if (to.meta.requiresGuest && authStore.isAuthenticated()) {
    next("/");
  } else {
    next();
  }
});

export default router;
