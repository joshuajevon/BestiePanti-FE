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
        Ubah Profile
      </h1>
      <div class="h-0.5 flex-1 bg-secondary-500"></div>
    </div>
    <!-- Form -->
    <form
      v-if="!fetching && hasAccess" 
      method="PUT"
      class="flex flex-col items-center gap-6 rounded-md bg-white px-6 py-12 shadow-[0px_4.7451px_41.5196px_rgba(41,82,144,0.25)] sm:rounded-lg sm:px-8 sm:py-16 md:rounded-xl md:px-10 md:py-20 lg:rounded-2xl lg:px-12 lg:py-24 xl:rounded-3xl xl:px-14 xl:py-28 2xl:px-16 2xl:py-32"
      @submit.prevent="submitForm"
    >
      <!-- Profile -->
      <div class="flex flex-col items-center">
        <div class="relative">
          <img
            :src="previewImage || `${apiUrl}/storage/profile/${authStore.user.profile}`"
            alt="Profile Picture"
            class="w-40 h-40 rounded-full object-cover border-2 border-gray-300 bg-white p-2 shadow"
          />
          <label class="absolute bottom-2 right-2 flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600">
            <input 
              type="file" 
              class="hidden" 
              accept="image/jpeg, image/png, image/jpg"
              @change="handleFileUpload" 
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-6 w-6" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </label>
        </div>
        <p class="mt-2 text-gray-500 text-sm">
          Upload foto profil
        </p>

         <p
          class="error-message"
          v-if="errorMessages.profile"
        >
          {{ errorMessages.profile }}
        </p>
        
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <!-- Nama Lengkap -->
        <div class="col-span-1 input-container">
          <label class="text-base font-medium text-secondary-500">
            Nama Lengkap <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            v-model="form.name" 
            placeholder="Masukkan nama lengkap" 
          />

          <p
            class="error-message"
            v-if="errorMessages.name"
          >
            {{ errorMessages.name }}
          </p>

        </div>

        <!-- Jenis Kelamin -->
        <div class="col-span-1 input-container">
          <label class="text-base font-medium text-secondary-500">
            Jenis Kelamin <span class="text-red-500">*</span>
          </label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2">
              <input 
                type="radio" 
                name="gender" 
                value="L" 
                v-model="form.gender" 
              />
              Laki-laki
            </label>
            <label class="flex items-center gap-2">
              <input 
                type="radio" 
                name="gender" 
                value="P" 
                v-model="form.gender" 
              />
              Perempuan
            </label>
          </div>
          <p
            class="error-message"
            v-if="errorMessages.gender"
          >
            {{ errorMessages.gender }}
          </p>
        </div>

        <!-- Tanggal Lahir -->
        <div class="col-span-1 input-container">
          <label class="text-base font-medium text-secondary-500">
            Tanggal Lahir <span class="text-red-500">*</span>
          </label>
          <input 
            type="date" 
            v-model="form.dob"
            placeholder="Masukkan tanggal lahir"
            :max="new Date().toISOString().split('T')[0]"
          />

          <p
            class="error-message"
            v-if="errorMessages.dob"
          >
            {{ errorMessages.dob }}
          </p>

        </div>

        <!-- Nomor Whatsapp -->
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

          <p v-if="errorMessages.phone" class="text-red-500 text-sm">
            {{ errorMessages.phone }}
          </p>
        </div>

        <!-- Alamat -->
        <div class="col-span-1 md:col-span-2 input-container">
          <label class="text-base font-medium text-secondary-500">
            Alamat <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            v-model="form.address" 
            placeholder="Masukkan alamat" 
          />

          <p
            class="error-message"
            v-if="errorMessages.address"
          >
            {{ errorMessages.address }}
          </p>

        </div>
      </div>

      <div class="self-end px-4">
        <p class="text-sm text-red-500 sm:text-base lg:text-lg">*Wajib diisi</p>
      </div>
      

      <div class="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between items-end gap-3 px-4">
        <!-- Link -->
        <router-link
          v-if="!isGoogleLogin"
          class="font-bold hover:underline text-primary-500 mb-2 sm:mb-0"
          :to="{ name: 'ubahPassword' }"
        >
          Ubah Password
        </router-link>

        <!-- Tombol-tombol -->
        <div
          :class="[
            'flex gap-2',
            isGoogleLogin ? 'ml-auto' : ''
          ]"
        >
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
import { updateProileDonaturByUser } from "@/services/api-donatur";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const fetching = ref(true);
const isLoading = ref(false);
const apiUrl = import.meta.env.VITE_API_URL;

const previewImage = ref("");
const selectedFile = ref(null);

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB dalam byte
const REGEX_PHONE_NUMERIC = /^\d+$/;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const isGoogleLogin = computed(() => {
  return authStore.user.is_google === "1";
});

const hasAccess = computed(() => {
  return authStore.user?.role === "ROLE_DONATUR";
});

const form = reactive({
  name: "",
  email: "",
  phone: "",
  dob: "",
  address: "",
  gender: "",
  profile: "",
});

const errorMessages = reactive({
  name: "",
  phone: "",
  dob: "",
  address: "",
  profile: "",
});

const goBack = () => {
  router.push({ name: 'donasi-saya' });
};

const fetchUserData = async () => {
  try {
    await authStore.fetchUser();

    console.log("google:", authStore.user.is_google);

    if (authStore.user) {
      form.name = authStore.user.name;
      form.email = authStore.user.email;
      form.phone = authStore.user.phone.slice(3);
      form.dob = authStore.user.dob;
      form.address = authStore.user.address;
      form.gender = authStore.user.gender;
      form.profile = authStore.user.profile;
    }
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

  // Name validation
  if (!form.name) {
    errorMessages.name = "Nama tidak boleh kosong";
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

  // Date of birth validation
  if (!form.dob) {
    errorMessages.dob = "Tanggal Lahir tidak boleh kosong";
    isValid = false;
  }

  // Address validation
  if (!form.address) {
    errorMessages.address = "Alamat tidak boleh kosong";
    isValid = false;
  }

  // Gender validation
  if (!form.gender) {
    errorMessages.gender = "Jenis kelamin tidak boleh kosong";
    isValid = false;
  }

  if (!form.dob) {
    authStore.errorMessages.dob = "Tanggal Lahir tidak boleh kosong";
    isValid = false;
  }

  // update profile (Optional)
  if (selectedFile.value) {
    const file = selectedFile.value;
    
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      errorMessages.profile = "Format file harus JPG, JPEG, atau PNG";
      isValid = false;
    } else if (file.size > MAX_FILE_SIZE) {
      errorMessages.profile = "Ukuran file maksimal 2MB";
      isValid = false;
    }
  }

  return isValid;
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];

  if (file) {
    selectedFile.value = file;
    previewImage.value = URL.createObjectURL(file); 
  }
};

const submitForm = async () => {
  if (!validateForm()) return;

  try {
    const donaturData = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      gender: form.gender,
      dob: form.dob,
      address: form.address
    };

    if (selectedFile.value instanceof File) {
      donaturData.profile = selectedFile.value;
    }

    isLoading.value = true;
    const response = await updateProileDonaturByUser(donaturData);

    if (!response.message) {
      isLoading.value = false;
      goBack();
    } else {
      alert(`Gagal: ${response.message || "Terjadi kesalahan."}`);
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
