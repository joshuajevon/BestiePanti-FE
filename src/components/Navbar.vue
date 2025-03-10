<template>
  <!-- Navbar -->
  <nav id="navbar" class="fixed z-50 w-full">
    <div
      class="c-container mx-auto flex h-20 w-full items-center justify-between gap-12 bg-primary-900 lg:h-24"
    >
      <!-- Left Side (Logo & Navigation) -->
      <div class="flex items-center gap-4 lg:gap-6">
        <!-- Mobile Menu Button -->
        <button
          class="text-white transition hover:text-white/75 lg:hidden"
          @click="toggleNavbar"
        >
          <span class="sr-only">Toggle menu</span>
          <div class="relative h-5 w-5">
            <span
              class="absolute inset-x-0 top-0.5 mx-auto h-[0.125rem] w-5 rounded-full bg-white transition"
              :class="{ 'rotate-45 translate-y-[6px]': isNavbarOpen }"
            ></span>
            <span
              class="absolute inset-0 m-auto h-[0.125rem] w-5 rounded-full bg-white transition"
              :class="{ 'opacity-0': isNavbarOpen }"
            ></span>
            <span
              class="absolute inset-x-0 bottom-0.5 mx-auto h-[0.125rem] w-5 rounded-full bg-white transition"
              :class="{ '-rotate-45 -translate-y-[8px]': isNavbarOpen }"
            ></span>
          </div>
        </button>

        <!-- Logo -->
        <router-link class="w-fit" :to="{ name: 'beranda' }">
          <img
            class="h-10 lg:h-12"
            src="/assets/logos/logo-icon-color.svg"
            alt="logo"
          />
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex">
          <ul class="flex w-full items-center justify-center gap-6">
            <li>
              <router-link
                class="nav-link-web"
                :class="{ 'text-primary-300': isActiveRoute('beranda') }"
                :to="{ name: 'beranda' }"
                >BERANDA</router-link
              >
            </li>
            <li>
              <router-link
                class="nav-link-web"
                :class="{ 'text-primary-300': isActiveRoute('panti') }"
                :to="{ name: 'panti' }"
                >PANTI</router-link
              >
            </li>
            <li>
              <router-link
                class="nav-link-web"
                :class="{ 'text-primary-300': isActiveRoute('tentangKami') }"
                :to="{ name: 'tentangKami' }"
                >TENTANG KAMI</router-link
              >
            </li>
            <li>
              <router-link
                class="nav-link-web"
                :class="{ 'text-primary-300': isActiveRoute('caraBerdonasi') }"
                :to="{ name: 'caraBerdonasi' }"
                >CARA BERDONASI</router-link
              >
            </li>
          </ul>
        </div>
      </div>

      <!-- Right Side (Auth & Profile) -->
      <div class="flex items-center gap-4">
        <div
          v-if="!authStore.isAuthenticated()"
          class="flex items-center gap-4"
        >
          <router-link class="nav-link-web" :to="{ name: 'login' }"
            >MASUK</router-link
          >
          <router-link class="btn-primary-sm" :to="{ name: 'register' }"
            >DAFTAR</router-link
          >
        </div>

        <!-- Profile Dropdown -->
        <div
          v-if="authStore.isAuthenticated() && authStore.user"
          class="relative text-white"
        >
          <div
            class="flex cursor-pointer items-center gap-2 hover:text-white/75"
            @click="toggleProfileWeb"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>

            <span class="max-w-[100px] truncate py-2 text-base font-medium">
              {{ authStore.user.name }}
            </span>

            <span
              class="transition"
              :class="{ 'rotate-180': isProfileWebOpen }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                width="20"
                fill="currentColor"
              >
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </span>
          </div>

          <div
            v-show="isProfileWebOpen"
            class="absolute right-0 mt-2 w-56 rounded-xl divide-y divide-secondary-100 bg-white text-base text-primary-300"
          >
            <div class="p-2">
              <router-link
                :to="dashboardRoute"
                class="flex items-center gap-2 px-4 py-2 hover:bg-primary-100 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>

                Dashboard
              </router-link>
            </div>
            <div class="p-2">
              <button
                @click="logout"
                class="flex w-full items-center gap-2 px-4 py-2 text-red-700 hover:bg-red-50 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>

                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Navigation -->
  <div
    v-show="isNavbarOpen"
    class="w-screen h-screen block lg:hidden fixed z-40"
  >
    <div class="w-full h-full relative flex">
      <div
        class="absolute inset-0 m-auto h-screen w-screen bg-secondary-500/50"
        @click="closeNavbar"
      ></div>

      <div class="w-52 bg-white h-screen flex flex-col pt-20 c-container z-10">
        <div class="border-b border-secondary-100 py-4">
          <router-link
            class="nav-link-mobile"
            :class="{ 'text-primary-300': isActiveRoute('beranda') }"
            :to="{ name: 'beranda' }"
            >BERANDA</router-link
          >
        </div>

        <div class="border-b border-secondary-100 py-4">
          <router-link
            class="nav-link-mobile"
            :class="{ 'text-primary-300': isActiveRoute('panti') }"
            :to="{ name: 'panti' }"
            >PANTI</router-link
          >
        </div>

        <div class="border-b border-secondary-100 py-4">
          <router-link
            class="nav-link-mobile"
            :class="{ 'text-primary-300': isActiveRoute('tentangKami') }"
            :to="{ name: 'tentangKami' }"
            >TENTANG KAMI</router-link
          >
        </div>

        <div class="border-b border-secondary-100 py-4">
          <router-link
            class="nav-link-mobile"
            :class="{ 'text-primary-300': isActiveRoute('caraBerdonasi') }"
            :to="{ name: 'caraBerdonasi' }"
            >CARA BERDONASI</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const route = useRoute();
const authStore = useAuthStore();
const isNavbarOpen = ref(false);
const isProfileWebOpen = ref(false);

const dashboardRoute = computed(() => {
  return authStore.user?.role === "ROLE_ADMIN" ? "/dashboard-admin" : "/dashboard-user";
});

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value;
}

function closeNavbar() {
  isNavbarOpen.value = false;
}

function toggleProfileWeb() {
  isProfileWebOpen.value = !isProfileWebOpen.value;
}

function isActiveRoute(routeName) {
  return route.name === routeName;
}

function logout() {
  authStore.logout();
}
</script>

<style scoped>
/* Add styles here if necessary */
</style>
