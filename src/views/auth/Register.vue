<template>
  <section class="bg-primary-50 text-secondary-500">
    <section
      class="c-container flex flex-col gap-8 pb-8 pt-36 lg:gap-12 lg:pb-16 lg:pt-40 xl:gap-16 xl:pb-32 xl:pt-44 2xl:pt-48"
    >
      <div
        class="flex items-center justify-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8"
      >
        <h1
          class="text-2xl font-bold text-secondary-500 xl:text-3xl 2xl:text-4xl"
        >
          Daftar
        </h1>
        <div class="h-0.5 flex-1 bg-secondary-500"></div>
      </div>

      <form
        method="POST"
        class="flex flex-col items-start justify-center gap-6 rounded-md bg-white px-6 py-12 shadow-[0px_4.7451px_41.5196px_rgba(41,82,144,0.25)] sm:rounded-lg sm:px-8 sm:py-16 md:rounded-xl md:px-10 md:py-20 lg:rounded-2xl lg:px-12 lg:py-24 xl:rounded-3xl xl:px-14 xl:py-28 2xl:px-16 2xl:py-32"
        @submit.prevent="submitForm"
      >
        <div
          class="flex w-full flex-col items-center justify-center gap-4 border-b-2 border-b-secondary-500 px-4 pb-5 sm:gap-6 lg:gap-8"
        >
          <h1
            class="pb-2 text-center text-[1.75rem] font-medium leading-9 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
          >
            Daftar diri Anda di
            <span class="font-bold text-primary-300">BestiePanti</span>
          </h1>
          <p class="text-base sm:text-lg">
            Silakan lengkapi form pendaftaran berikut. Akun pengguna yang
            didaftarkan
            <span class="font-bold">harus atas nama perorangan</span>.
          </p>
        </div>

        <div
          class="input-container mt-2 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8"
        >
          <!-- Name Lengkap -->
          <div class="col-span-1">
            <div class="flex gap-1 text-base sm:text-lg">
              <label
                for="name"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Nama Lengkap
              </label>
              <span class="text-red-500">*</span>
            </div>

            <input
              type="text"
              autocomplete="false"
              id="name"
              name="name"
              v-model="form.name"
              placeholder="Masukkan nama lengkap"
              class="autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]' mt-1 w-full rounded-md border border-secondary-500 bg-white p-4 text-sm sm:text-base"
            />

            <p id="name-error-message" class="error-message">
              {{ errorMessages.name }}
            </p>
          </div>

          <!-- Jenis Kelamin -->
          <div class="col-span-1">
            <div class="flex gap-1 text-base sm:text-lg">
              <label
                for="gender"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Jenis Kelamin
              </label>
              <span class="text-red-500">*</span>
            </div>

            <div
              class="mt-1 flex w-full items-center justify-start gap-8 text-sm sm:text-base"
            >
              <div class="flex items-center justify-center gap-2">
                <input
                  class="text-seconarborder-b-secondary-500 cursor-pointer appearance-none rounded-full focus:ring-0 focus:ring-offset-0"
                  type="radio"
                  id="laki-laki"
                  name="gender"
                  value="L"
                  v-model="form.gender"
                />
                <label for="laki-laki">Laki-laki</label>
              </div>

              <div class="flex items-center justify-center gap-2">
                <input
                  class="text-seconarborder-b-secondary-500 cursor-pointer appearance-none rounded-full focus:ring-0 focus:ring-offset-0"
                  type="radio"
                  id="perempuan"
                  name="gender"
                  value="P"
                  v-model="form.gender"
                />
                <label for="perempuan">Perempuan</label>
              </div>
            </div>

            <p id="gender-error-message" class="error-message">
              {{ errorMessages.gender }}
            </p>
          </div>

          <!-- Tanggal Lahir -->
          <div class="col-span-1">
            <div class="flex gap-1 text-base sm:text-lg">
              <label
                for="dob"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Tanggal Lahir
              </label>
              <span class="text-red-500">*</span>
            </div>

            <input
              type="date"
              autocomplete="false"
              id="dob"
              name="dob"
              v-model="form.dob"
              placeholder="Masukkan tanggal lahir"
              class="autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]' mt-1 w-full rounded-md border border-secondary-500 bg-white p-4 text-sm sm:text-base"
            />

            <p id="dob-error-message" class="error-message">
              {{ errorMessages.dob }}
            </p>
          </div>

          <!-- Nomor Whatsapp -->
          <div class="col-span-1">
            <div class="flex gap-1 text-base sm:text-lg">
              <label
                for="phone"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Nomor Whatsapp
              </label>
              <span class="text-red-500">*</span>
            </div>

            <input
              type="text"
              autocomplete="false"
              id="phone"
              name="phone"
              v-model="form.phone"
              placeholder="Masukkan nomor Whatsapp"
              class="autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]' mt-1 w-full rounded-md border border-secondary-500 bg-white p-4 text-sm sm:text-base"
            />

            <p id="phone-error-message" class="error-message">
              {{ errorMessages.phone }}
            </p>
          </div>

          <!-- Alamat -->
          <div class="col-span-1">
            <div class="flex gap-1 text-base sm:text-lg">
              <label
                for="address"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Alamat
              </label>
              <span class="text-red-500">*</span>
            </div>

            <input
              type="text"
              autocomplete="false"
              id="address"
              name="address"
              v-model="form.address"
              placeholder="Masukkan alamat"
              class="autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]' mt-1 w-full rounded-md border border-secondary-500 bg-white p-4 text-sm sm:text-base"
            />

            <p id="address-error-message" class="error-message">
              {{ errorMessages.address }}
            </p>
          </div>

          <!-- Email -->
          <div class="col-span-1">
            <div class="flex gap-1 text-base sm:text-lg">
              <label
                for="email"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Email
              </label>
              <span class="text-red-500">*</span>
            </div>

            <input
              type="email"
              autocomplete="false"
              id="email"
              name="email"
              v-model="form.email"
              placeholder="Masukkan email"
              class="autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]' mt-1 w-full rounded-md border border-secondary-500 bg-white p-4 text-sm sm:text-base"
            />

            <p id="email-error-message" class="error-message">
              {{ errorMessages.email }}
            </p>
          </div>

          <!-- Kata Sandi -->
          <div class="col-span-1">
            <div class="flex gap-1 text-base sm:text-lg">
              <label
                for="password"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Kata Sandi
              </label>
              <span class="text-red-500">*</span>
            </div>

            <div class="relative mt-1 w-full">
              <input
                ref="password"
                type="password"
                autocomplete="false"
                id="password"
                name="password"
                v-model="form.password"
                placeholder="Masukkan kata sandi"
                class="w-full rounded-md border border-secondary-500 bg-white p-4 pr-12 text-sm autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] sm:text-base lg:pr-14"
              />

              <svg
                v-show="!showPassword"
                id="eye-slash-1"
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
                id="eye-1"
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

            <p id="password-error-message" class="error-message">
              {{ errorMessages.password }}
            </p>
          </div>

          <!-- Konfirmasi Kata Sandi -->
          <div class="col-span-1">
            <div class="flex gap-1 text-base sm:text-lg">
              <label
                for="passwordcon"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Konfirmasi Kata Sandi
              </label>
              <span class="text-red-500">*</span>
            </div>

            <div class="relative mt-1 w-full">
              <input
                ref="confirmPassword"
                type="password"
                autocomplete="false"
                id="confirmation_password"
                name="confirmation_password"
                v-model="form.confirmation_password"
                placeholder="Masukkan kata sandi"
                class="w-full rounded-md border border-secondary-500 bg-white p-4 pr-12 text-sm autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] sm:text-base lg:pr-14"
              />

              <svg
                v-show="!showConfirmPassword"
                id="eye-slash-2"
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
                id="eye-2"
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

            <p id="confirmation_password-error-message" class="error-message">
              {{ errorMessages.confirmation_password }}
            </p>
          </div>
        </div>

        <div class="self-end px-4">
          <p class="text-sm text-red-500 sm:text-base lg:text-lg">
            *Wajib diisi
          </p>
        </div>

        <div class="px-2 lg:px-4">
          <button id="submit" type="submit" class="btn-primary">Daftar</button>
        </div>

        <div
          class="flex flex-col items-start justify-center gap-4 px-2 text-base lg:px-4"
        >
          <span>
            Sudah memiliki akun?

            <router-link
              class="font-bold hover:underline"
              :to="{ name: 'login' }"
            >
              Masuk di sini
            </router-link>
          </span>
        </div>
      </form>
    </section>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";

const password = ref(null);
const showPassword = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
  if (password.value) {
    password.value.type = showPassword.value ? "text" : "password";
  }
}

const confirmPassword = ref(null);
const showConfirmPassword = ref(false);

function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
  if (confirmPassword.value) {
    confirmPassword.value.type = showConfirmPassword.value
      ? "text"
      : "password";
  }
}

const form = reactive({
  name: "",
  email: "",
  password: "",
  confirmation_password: "",
  phone: "",
  dob: "",
  address: "",
  gender: "",
});

const errorMessages = reactive({
  name: "",
  email: "",
  password: "",
  confirmation_password: "",
  phone: "",
  dob: "",
  address: "",
  gender: "",
});

const errors = ref({});
const apiUrl = `${import.meta.env.VITE_API_URL}/api/v1/register`;

const submitForm = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      mode: "cors", // Ensure CORS mode is enabled
    });

    if (!response.ok) {
      const errorData = await response.json();
      errors.value = errorData;

      // Clear errorMessages
      Object.keys(errorMessages).forEach((key) => {
        errorMessages[key] = "";
      });

      // Store API error messages into errorMessages
      Object.entries(errorData).forEach(([field, message]) => {
        errorMessages[field] = message;
      });

      console.log(errorMessages);

      throw new Error("Validation failed");
    }

    const data = await response.json();
    console.log("Success:", data);
    alert("Registration successful!");
    // this.$router.push("/login"); // Uncomment if using Vue Router
  } catch (error) {
    console.error("Error:", error);
    if (error.message !== "Validation failed") {
      alert("Registration failed: " + error.message);
    }
  }
};
</script>

<style></style>
