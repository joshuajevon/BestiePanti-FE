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
      path: "/login/callback",
      name: "loginCallback",
      component: () => import("../views/auth/LoginCallback.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/Register.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/forget-password/verify-email",
      name: "forgetPassword",
      component: () => import("../views/auth/VerifyEmail.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/forget-password/verify-otp",
      name: "verifyOTP",
      component: () => import("../views/auth/VerifyOTP.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/forget-password/reset-password",
      name: "resetPassword",
      component: () => import("../views/auth/ResetPassword.vue"),
      meta: { requiresGuest: true },
    },
    {
      path: "/ubah-password",
      name: "ubahPassword",
      component: () => import("../views/auth/ChangePassword.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/panti-detail/:id",
      name: "pantiDetail",
      component: () => import("../views/PantiDetail.vue"),
    },
    {
      path: "/dashboard-admin",
      name: "dashboard-admin",
      component: () => import("../views/admin/DashboardAdmin.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/donasi-panti",
      name: "dashboard-panti",
      component: () => import("../views/panti/DashboardPanti.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/donasi-saya",
      name: "donasi-saya",
      component: () => import("../views/donatur/DonasiSaya.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/verifikasi/donasi-dana/:id",
      name: "donasi-dana",
      component: () => import("../views/panti/VerificationFundDonation.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/verifikasi/donasi-nondana/:id",
      name: "donasi-nondana",
      component: () => import("../views/panti/VerificationNonFundDonation.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/ubah/profile/donatur",
      name: "ubah-profile-donatur",
      component: () => import("../views/donatur/UpdateDonaturProfile.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/tambah/panti",
      name: "tambah-panti",
      component: () => import("../views/admin/AddPanti.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/ubah/profile/panti",
      name: "ubah-profile-panti",
      component: () => import("../views/panti/UpdatePantiProfile.vue"),
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // If there's a saved scroll position (e.g., going back in history), use it
    // if (savedPosition) {
    //   return savedPosition;
    // }

    // Otherwise, scroll to the top
    return { top: 0, behavior: "smooth" }; // Smooth scrolling
  },
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
