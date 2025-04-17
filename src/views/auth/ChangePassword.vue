<template>
  <section
    class=" min-h-screen c-container flex flex-col gap-8 pb-8 pt-36 lg:gap-12 lg:pb-16 lg:pt-40 xl:gap-16 xl:pb-32 xl:pt-44 2xl:pt-48 bg-primary-50 text-secondary-500"
  >
    <LoadingIndicator 
        v-if="fetching" 
        text="Memuat data..." 
        color="text-secondary-500" 
    />
    <div v-else-if="!hasAccess" class="p-6">
      <h1 class="text-4xl font-bold text-center text-red-700 justify-center">
        Kamu Tidak Memiliki Akses
      </h1>
    </div>


      <div v-if="!fetching && hasAccess" 
        class="flex items-center justify-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8">
        <h1 class="text-2xl font-bold text-secondary-500 xl:text-3xl 2xl:text-4xl">
          Ubah Password
        </h1>
        <div class="h-0.5 flex-1 bg-secondary-500"></div>
      </div>
      <!-- Form -->
      <form
        v-if="!fetching && hasAccess" 
        method="PATCH"
        class="flex flex-col items-center gap-6 rounded-md bg-white px-6 py-12 shadow-[0px_4.7451px_41.5196px_rgba(41,82,144,0.25)] sm:rounded-lg sm:px-8 sm:py-16 md:rounded-xl md:px-10 md:py-20 lg:rounded-2xl lg:px-12 lg:py-24 xl:rounded-3xl xl:px-14 xl:py-28 2xl:px-16 2xl:py-32"
        @submit.prevent="submitForm"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <!-- current password -->
          <div class="col-span-1 md:col-span-2 input-container">
            <div class="flex gap-1 text-base sm:text-lg">
              <label
                for="current_password"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Kata Sandi Saat Ini
              </label>
              <span class="text-red-500">*</span>
            </div>

            <div class="relative w-full">
              <input
                ref="currentPassword"
                :type="showCurrentPassword ? 'text' : 'password'"
                autocomplete="false"
                id="current_password"
                name="current_password"
                v-model="form.current_password"
                placeholder="Masukkan kata sandi saat ini"
                class="pr-12 lg:pr-16"
              />

              <svg
                v-show="!showCurrentPassword"
                id="eye-slash-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="absolute inset-y-0 right-4 my-auto h-5 w-5 cursor-pointer lg:right-5 lg:h-6 lg:w-6"
                @click="toggleCurrentPassword"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>

              <svg
                v-show="showCurrentPassword"
                id="eye-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="absolute inset-y-0 right-4 my-auto h-5 w-5 cursor-pointer lg:right-5 lg:h-6 lg:w-6"
                @click="toggleCurrentPassword"
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
              id="current-password-error-message"
              class="error-message"
              v-if="errorMessages.current_password"
            >
              {{ errorMessages.current_password }}
            </p>
          </div>
        </div>

        <!-- new password -->
        <div class="col-span-1 md:col-span-2 input-container">
          <div class="flex gap-1 text-base sm:text-lg">
            <label
              for="newPassword"
              class="text-base font-medium text-secondary-500 sm:text-lg"
            >
              Kata Sandi Baru
            </label>
            <span class="text-red-500">*</span>
          </div>

          <div class="relative w-full">
            <input
              ref="newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              autocomplete="false"
              id="new_password"
              name="new_password"
              v-model="form.new_password"
              placeholder="Masukkan kata sandi baru"
              class="pr-12 lg:pr-16"
            />

            <svg
              v-show="!showNewPassword"
              id="eye-slash-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="absolute inset-y-0 right-4 my-auto h-5 w-5 cursor-pointer lg:right-5 lg:h-6 lg:w-6"
              @click="toggleNewPassword"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>

            <svg
              v-show="showNewPassword"
              id="eye-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="absolute inset-y-0 right-4 my-auto h-5 w-5 cursor-pointer lg:right-5 lg:h-6 lg:w-6"
              @click="toggleNewPassword"
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
            id="new_password-error-message"
            class="error-message"
            v-if="errorMessages.new_password"
          >
            {{ errorMessages.new_password }}
          </p>
        </div>

        <!-- Confirm password -->
        <div class="col-span-1 md:col-span-2 input-container">
          <div class="flex gap-1 text-base sm:text-lg">
            <label
              for="confirmPassword"
              class="text-base font-medium text-secondary-500 sm:text-lg"
            >
              Kata Sandi Baru
            </label>
            <span class="text-red-500">*</span>
          </div>

          <div class="relative w-full">
            <input
              ref="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              autocomplete="false"
              id="confrim_password"
              name="confrim_password"
              v-model="form.confirmation_password"
              placeholder="Masukkan kata sandi baru"
              class="pr-12 lg:pr-16"
            />

            <svg
              v-show="!showConfirmPassword"
              id="eye-slash-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="absolute inset-y-0 right-4 my-auto h-5 w-5 cursor-pointer lg:right-5 lg:h-6 lg:w-6"
              @click="toggleConfirmPassword"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>

            <svg
              v-show="showConfirmPassword"
              id="eye-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="absolute inset-y-0 right-4 my-auto h-5 w-5 cursor-pointer lg:right-5 lg:h-6 lg:w-6"
              @click="toggleConfirmPassword"
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
            id="new_password-error-message"
            class="error-message"
            v-if="errorMessages.confirmation_password"
          >
            {{ errorMessages.confirmation_password }}
          </p>
        </div>

        <div class="self-end px-4">
          <p class="text-sm text-red-500 sm:text-base lg:text-lg">*Wajib diisi</p>
        </div>
        

        <div class="self-end px-2 lg:px-4 flex gap-2">
          <!-- Tombol-tombol -->
            <button 
              id="back" 
              class="btn-secondary"
              @click="goBack"
            >
              Kembali
            </button>

            <button 
              id="submit" 
              type="submit" 
              class="btn-primary"
            >
              Simpan
            </button>
        </div>
      </form>
    
  </section>
</template>


<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import { useAuthStore } from "@/stores/authStore";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";

const authStore = useAuthStore();
const fetching = ref(true);

const hasAccess = computed(() => {
  if (authStore.user?.role === "ROLE_ADMIN") return false;

  if (authStore.user?.role === "ROLE_DONATUR" && authStore.user?.is_google === "1") {
    return false;
  }
  
  return true;
});

const form = reactive({
  current_password: "",
  new_password: "",
  confirmation_password: "",
});

const errorMessages = reactive({
  current_password: "",
  new_password: "",
  confirmation_password: "",
});

const currentPassword = ref(null);
const showCurrentPassword = ref(false);

const newPassword = ref(null);
const showNewPassword = ref(false);

const confirmPassword = ref(null);
const showConfirmPassword = ref(false);

function toggleNewPassword() {
  showNewPassword.value = !showNewPassword.value;
}

function toggleCurrentPassword() {
  showCurrentPassword.value = !showCurrentPassword.value;
}

function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

const goBack = () => {
  window.history.back();
};

const fetchUserData = async () => {
  try {
    await authStore.fetchUser();
  } catch (error) {
    console.error("Gagal mengambil data pengguna", error);
  } finally {
    fetching.value = false;
  }
};

const validateForm = () => {
  Object.keys(errorMessages).forEach((key) => {
    errorMessages[key] = "";
  });

  let isValid = true;

  if (!form.current_password) {
    errorMessages.current_password = "Kata sandi saat initidak boleh kosong";
    isValid = false;
  }

   // Password validation
  if (!form.new_password) {
    errorMessages.new_password = "Kata sandi baru tidak boleh kosong";
    isValid = false;
  } else if (
    form.new_password.length < 8 ||
    !/[A-Za-z]/.test(form.new_password) ||
    !/\d/.test(form.new_password)
  ) {
    errorMessages.new_password =
      "Kata sandi harus memiliki minimal 8 karakter dan mengandung huruf dan angka";
    isValid = false;
  }

  // Confirmation Password validation
  if (!form.confirmation_password) {
    errorMessages.confirmation_password = "Konfirmasi password tidak boleh kosong";
    isValid = false;
  } else if (form.confirmation_password !== form.new_password) {
    errorMessages.confirmation_password = "Konfirmasi password tidak sesuai";
    isValid = false;
  }

  return isValid;
};

async function logout() {
  const success = await authStore.logout();

  if (success) {
    console.log("Redirectin to login");
    router.push({ path: "/login", query: { showLogoutSuccessAlert: true } });
  } else {
    console.error("Logout failed, staying on the page.");
  }
}

const submitForm = async () => {
  if (!validateForm()) return;

  try {
    const passwordData = {
      current_password: form.current_password,
      new_password: form.new_password,
      confirmation_password: form.confirmation_password,
    };


    const response = await authStore.changePassword(passwordData);

    if(response.current_password === "Kata sandi lama salah!") {
        errorMessages.current_password = response.current_password;
    } else {
      // logout();
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat update profile:", error);
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<style scoped> </style>
