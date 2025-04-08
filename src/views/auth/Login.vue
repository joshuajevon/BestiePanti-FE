<template>
  <section
    class="c-container flex flex-col gap-8 pb-8 pt-36 lg:gap-12 lg:pb-16 lg:pt-40 xl:gap-16 xl:pb-32 xl:pt-44 2xl:pt-48 bg-primary-50 text-secondary-500 relative"
  >
    <!-- Success Alert -->
    <div
      class="p-8 fixed z-[100] h-screen w-screen flex justify-end items-end left-0 top-0 pointer-events-none"
    >
      <transition name="slide-fade">
        <SuccessAlert
          v-if="showLogoutSuccessAlert"
          text1="Berhasil Keluar!"
          text2="Anda telah keluar. Sampai jumpa lagi!"
        />
      </transition>

      <transition name="slide-fade">
        <SuccessAlert
          v-if="showResetPasswordSuccessAlert"
          text1="Reset kata sandi berhasil!"
          text2="Silakan masuk menggunakan kata sandi baru Anda."
        />
      </transition>
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="isLoading"
      class="fixed inset-0 m-auto z-[200] w-screen h-screen bg-black/50 flex justify-center items-center"
    >
      <div class="bg-white rounded-xl p-8">
        <LoadingIndicator text="Sedang masuk..." class="text-secondary-500" />
      </div>
    </div>

    <div
      class="flex items-center justify-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8"
    >
      <h1
        class="text-2xl font-bold text-secondary-500 xl:text-3xl 2xl:text-4xl"
      >
        Masuk
      </h1>
      <div class="h-0.5 flex-1 bg-secondary-500"></div>
    </div>

    <form
      method="post"
      class="flex flex-col items-start justify-center gap-6 rounded-md bg-white px-6 py-12 shadow-[0px_4.7451px_41.5196px_rgba(41,82,144,0.25)] sm:rounded-lg sm:px-8 sm:py-16 md:rounded-xl md:px-10 md:py-20 lg:rounded-2xl lg:px-12 lg:py-24 xl:rounded-3xl xl:px-14 xl:py-28 2xl:px-16 2xl:py-32"
      @submit.prevent="submitForm"
    >
      <div class="w-full border-b-2 border-b-primary-300 px-4 pb-5">
        <h1
          class="pb-2 text-center text-[1.75rem] font-medium leading-9 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
        >
          Bergabunglah dengan
          <span class="font-bold text-primary-300">BestiePanti</span>
        </h1>
      </div>

      <div class="">
        <label
          th:if="${param.error}"
          th:text="${session['SPRING_SECURITY_LAST_EXCEPTION'].message}"
          class="redText text-center"
        ></label>
      </div>

      <!-- Email Address -->
      <div class="input-container mt-2">
        <label
          for="email"
          class="text-base font-medium text-secondary-500 sm:text-lg"
        >
          Email
        </label>

        <input
          type="email"
          autocomplete="false"
          id="email"
          name="email"
          v-model="form.email"
          placeholder="Masukkan email"
        />
        <p
          id="email-error-message"
          class="error-message"
          v-if="authStore.errorMessages.email"
        >
          {{ authStore.errorMessages.email }}
        </p>
      </div>

      <!-- Password -->
      <div class="input-container">
        <label
          for="password"
          class="text-base font-medium text-secondary-500 sm:text-lg"
        >
          Kata Sandi
        </label>

        <div class="relative w-full">
          <input
            ref="password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="false"
            id="password"
            name="password"
            v-model="form.password"
            placeholder="Masukkan kata sandi"
            class="pr-12 lg:pr-16"
          />

          <svg
            v-show="!showPassword"
            id="eye-slash"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="absolute inset-y-0 right-4 my-auto h-5 w-5 cursor-pointer lg:right-5 lg:h-6 lg:w-6"
            @click="togglePassword"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>

          <svg
            v-show="showPassword"
            id="eye"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="absolute inset-y-0 right-4 my-auto h-5 w-5 cursor-pointer lg:right-5 lg:h-6 lg:w-6"
            @click="togglePassword"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <p
          id="password-error-message"
          class="error-message"
          v-if="authStore.errorMessages.password"
        >
          {{ authStore.errorMessages.password }}
        </p>
      </div>

      <div class="w-full px-4">
        <p
          id="login-error-message"
          class="error-message"
          v-if="authStore.errorMessages.error_message"
        >
          {{ authStore.errorMessages.error_message }}
        </p>
      </div>

      <div class="px-2 lg:px-4">
        <button id="submit" type="submit" class="btn-primary">Masuk</button>
      </div>

      <div
        class="flex flex-col items-start justify-center gap-4 px-2 text-base lg:px-4"
      >
        <span>
          <router-link
            class="font-bold hover:underline text-primary-500"
            :to="{ name: 'forgetPassword' }"
          >
            Lupa kata sandi Anda?
          </router-link>
        </span>

        <span>
          Belum punya akun?
          <router-link
            class="font-bold hover:underline text-primary-500"
            :to="{ name: 'register' }"
          >
            Daftar di sini
          </router-link>
        </span>
      </div>
    </form>
    <button type="button" class="btn-primary" @click="handleLoginWithGoogle">
      Google Login
    </button>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref, watchEffect } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRoute, useRouter } from "vue-router";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import SuccessAlert from "@/components/alerts/SuccessAlert.vue";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const handleLoginWithGoogle = async () => {
  const success = await authStore.loginWithGoogle(form);

  if (success) {
    console.log("Success login with Google!");
  }
};

const showLogoutSuccessAlert = ref(false);

const handleLogoutSuccess = () => {
  router.replace({ query: {} });
  showLogoutSuccessAlert.value = true;

  setTimeout(() => {
    showLogoutSuccessAlert.value = false;
  }, 3000);
};

const showResetPasswordSuccessAlert = ref(false);

const handleResetPasswordSuccess = () => {
  router.replace({ query: {} });
  showResetPasswordSuccessAlert.value = true;

  setTimeout(() => {
    showResetPasswordSuccessAlert.value = false;
  }, 3000);
};

const showPassword = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

const form = reactive({
  email: "",
  password: "",
});

const isLoading = ref(false);

const validateForm = () => {
  Object.keys(authStore.errorMessages).forEach((key) => {
    authStore.errorMessages[key] = "";
  });

  let isValid = true;

  if (!form.email) {
    authStore.errorMessages.email = "Email tidak boleh kosong";
    isValid = false;
  }

  if (!form.password) {
    authStore.errorMessages.password = "Kata Sandi tidak boleh kosong";
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  isLoading.value = true;

  const success = await authStore.login(form);

  isLoading.value = false;

  if (success) {
    router.push({ path: "/", query: { showLoginSuccessAlert: "true" } });
  } else {
    Object.keys(form).forEach((key) => {
      form[key] = "";
    });
  }
};

onMounted(async () => {
  if (route.query.showLogoutSuccessAlert) {
    handleLogoutSuccess();
  }

  if (route.query.showResetPasswordSuccessAlert) {
    handleResetPasswordSuccess();
  }
});
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
