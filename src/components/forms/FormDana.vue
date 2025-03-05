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
            <div class="w-64 h-96 bg-black"></div>
            <!-- <img src="" alt="" /> -->
          </div>

          <!-- Account Details -->
          <div
            class="flex flex-col justify-center items-center font-bold text-center w-full"
          >
            <h1>BCA</h1>
            <p>1234123400</p>
            <p>A/n Christopher Nathanael Tessy</p>
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

          <!-- Donation Amount -->
          <div class="input-container mt-2">
            <label
              for="donation_amount"
              class="text-base font-medium text-secondary-500 sm:text-lg"
            >
              Nominal Donasi
            </label>

            <input
              type="number"
              id="donation_amount"
              name="donation_amount"
              placeholder="Masukkan nominal donasi Anda"
              v-model="donationData.donationAmount"
            />

            <p
              v-if="errorMessages.donationAmount"
              id="donation-amount-error-message"
              class="error-message"
            >
              {{ errorMessages.donationAmount }}
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

            <input
              type="file"
              id="proof_of_payment"
              name="proof_of_payment"
              placeholder="Masukkan bukti transfer Anda"
              accept="image/*"
              @change="handleFileUpload"
            />

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

const props = defineProps({
  isFormDanaOpen: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["closeFormDana", "success"]);

const donationData = reactive({
  donationDate: Date(),
  isOnsite: 0,
  donationType: "Dana",
  accountNumber: "",
  accountName: "",
  donationAmount: "",
  image: null,
});

const errorMessages = reactive({
  accountNumber: "",
  accountName: "",
  donationAmount: "",
  image: "",
});

const isSubmitting = ref(false);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    donationData.image = file;
  }
};

const validateForm = () => {
  Object.keys(errorMessages).forEach((key) => {
    errorMessages[key] = "";
  });

  let isValid = true;

  if (!donationData.accountNumber) {
    errorMessages.accountNumber = "Nomor Rekening tidak boleh kosong";
    isValid = false;
  }

  if (!donationData.accountName) {
    errorMessages.accountName = "Nama Rekening tidak boleh kosong";
    isValid = false;
  }

  if (!donationData.donationAmount) {
    errorMessages.donationAmount = "Nominal Donasi tidak boleh kosong";
    isValid = false;
  }

  if (!donationData.image) {
    errorMessages.image = "Bukti Transfer tidak boleh kosong";
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    const response = await createDonationDana(props.id, donationData);

    if (response.message && !response.id) {
      errorMessages.message = response.message;
      return;
    }

    Object.keys(errorMessages).forEach((key) => {
      errorMessages[key] = "";
    });

    Object.keys(donationData).forEach((key) => {
      donationData[key] = "";
    });

    emit("success"); // Emit success event
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
