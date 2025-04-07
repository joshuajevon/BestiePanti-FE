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
          v-if="showOTPSentSuccessAlert"
          text1="OTP Berhasil Dikirim!"
          text2="Silakan periksa email Anda untuk melanjutkan."
        />
      </transition>
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="isLoading"
      class="fixed inset-0 m-auto z-[200] w-screen h-screen bg-black/50 flex justify-center items-center"
    >
      <div class="bg-white rounded-xl p-8">
        <LoadingIndicator
          text="Sedang memverifikasi OTP..."
          class="text-secondary-500"
        />
      </div>
    </div>

    <div
      class="flex items-center justify-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8"
    >
      <h1
        class="text-2xl font-bold text-secondary-500 xl:text-3xl 2xl:text-4xl"
      >
        Lupa Kata Sandi
      </h1>

      <div class="h-0.5 flex-1 bg-secondary-500"></div>
    </div>

    <form
      method="post"
      class="flex flex-col items-start justify-center gap-6 rounded-md bg-white px-6 py-12 shadow-[0px_4.7451px_41.5196px_rgba(41,82,144,0.25)] sm:rounded-lg sm:px-8 sm:py-16 md:rounded-xl md:px-10 md:py-20 lg:rounded-2xl lg:px-12 lg:py-24 xl:rounded-3xl xl:px-14 xl:py-28 2xl:px-16 2xl:py-32"
      @submit.prevent="submitForm"
    >
      <div
        class="flex w-full flex-col items-center justify-center gap-4 border-b-2 border-b-secondary-500 px-4 pb-5 sm:gap-6 lg:gap-8"
      >
        <h1
          class="pb-2 text-center text-[1.75rem] font-medium leading-9 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
        >
          Verifikasi
          <span class="font-bold text-primary-300">OTP</span>
        </h1>
        <p class="text-base sm:text-lg text-center">
          Kami telah mengirimkan <span class="font-bold">kode OTP</span> ke
          alamat email Anda. Silakan
          <span class="font-bold">periksa email</span> Anda dan masukkan kode
          tersebut untuk melanjutkan proses verifikasi.
        </p>
      </div>

      <!-- Kode OTP -->
      <div class="input-container mt-2">
        <label
          for="otp"
          class="text-base font-medium text-secondary-500 sm:text-lg"
        >
          Kode OTP
        </label>

        <input
          type="text"
          autocomplete="false"
          id="otp"
          name="otp"
          v-model="form.otp"
          placeholder="Masukkan kode OTP yang dikirim ke alamat email Anda"
        />

        <p class="text-xs text-red-500 font-bold">
          *JANGAN BERIKAN KODE OTP KE SIAPAPUN!
        </p>

        <p
          id="otp-error-message"
          class="error-message"
          v-if="authStore.errorMessages.otp"
        >
          {{ authStore.errorMessages.otp }}
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
        <button id="submit" type="submit" class="btn-primary">
          Verifikasi OTP
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRoute, useRouter } from "vue-router";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import SuccessAlert from "@/components/alerts/SuccessAlert.vue";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const showOTPSentSuccessAlert = ref(false);

const handleOTPSentSuccess = () => {
  router.replace({ query: {} });
  showOTPSentSuccessAlert.value = true;

  setTimeout(() => {
    showOTPSentSuccessAlert.value = false;
  }, 3000);
};

const form = reactive({
  email: "",
  otp: "",
});

const isLoading = ref(false);

const validateForm = () => {
  Object.keys(authStore.errorMessages).forEach((key) => {
    authStore.errorMessages[key] = "";
  });

  let isValid = true;

  if (!form.otp) {
    authStore.errorMessages.otp = "Kode OTP tidak boleh kosong";
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  console.log(form);

  isLoading.value = true;

  const success = await authStore.forgetPasswordVerifyOTP(form);

  isLoading.value = false;

  if (success) {
    router.push({
      path: "/forget-password/reset-password",
      query: { showOTPVerifiedSuccessAlert: "true", email: form.email },
    });
  } else {
    form.otp = "";
  }
};

onMounted(() => {
  const emailFromQuery = route.query.email;
  if (emailFromQuery) {
    form.email = emailFromQuery;
  }

  if (route.query.showOTPSentSuccessAlert === "true") {
    handleOTPSentSuccess();
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
