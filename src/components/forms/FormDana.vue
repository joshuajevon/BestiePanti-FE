<template>
  <section
    v-show="isFormDanaOpen"
    class="c-container fixed z-[100] h-screen w-screen bg-black/80 py-8"
  >
    <!-- Loading Overlay -->
    <div
      v-if="isSubmitting"
      class="absolute inset-0 m-auto z-[200] w-screen h-screen bg-black/50 flex justify-center items-center"
    >
      <div class="bg-white rounded-xl p-8">
        <LoadingIndicator
          text="Mengirim donasi..."
          class="text-secondary-500"
        />
      </div>
    </div>

    <form
      method="POST"
      class="flex h-full w-full items-center justify-center"
      @submit.prevent="submitForm"
    >
      <div
        class="h-full flex w-full max-w-screen-xl flex-col gap-8 rounded-xl bg-white p-8 sm:rounded-2xl sm:p-12 lg:rounded-3xl lg:p-16 overflow-scroll"
      >
        <!-- Title -->
        <div
          class="flex w-full flex-col items-center justify-center gap-2 border-b-2 border-b-secondary-500 px-4 pb-5 sm:gap-3 lg:gap-4"
        >
          <h1
            class="pb-2 text-center text-4xl font-medium leading-9 sm:text-5xl lg:text-6xl"
          >
            Formulir
            <span class="font-bold text-primary-300">Donasi Dana</span>
          </h1>
          <p class="text-center text-base sm:text-lg">
            Silakan isi formulir berikut untuk melakukan donasi dana.
            <span class="font-bold"
              >Pastikan semua informasi yang Anda masukkan akurat</span
            >
            agar proses donasi dapat berjalan dengan lancar.
          </p>
        </div>

        <div class="flex w-full flex-col items-start justify-center gap-6">
          <!-- QRIS Image -->
          <div class="flex justify-center items-center w-full">
            <img
              class="h-96 w-auto"
              :src="`${apiUrl}/storage/qris/${qris}`"
              :alt="`${pantiName}'s qris image`"
            />
          </div>

          <!-- Account Details -->
          <div
            class="flex flex-col justify-center items-center font-bold text-center w-full"
          >
              <h1>{{ bankName || "" }}</h1>
              <p>{{ bankAccountNumber || "" }}</p>
              <p>A/n {{ bankAccountName || "" }}</p>
          </div>

          <!-- Account Number -->
          <div class="input-container mt-2">
            <label
              for="account_number"
              class="text-base font-medium text-secondary-500 sm:text-lg"
            >
              Nomor Rekening
            </label>

            <input
              type="text"
              id="account_number"
              name="account_number"
              placeholder="Masukkan nomor rekening Anda"
              v-model="donationData.accountNumber"
            />

            <p
              v-if="errorMessages.accountNumber"
              id="account-number-error-message"
              class="error-message"
            >
              {{ errorMessages.accountNumber }}
            </p>
          </div>

          <!-- Account Name -->
          <div class="input-container mt-2">
            <label
              for="account_name"
              class="text-base font-medium text-secondary-500 sm:text-lg"
            >
              Nama Rekening
            </label>

            <input
              type="text"
              id="account_name"
              name="account_name"
              placeholder="Masukkan nama rekening Anda"
              v-model="donationData.accountName"
            />

            <p
              v-if="errorMessages.accountName"
              id="account-name-error-message"
              class="error-message"
            >
              {{ errorMessages.accountName }}
            </p>
          </div>

          <!-- Jumlah Transfer -->
          <div class="input-container mt-2">
            <label
              for="transferAmount"
              class="text-base font-medium text-secondary-500 sm:text-lg"
            >
              Jumlah Transfer
            </label>

            <input
              type="number"
              id="transferAmount"
              name="transferAmount"
              placeholder="Masukkan jumlah transfer Anda"
              v-model="donationData.nominalAmount"
            />

            <p
              v-if="errorMessages.nominalAmount"
              id="transfer-amount-error-message"
              class="error-message"
            >
              {{ errorMessages.nominalAmount }}
            </p>
          </div>

          <!-- Proof of payment -->
          <div class="input-container mt-2">
            <label
              for="proof_of_payment"
              class="text-base font-medium text-secondary-500 sm:text-lg"
            >
              Bukti Transfer
            </label>
            
            <div class="flex items-center justify-center w-full">
              <label
                for="proof_of_payment"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-3xl cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-secondary-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p v-if="fileName" class="mb-2 mx-2 text-center text-sm font-semibold text-green-500">
                    File terpilih: {{ fileName }}
                  </p>
                  <p v-else class="mb-2 text-sm text-secondary-500">
                    <span class="font-semibold">Klik untuk mengunggah</span>
                  </p>
                  <p class="text-xs text-red-500">Maksimum 2 MB</p>
                  <p class="text-xs text-red-500">JPEG, PNG, JPG</p>
                </div>
                <input
                  type="file"
                  id="proof_of_payment"
                  name="proof_of_payment"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileUpload"
                />
              </label>
            </div> 

            <p
              v-if="errorMessages.image"
              id="proof-of-payment-error-message"
              class="error-message"
            >
              {{ errorMessages.image }}
            </p>
          </div>
        </div>

        <div class="flex items-center justify-center gap-4">
          <button class="btn-secondary" type="button" @click="closeFormDana">
            Tutup
          </button>
          <button class="btn-primary" type="submit">Kirim</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { createDonationDana } from "@/services/api-donation";
import { reactive, ref } from "vue";
import LoadingIndicator from "../loading/LoadingIndicator.vue";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const apiUrl = import.meta.env.VITE_API_URL;

const props = defineProps({
  isFormDanaOpen: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  qris: {
    type: String,
    required: true,
  },
  pantiName: {
    type: String,
    required: true,
  },
  bankAccountName: {
    type: String,
    required: true,
  },
  bankAccountNumber: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["closeFormDana", "success"]);

const donationData = reactive({
  image: null,
  accountNumber: "",
  accountName: "",
  nominalAmount: "",
});

const errorMessages = reactive({
  image: "",
  accountNumber: "",
  accountName: "",
  nominalAmount: "",
});

const isSubmitting = ref(false);

const fileInput = ref(null);
const fileName = ref("");

const handleFileUpload = (event) => {
  const file = event.target.files[0];

  if (!file) {
    fileName.value = ""; 
    return;
  }

  if (file) {
    fileName.value = file.name;
    donationData.image = file;
  }
};

const validateForm = () => {
  Object.keys(errorMessages).forEach((key) => {
    errorMessages[key] = "";
  });

  let isValid = true;

  if (!donationData.accountNumber.trim()) {
    errorMessages.accountNumber = "Nomor Rekening tidak boleh kosong";
    isValid = false;
  }

  if (!donationData.accountName.trim()) {
    errorMessages.accountName = "Nama Rekening tidak boleh kosong";
    isValid = false;
  }

  if (!String(donationData.nominalAmount).trim()) {
    errorMessages.nominalAmount = "Jumlah Transfer tidak boleh kosong";
    isValid = false;
  } else if (donationData.nominalAmount === 0) {
    errorMessages.nominalAmount = "Jumlah Transfer tidak boleh 0";
    isValid = false;
  }

  if (!donationData.image) {
    errorMessages.image = "Bukti Transfer tidak boleh kosong";
    isValid = false;
  }

  if (!donationData.image) {
    errorMessages.image = "Bukti Transfer tidak boleh kosong";
    isValid = false;
  } else if (donationData.image.size > MAX_FILE_SIZE) {
    errorMessages.image = "Ukuran file terlalu besar. Maksimum 2MB.";
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  donationData.nominalAmount = String(donationData.nominalAmount);

  isSubmitting.value = true;

  try {
    const response = await createDonationDana(props.id, donationData);

    if (response.message && !response.id) {
      errorMessages.message = response.message;
      return;
    }

    Object.keys(donationData).forEach((key) => (donationData[key] = ""));
    Object.keys(errorMessages).forEach((key) => (errorMessages[key] = ""));

    if (fileInput.value) {
      fileInput.value.value = "";
    }

    emit("success");
    closeFormDana();
  } catch (error) {
    console.error("Error sending donation:", error);
    errorMessages.message = "Terjadi kesalahan. Silakan coba lagi.";
  } finally {
    isSubmitting.value = false;
  }
};

const closeFormDana = () => {
  emit("closeFormDana");
};
</script>

<style scoped></style>
