<template>
  <section
    v-show="isFormVerifyOTPOpen"
    class="c-container fixed z-[100] h-screen w-screen bg-black/80 top-0 left-0"
  >
    <!-- Loading Overlay -->
    <div
      v-if="isSubmitting"
      class="absolute inset-0 m-auto z-[200] w-screen h-screen bg-black/50 flex justify-center items-center"
    >
      <div class="bg-white rounded-xl p-8">
        <LoadingIndicator
          text="Sedang memverifikasi OTP..."
          class="text-secondary-500"
        />
      </div>
    </div>

    <form
      method="POST"
      class="flex h-full w-full items-center justify-center relative"
      @submit.prevent="submitForm"
    >
      <div
        class="h-max-[80vh] flex w-full max-w-screen-xl flex-col gap-8 rounded-xl bg-white p-8 sm:rounded-2xl sm:p-12 lg:rounded-3xl lg:p-16"
      >
        <!-- Title -->
        <div
          class="flex w-full flex-col items-center justify-center gap-2 border-b-2 border-b-secondary-500 px-4 pb-5 sm:gap-3 lg:gap-4"
        >
          <h1
            class="pb-2 text-center text-4xl font-medium leading-9 sm:text-5xl lg:text-6xl"
          >
            Verifikasi
            <span class="font-bold text-primary-300">OTP</span>
          </h1>
          <p class="text-center text-base sm:text-lg">
            Kami telah mengirimkan <span class="font-bold">kode OTP</span> ke
            alamat email Anda. Silakan
            <span class="font-bold">periksa kotak masuk</span> (atau folder
            spam) dan
            <span class="font-bold">masukkan kode tersebut</span> untuk
            melanjutkan proses verifikasi.
          </p>
        </div>

        <div class="flex w-full flex-col items-start justify-center gap-6">
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
              v-model="props.form.otp"
              placeholder="Masukkan kode OTP yang dikirim ke alamat email Anda"
            />

            <p class="text-xs text-red-500 font-bold">
              *JANGAN BERIKAN KODE OTP KE SIAPAPUN!
            </p>

            <p
              id="otp-error-message"
              class="error-message"
              v-if="errorMessages.otp"
            >
              {{ errorMessages.otp }}
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
        </div>

        <div class="flex items-center justify-center gap-4">
          <button
            class="btn-secondary"
            type="button"
            @click="closeFormVerifyOTP"
            :disabled="isSubmitting"
          >
            Tutup
          </button>
          <button class="btn-primary" type="submit" :disabled="isSubmitting">
            Kirim
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import LoadingIndicator from "../loading/LoadingIndicator.vue";
import { useRouter } from "vue-router";

const props = defineProps({
  isFormVerifyOTPOpen: {
    type: Boolean,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
});

const authStore = useAuthStore();
const router = useRouter();

const emit = defineEmits(["closeFormVerifyOTP"]);

const errorMessages = reactive({ otp: "" });

const isSubmitting = ref(false);

const validateForm = () => {
  Object.keys(errorMessages).forEach((key) => {
    errorMessages[key] = "";
  });

  let isValid = true;

  if (!props.form.otp) {
    errorMessages.otp = "Kode OTP tidak boleh kosong";
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  const success = await authStore.verifyOTP(props.form);

  isSubmitting.value = false;

  if (success) {
    router.push({ path: "/", query: { showRegisterSuccessAlert: "true" } });
  }
};

const closeFormVerifyOTP = () => {
  emit("closeFormVerifyOTP");
};
</script>

<style scoped></style>
