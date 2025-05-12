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
        Tambah Panti
      </h1>
      <div class="h-0.5 flex-1 bg-secondary-500"></div>
    </div>

    <!-- Form -->
    <form
      v-if="!fetching && hasAccess"
      method="POST"
      class="flex flex-col items-center gap-6 rounded-md bg-white px-6 py-12 shadow-[0px_4.7451px_41.5196px_rgba(41,82,144,0.25)] sm:rounded-lg sm:px-8 sm:py-16 md:rounded-xl md:px-10 md:py-20 lg:rounded-2xl lg:px-12 lg:py-24 xl:rounded-3xl xl:px-14 xl:py-28 2xl:px-16 2xl:py-32"
      @submit.prevent="submitForm"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <!-- Nama Panti -->
        <div class="col-span-1 input-container">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Nama Panti <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            v-model="form.name" 
            placeholder="Masukkan nama panti" 
          />

          <p
            class="error-message"
            v-if="errorMessages.name"
          >
            {{ errorMessages.name }}
          </p>

        </div>

        <!-- Nomor telepon -->
         <div class="col-span-1 input-container">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Nomor Telepon <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div
              class="absolute left-5 sm:left-6 top-0 bottom-0 my-auto h-fit text-sm sm:text-base"
            >
              <p>+62</p>
            </div>

            <input
              type="text"
              autocomplete="false"
              id="phone"
              name="phone"
              v-model="form.phone"
              placeholder="Masukkan nomor Whatsapp"
              class="pl-14 sm:pl-16"
              inputmode="numeric"
              @input="form.phone = $event.target.value.replace(/\D/g, '')"
            />
          </div>
          
          <p class="text-xs">*Contoh: 87812341234</p>

          <p v-if="errorMessages.phone" class="text-red-500 text-sm">
            {{ errorMessages.phone }}
          </p>
        </div>

        <!-- Alamat -->
        <div class="col-span-1 input-container">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Alamat <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            v-model="form.address" 
            placeholder="Masukkan alamat panti asuhan" 
            />

            <p
              class="error-message"
              v-if="errorMessages.address"
            >
              {{ errorMessages.address }}
            </p>

        </div>

        <!-- Region -->
        <div class="col-span-1 input-container">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Region <span class="text-red-500">*</span>
          </label>
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:pt-4">
            <label class="flex items-center gap-2">
              <input 
                type="radio" 
                name="region" 
                value="Jakarta" 
                v-model="form.region" 
              />
              Jakarta
            </label>
            <label class="flex items-center gap-2">
              <input 
                type="radio" 
                name="region" 
                value="Bogor" 
                v-model="form.region" 
              />
              Bogor
            </label>
            <label class="flex items-center gap-2">
              <input 
                type="radio" 
                name="region" 
                value="Depok" 
                v-model="form.region" 
              />
              Depok
            </label>
            <label class="flex items-center gap-2">
              <input 
                type="radio" 
                name="region" 
                value="Tangerang" 
                v-model="form.region" 
              />
              Tangerang
            </label>
            <label class="flex items-center gap-2">
              <input 
                type="radio" 
                name="region" 
                value="Bekasi" 
                v-model="form.region" 
              />
              Bekasi
            </label>
          </div>

          <p
            class="error-message"
            v-if="errorMessages.region"
          >
            {{ errorMessages.region }}
          </p>

        </div>

        <!-- Maps -->
        <div class="col-span-1 input-container">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Google Maps <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            v-model="form.maps" 
            placeholder="Masukkan google maps panti asuhan" 
            />

            <p
              class="error-message"
              v-if="errorMessages.maps"
            >
              {{ errorMessages.maps }}
            </p>

        </div>

        <!-- Email -->
        <div class="col-span-1 input-container">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Email <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            v-model="form.email" 
            placeholder="Masukkan email" 
          />

          <p
            class="error-message"
            v-if="errorMessages.email"
          >
            {{ errorMessages.email }}
          </p>

        </div>

        <!-- Kata Sandi -->
        <div class="col-span-1 input-container">
          <div class="flex gap-1 text-base sm:text-lg">
            <label
              for="password"
              class="text-base font-medium text-secondary-500 sm:text-lg"
            >
              Kata Sandi
            </label>
            <span class="text-red-500">*</span>
          </div>

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

          <p class="text-xs">*Minimal 8 karakter mengandung huruf dan angka</p>

          <p
            id="password-error-message"
            class="error-message"
            v-if="errorMessages.password"
          >
            {{ errorMessages.password }}
          </p>
        </div>

        <!-- Konfirmasi Kata Sandi -->
        <div class="col-span-1 input-container">
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
              :type="showConfirmPassword ? 'text' : 'password'"
              autocomplete="false"
              id="confirmation_password"
              name="confirmation_password"
              v-model="form.confirmation_password"
              placeholder="Masukkan kata sandi"
              class="pr-12 lg:pr-16"
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
          
          <p class="text-xs">*Ketik ulang kata sandi Anda</p>

          <p
            id="confirmation-password-error-message"
            class="error-message"
            v-if="errorMessages.confirmation_password"
          >
            {{ errorMessages.confirmation_password }}
          </p>
        </div>


        <!-- Nama Bank -->
        <div class="col-span-1 input-container relative">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Nama Bank <span class="text-red-500">*</span>
          </label>

          <div
            class="flex justify-between items-center w-full px-4 py-3 bg-[#e5e9f2] border border-gray-300 rounded-3xl cursor-pointer relative"
            @click="showBankOptions = !showBankOptions"
          >
            <span class="text-gray-700">{{ form.bank_name || 'Pilih nama bank' }}</span>
            <svg
              class="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <div
          v-if="showBankOptions"
          class="absolute z-10 left-0 right-0 top-full bg-white border border-gray-300 rounded-2xl shadow-lg max-h-60 overflow-y-auto"
          @click.stop
        >
            <div class="px-3 pt-3">
              <input
                type="text"
                v-model="searchBank"
                placeholder="Cari bank..."
                class="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 outline-none"
              />
            </div>

            <div
              v-for="bank in filteredBanks"
              :key="bank"
              @click="selectBank(bank)"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {{ bank }}
            </div>

            <div v-if="filteredBanks.length === 0" class="px-4 py-2 text-gray-400">
              Tidak ada hasil
            </div>
          </div>

          <p class="error-message" v-if="errorMessages.bank_name">
            {{ errorMessages.bank_name }}
          </p>
        </div>


        <!-- Nama Pemilik Akun Bank-->
        <div class="col-span-1 input-container">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Nama Pemilik Akun Bank <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            v-model="form.bank_account_name" 
            placeholder="Masukkan nama pemilik akun bank" 
          />

            <p
              class="error-message"
              v-if="errorMessages.bank_account_name"
            >
              {{ errorMessages.bank_account_name }}
            </p>
            
        </div>

        <!-- Nomor Rekening -->
        <div class="col-span-1 input-container">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Nomor Rekening <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            v-model="form.bank_account_number" 
            placeholder="Masukkan nomor rekening"
            @input="form.bank_account_number = $event.target.value.replace(/\D/g, '')"
            />

            <p
              class="error-message"
              v-if="errorMessages.bank_account_number"
            >
              {{ errorMessages.bank_account_number }}
            </p>
            
        </div>

        <!-- Tipe Donasi -->
         <div class="col-span-1 input-container">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Tipe Donasi <span class="text-red-500">*</span>
          </label>

          <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:pt-4">
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                id="dana"
                name="donation-type"
                v-model="form.donation_types"
                value="Dana"
              />
              <label for="Dana">Dana</label>
            </div>

            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                id=""
                name="donation-type"
                v-model="form.donation_types"
                value="Pangan"
              />
              <label for="makanan">Makanan</label>
            </div>

            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                id="barang"
                name="donation-type"
                v-model="form.donation_types"
                value="Barang"
              />
              <label for="barang">Barang</label>
            </div>

            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                id="tenaga"
                name="donation-type"
                v-model="form.donation_types"
                value="Tenaga"
              />
              <label for="tenaga">Tenaga</label>
            </div>
          </div>

          <p
            class="error-message"
            v-if="errorMessages.donation_types"
          >
            {{ errorMessages.donation_types }}
          </p>

        </div>

        <!-- Deskripsi Panti -->
        <div class="input-container mt-2">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Deskripsi Panti <span class="text-red-500">*</span>
          </label>

          <textarea
            name="description"
            id="description"
            rows="10"
            v-model="form.description"
            placeholder="Masukkan deskripsi panti asuhan" 
          ></textarea>

          <p v-if="errorMessages.description" class="error-message">
            {{ errorMessages.description }}
          </p>

        </div>

        <!-- Is Urgent -->
        <div class="col-span-1 input-container">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Darurat <span class="text-red-500">*</span>
          </label>

          <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:pt-4">
            <label class="flex items-center gap-2">
              <input 
                type="radio" 
                name="is_urgent" 
                value="1" 
                v-model="form.is_urgent" 
                class="w-4 h-4"
              />
              <span class="text-sm sm:text-base">Darurat</span>
            </label>

            <label class="flex items-center gap-2">
              <input 
                type="radio" 
                name="is_urgent" 
                value="0" 
                v-model="form.is_urgent" 
                class="w-4 h-4"
              />
              <span class="text-sm sm:text-base">Tidak Darurat</span>
            </label>
          </div>

          <p class="error-message text-red-500 text-sm mt-1" v-if="errorMessages.is_urgent">
            {{ errorMessages.is_urgent }}
          </p>
        </div>


        <!-- Upload Qris -->
         <div class="input-container mt-2">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Upload Gambar QRIS
          </label>

          <div class="flex items-center gap-3">
            <label 
              for="qris-upload" 
              class="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-200"
            >
              Pilih Gambar
            </label>
            <input 
              id="qris-upload"
              type="file" 
              accept="image/*" 
              @change="handleQrisFileUpload"
              class="hidden"
            />
          </div>

          <div v-if="previewImageQris" class="mt-2 relative w-40">
            <img :src="previewImageQris" alt="QRIS Preview" class="w-40 h-40 object-contain border rounded-lg shadow-md" />
            <button 
              type="button"
              @click="removeImageQris"
              class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 transition duration-200"
            >
              ✕
            </button>
          </div>

          <p v-if="errorMessages.qris" class="text-red-500 text-sm mt-1">
            {{ errorMessages.qris }}
          </p>
        </div>

        <!-- Upload Image Panti -->
         <div class="input-container mt-2">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Upload Gambar Panti <span class="text-red-500">*</span>
          </label>

          <div class="flex items-center gap-3">
            <label 
              for="image-upload" 
              class="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-200"
            >
              Pilih Gambar
            </label>
            <input 
              id="image-upload"
              type="file" 
              accept="image/*"
              multiple
              @change="handleMultipleFileUpload"
              class="hidden"
            />
          </div>

          <div v-if="form.image.length" class="mt-2 flex gap-3 flex-wrap">
            <div v-for="(img, index) in previewPantiImages" :key="index" class="relative w-40">
              <img 
                :src="img" 
                alt="Preview" 
                class="w-40 h-40 object-contain border rounded-lg shadow-md" />
              <button 
                type="button"
                @click="removeImagePanti(index)"
                class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 transition duration-200"
              >
                ✕
              </button>
            </div>
          </div>

          <p v-if="errorMessages.image" class="text-red-500 text-sm mt-1">
            {{ errorMessages.image }}
          </p>

        </div>

      </div>

      <div class="self-end px-4">
        <p class="text-sm text-red-500 sm:text-base lg:text-lg">*Wajib diisi</p>
      </div>

      <div class="self-end px-2 lg:px-4 flex gap-2">
        <!-- Tombol Kembali -->
        <button
          id="back"
          type="button"
          @click="goBack"
          class="btn-secondary"
        >
          Kembali
        </button>

        <!-- Tombol Tambah -->
        <button 
          id="submit" 
          type="submit" 
          class="btn-primary">
          Tambah
        </button>
      </div>

      <!-- loading overlay -->
      <div
        v-if="isLoading"
        class="fixed inset-0 m-auto z-[200] w-screen h-screen bg-black/50 flex justify-center items-center"
      >
        <div class="bg-white rounded-xl p-8">
          <LoadingIndicator text="Sedang memproses..." class="text-secondary-500" />
        </div>
      </div>

    </form>
  </section>
</template>


<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import { useAuthStore } from "@/stores/authStore";
import { createPanti } from "@/services/api-panti";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const fetching = ref(true);
const isLoading = ref(false);

const previewImageQris = ref("");
const previewPantiImages = ref([]);

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB dalam byte
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const REGEX_PHONE_NUMERIC = /^\d+$/;
const REGEX_BANK_ACCOUNT_NUMBER = /^\d+$/;
const REGEX_EMAIL = /^\S+@\S+\.\S+$/;

const confirmPassword = ref(null);
const showConfirmPassword = ref(false);

const password = ref(null);
const showPassword = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

const hasAccess = computed(() => {
  return authStore.user?.role === "ROLE_ADMIN";
});

const bankOptions = [
    "BCA", 
    "BNI", 
    "BRI", 
    "Mandiri", 
    "CIMB Niaga",
    "Danamon", 
    "Permata", 
    "Maybank", 
    "BTPN", 
    "Bank Mega", 
    "Bank Syariah Indonesia"
];

const showBankOptions = ref(false)
const searchBank = ref('')

const selectBank = (bank) => {
  form.bank_name = bank
  showBankOptions.value = false
}

const filteredBanks = computed(() =>
  bankOptions.filter(bank =>
    bank.toLowerCase().includes(searchBank.value.toLowerCase())
  )
)

const form = reactive({
  name: "",
  email: "",
  password: "",
  confirmation_password: "",
  image: [],
  description: "",
  phone: "",
  donation_types: [],
  is_urgent: "",
  address: "",
  region: "",
  bank_name: "",
  bank_account_number: "",
  bank_account_name: "",
  qris: null,
  maps: "",
});

const errorMessages = reactive({
  name: "",
  email: "",
  password: "",
  confirmation_password: "",
  image: "",
  description: "",
  phone: "",
  donation_types: "",
  is_urgent: "",
  address: "",
  region: "",
  bank_name: "",
  bank_account_number: "",
  bank_account_name: "",
  qris: "",
  maps: "",
});

const goBack = () => {
  router.push({ name: 'dashboard-admin' });
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
  // Reset error messages
  Object.keys(errorMessages).forEach((key) => {
    errorMessages[key] = "";
  });

  let isValid = true;

  // Name validation
  if (!form.name) {
    errorMessages.name = "Nama tidak boleh kosong";
    isValid = false;
  }

  // Email validation
  if (!form.email) {
    errorMessages.email = "Email tidak boleh kosong";
    isValid = false;
  } else if (!REGEX_EMAIL.test(form.email)) {
    errorMessages.email = "Format email tidak valid";
    isValid = false;
  }

  // Password validation
  if (!form.password) {
    errorMessages.password = "Kata Sandi tidak boleh kosong";
    isValid = false;
  } else if (
    form.password.length < 8 ||
    !/[A-Za-z]/.test(form.password) ||
    !/\d/.test(form.password)
  ) {
    errorMessages.password =
      "Kata Sandi harus memiliki minimal 8 karakter dan mengandung huruf dan angka";
    isValid = false;
  }

  // Confirmation Password validation
  if (!form.confirmation_password) {
    errorMessages.confirmation_password = "Konfirmasi password tidak boleh kosong";
    isValid = false;
  } else if (form.confirmation_password !== form.password) {
    errorMessages.confirmation_password = "Konfirmasi password tidak sesuai";
    isValid = false;
  }

  // Phone number validation
  if (!form.phone) {
    errorMessages.phone = "Nomor Whatsapp tidak boleh kosong";
    isValid = false;
  } else if (!REGEX_PHONE_NUMERIC.test(form.phone)) {
    errorMessages.phone =
      "Nomor Whatsapp hanya boleh mengandung angka";
    isValid = false;
  } else if (!form.phone.startsWith("8")) {
    errorMessages.phone = "Nomor Whatsapp harus diawali dengan 8";
    isValid = false;
  } else if (form.phone.length < 10 || form.phone.length > 13) {
    errorMessages.phone =
      "Nomor Whatsapp harus memiliki 10 hingga 13 digit";
    isValid = false;
  }

  // Address validation
  if (!form.address) {
    errorMessages.address = "Alamat tidak boleh kosong";
    isValid = false;
  }

  // Maps validation
  if (!form.maps) {
    errorMessages.maps = "Google maps tidak boleh kosong";
    isValid = false;
  }

  // Region validation
  if (!form.region) {
    errorMessages.region = "Wilayah tidak boleh kosong";
    isValid = false;
  }

  // Bank Name validation
  if (!form.bank_name) {
    errorMessages.bank_name = "Nama bank tidak boleh kosong";
    isValid = false;
  }

  // Bank Account Number validation
  if (!form.bank_account_number) {
    errorMessages.bank_account_number = "Nomor rekening tidak boleh kosong";
    isValid = false;
  } else if (!REGEX_BANK_ACCOUNT_NUMBER.test(form.bank_account_number)) {
    errorMessages.bank_account_number = "Nomor rekening harus berupa angka";
    isValid = false;
  }

  // Bank Account Name validation
  if (!form.bank_account_name) {
    errorMessages.bank_account_name = "Nama pemilik rekening tidak boleh kosong";
    isValid = false;
  }

  // description validation
  if (!form.description) {
    errorMessages.description = "Deskripsi tidak boleh kosong";
    isValid = false;
  }

  // Donation types validation
  if (!form.donation_types.length) {
    errorMessages.donation_types = "Tipe donasi tidak boleh kosong";
    isValid = false;
  }

  // Region validation
  if (!form.region) {
    errorMessages.region = "Region tidak boleh kosong";
    isValid = false;
  }

  // Is Urgent validation
  if (!form.is_urgent) {
    errorMessages.is_urgent = "Pilih Darurat atau Tidak Darurat";
    isValid = false;
  }

  // QRIS validation
  if (form.qris) {
    const file = form.qris;
    
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      errorMessages.qris = "Format file harus JPG, JPEG, atau PNG";
      isValid = false;
    } else if (file.size > MAX_FILE_SIZE) {
      errorMessages.qris = "Ukuran file maksimal 2MB";
      isValid = false;
    }
  }

  // Image validation
  if (form.image.length === 0) {
    errorMessages.image = "Harus mengupload minimal 1 gambar";
    isValid = false;
  }
  else {
    form.image.forEach((file, index) => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errorMessages.image = `Gambar ke-${index + 1} harus berformat JPG, JPEG, atau PNG`;
        isValid = false;
      } else if (file.size > MAX_FILE_SIZE) {
        errorMessages.image = `Gambar ke-${index + 1} melebihi batas ukuran 2MB`;
        isValid = false;
      }
    });
  }
    
  return isValid;
};


const handleMultipleFileUpload = (event) => {
  const files = Array.from(event.target.files); 
  if (files.length) {
    form.image.push(...files);
    previewPantiImages.value.push(...files.map(file => URL.createObjectURL(file)));
  }
};

const removeImagePanti = (index) => {
  form.image.splice(index, 1); 
  previewPantiImages.value.splice(index, 1); 
};

const handleQrisFileUpload = (event) => {
  const file = event.target.files[0];

  if (file) {
    form.qris = file;
    previewImageQris.value = URL.createObjectURL(file); 
  }
};

const removeImageQris = () => {
  form.qris = null;
  previewImageQris.value = ""; 
};

const submitForm = async () => {
  if (!validateForm()) return;

  try {
    const pantiData = {
      name: form.name,
      email: form.email,
      password: form.password,
      confrimation_password: form.confirmation_password,
      description: form.description,
      phone: form.phone,
      donation_types: [...form.donation_types],
      is_urgent: form.is_urgent,
      address: form.address,
      maps: form.maps,
      region: form.region,
      bank_name: form.bank_name,
      bank_account_number: form.bank_account_number,
      bank_account_name: form.bank_account_name,
    };

    if (form.qris instanceof File) {
      pantiData.qris = form.qris;
    }

    if (Array.isArray(form.image) && form.image.every(file => file instanceof File)) {
      pantiData.image = [...form.image]; 
    }

    isLoading.value = true;
    const response = await createPanti(pantiData);

    if (response.email === "Email sudah terdaftar") {
      errorMessages.email = response.email;
      isLoading.value = false;
    } else {
      isLoading.value = false;
      goBack();
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
