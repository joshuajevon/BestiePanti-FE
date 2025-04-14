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

    <div v-if="!fetching" 
      class="flex items-center justify-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8">
      <h1 class="text-2xl font-bold text-secondary-500 xl:text-3xl 2xl:text-4xl">
        Ubah Profile Panti
      </h1>
      <div class="h-0.5 flex-1 bg-secondary-500"></div>
    </div>

    <!-- Form -->
    <form
      v-if="!fetching"
      method="PUT"
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

        <!-- Tipe Donasi -->
         <div class="col-span-1 input-container">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Tipe Donasi <span class="text-red-500">*</span>
          </label>

          <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
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
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-4">
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

          <p v-if="errorMessages.phone" class="text-red-500 text-sm">
            {{ errorMessages.phone }}
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

        </div>

        <!-- Panti Image Exist -->
        <div class="input-container mt-2">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Gambar Panti Saat Ini
          </label>

          <!-- <div class="flex items-center gap-3 mt-2">
            <button 
              type="button"
              @click="resetImagePantiExist"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-200"
            >
              Reset Gambar
            </button>
          </div> -->

          <div v-if="previewPantiExistImages.length" class="mt-2 flex gap-3 flex-wrap">
            <div 
              v-for="(img, index) in previewPantiExistImages" 
              :key="index" 
              class="relative w-40"
            >
              <img 
                :src="img" 
                alt="Preview" 
                class="w-40 h-40 object-contain border rounded-lg shadow-md"
              />
              <button 
                type="button"
                @click="removeImagePantiExist(index)"
                class="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 transition duration-200"
              >
                ✕
              </button>
            </div>
          </div>

        </div>

        <!-- Upload Image Panti -->
         <div class="input-container mt-2">
          <label class="text-base font-medium text-secondary-500 sm:text-lg">
            Upload Gambar Panti
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
          Ubah
        </button>
      </div>

    </form>
  </section>
</template>


<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import { useAuthStore } from "@/stores/authStore";
import { updatePantiProfile, deleteExistingImages, deleteQris } from "@/services/api-panti";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";

const authStore = useAuthStore();
const fetching = ref(true);
const apiUrl = import.meta.env.VITE_API_URL;

//qris
const previewImageQris = ref("");
const qrisOriginal = ref("");  // Nama file QRIS asli dari backend
const qrisRemoved = ref(false); // Flag kalau user klik hapus

// image panti exist
const previewPantiExistImages = ref([]);
const removedPantiExistImages = ref([]);
const originalPreviewImageList = ref([]);   


const previewPantiImages = ref([]);

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB dalam byte
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const REGEX_PHONE_NUMERIC = /^\d+$/;
const REGEX_BANK_ACCOUNT_NUMBER = /^\d+$/;

const hasAccess = computed(() => {
  return authStore.user?.role === "ROLE_PANTI";
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
  image: [],
  existing_image: [],
  prev_images: [],
  description: "",
  phone: "",
  donation_types: [],
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
  image: "",
  description: "",
  phone: "",
  donation_types: "",
  address: "",
  region: "",
  bank_name: "",
  bank_account_number: "",
  bank_account_name: "",
  qris: "",
  maps: "",
});

const goBack = () => {
  window.history.back();
};

const fetchUserData = async () => {
  try {
    await authStore.fetchUser();

    if (authStore.user) {
      form.name = authStore.user.name,
      form.description = authStore.user.description,
      form.phone = authStore.user.phone.slice(3),
      form.donation_types =  authStore.user.donation_types,
      form.address = authStore.user.address,
      form.maps = authStore.user.maps,
      form.region = authStore.user.region,
      form.bank_name = authStore.user.bank_name,
      form.bank_account_number = authStore.user.bank_account_number,
      form.bank_account_name = authStore.user.bank_account_name,

      //fetch panti image exist
      form.prev_images = authStore.user.image,
      form.existing_image = authStore.user.image,
      originalPreviewImageList.value = form.existing_image.map(
      img => `${apiUrl}/storage/image/${img}`
      );
      previewPantiExistImages.value = originalPreviewImageList.value.map(
        image => image
      );
      removedPantiExistImages.value = []; 

      //fetch qris
      qrisOriginal.value = authStore.user.qris,
      previewImageQris.value = `${apiUrl}/storage/qris/${authStore.user.qris}`
    }
      
      

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
  if (form.image.length) {
    form.image.forEach((file, index) => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errorMessages.image = `Gambar ke-${index + 1} harus berformat JPG, JPEG, atau PNG`;
        isValid = false;
      } else if (file.size > MAX_FILE_SIZE) {
        errorMessages.image = `Gambar ke-${index + 1} melebihi batas ukuran 2MB`;
        isValid = false;
      }
    });
  } else if (form.existing_image.length === 0 && form.image.length === 0) {
    errorMessages.image = "Gambar panti tidak boleh kosong";
    isValid = false;
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
    qrisRemoved.value = false; // Reset flag hapus jika upload baru
  }
};

const removeImageQris = () => {
  form.qris = null;
  previewImageQris.value = "";
  qrisRemoved.value = true;
};

const removeImagePantiExist = (index) => {
  const removedFileName = form.existing_image[index];
  removedPantiExistImages.value.push(removedFileName);
  previewPantiExistImages.value.splice(index, 1);
  form.existing_image.splice(index, 1); // Hapus dari form.existing_image
};

const resetImagePantiExist = () => {
  previewPantiExistImages.value = originalPreviewImageList.value.map(
    image => image
  );
  removedPantiExistImages.value = [];
  form.existing_image = form.prev_images; // Reset form.existing_image
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

    // else if (qrisRemoved.value) {
    //   deleteQris(useAuthStore.user?.id); // case: hapus qris
    // } 

    if (Array.isArray(form.image) && form.image.every(file => file instanceof File)) {
      pantiData.image = [...form.image]; 
    }

    if (removedPantiExistImages.value.length > 0 && authStore.user?.id) {
      await deleteExistingImages(authStore.user.id, removedPantiExistImages.value);
    }
    
    
    const response = await updatePantiProfile(pantiData);
    if (!response.message) {
      goBack();
    } else {
      console.log("Gagal memperbarui profile. Silakan coba lagi.");
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
