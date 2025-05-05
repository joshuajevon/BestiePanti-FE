<template>
  <section
    class="min-h-screen c-container flex flex-col gap-8 pb-8 pt-36 lg:gap-12 lg:pb-16 lg:pt-40 xl:gap-16 xl:pb-32 xl:pt-44 2xl:pt-48 bg-primary-50 text-secondary-500"
  >
    <!-- Loading -->
    <LoadingIndicator
      v-if="fetching"
      text="Memuat data..."
      color="text-secondary-500"
    />

    <!-- No Access -->
    <div v-else-if="!hasAccess" class="p-6">
      <h1 class="text-4xl font-bold text-center text-red-700 justify-center">
        Kamu Tidak Memiliki Akses
      </h1>
    </div>

    <!-- Title -->
    <div v-if="!fetching && hasAccess" class="flex items-center justify-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8">
      <h1 class="text-2xl font-bold text-secondary-500 xl:text-3xl 2xl:text-4xl">
        Verifikasi Donasi Dana
      </h1>
      <div class="h-0.5 flex-1 bg-secondary-500"></div>
    </div>

    <!-- Form -->
    <form
      v-if="!fetching && hasAccess"
      method="PUT"
      @submit.prevent="submitForm"
      class="flex flex-col items-center gap-6 rounded-md bg-white px-6 py-12 shadow-[0px_4.7451px_41.5196px_rgba(41,82,144,0.25)] sm:rounded-lg sm:px-8 sm:py-16 md:rounded-xl md:px-10 md:py-20 lg:rounded-2xl lg:px-12 lg:py-24 xl:rounded-3xl xl:px-14 xl:py-28 2xl:px-16 2xl:py-32"
    >
      <!-- Image -->
      <div class="flex justify-center">
        <img
          :src="`${apiUrl}/storage/donation/${donation.image}`"
          alt="Gambar Donasi"
          class="h-80 w-auto max-w-full rounded-lg object-contain shadow"
        />
      </div>

      <!-- Donatur Info -->
      <div class="text-center font-bold text-secondary-500">
        <h2 class="text-lg">Dari: {{ donation.donatur_name }}</h2>
        <p>Rekening: {{ donation.account_number }}</p>
        <p>A/n {{ donation.account_name }}</p>
      </div>

      <!-- Form Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <!-- Tanggal Donasi -->
        <div class="input-container">
          <label class="text-base font-medium text-secondary-500">
            Tanggal Donasi
          </label>
          <div class="text-lg text-gray-700">
            {{ formatDate(donation.donation_date) }}
          </div>
        </div>

        <!-- Jumlah Transfer -->
        <div class="input-container md:col-span-2">
          <label class="text-base font-medium text-secondary-500">
            Jumlah Transfer <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div
              class="absolute left-5 sm:left-6 top-0 bottom-0 my-auto h-fit text-sm sm:text-base text-gray-500"
            >
              <p>Rp</p>
            </div>
            <input
              type="text"
              v-model="donation.nominal_amount"
              placeholder="Masukkan jumlah transfer"
              class="w-full pl-12 sm:pl-14 border rounded-full px-3 py-2"
              inputmode="numeric"
              @input="donation.nominal_amount = $event.target.value.replace(/\D/g, '')"
            />
          </div>
          <p v-if="errorMessages.nominalAmount" class="text-red-500 text-sm">
            {{ errorMessages.nominalAmount }}
          </p>
        </div>

        <!-- Status -->
        <div class="input-container md:col-span-2">
          <label class="text-base font-medium text-secondary-500">
            Status <span class="text-red-500">*</span>
          </label>
          <select
            v-model="donation.status"
            class="w-full border rounded-full px-3 py-2 appearance-none text-gray-700"
            :class="statusClass"
          >
            <option value="PENDING" class="bg-white text-black">PENDING</option>
            <option value="COMPLETED" class="bg-white text-black">COMPLETED</option>
            <option value="REJECTED" class="bg-white text-black">REJECTED</option>
          </select>
        </div>
      </div>

      <div class="self-end px-4 mt-4">
        <p class="text-sm text-red-500 sm:text-base lg:text-lg">*Wajib diisi</p>
      </div>

      <!-- Buttons -->
      <div class="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between items-end gap-3 px-4">
        <div class="flex gap-2 ml-auto">
          <button type="button" class="btn-secondary" @click="goBack">
            Batal
          </button>
          <button type="submit" class="btn-primary">
            Kirim
          </button>
        </div>
      </div>

      <!-- Loading Overlay -->
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
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchFundDonationByDonationId, verifyDonationDana } from '@/services/api-donation';
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import { formatDate } from "@/utils/date";
import { useRouter } from 'vue-router';

const router = useRouter();

const route = useRoute();
const donationId = route.params.id;
const apiUrl = import.meta.env.VITE_API_URL;
const fetching = ref(true);
const isLoading = ref(false);

const donation = ref({
  donatur_name: "",
  donation_date: "",
  status: "PENDING",
  account_name: "",
  account_number: "",
  nominal_amount: 0,
  image: "",
});

const hasAccess = ref(true);

const statusClass = computed(() => {
  return donation.value.status === "PENDING"
    ? "bg-yellow-100 text-yellow-700 border-yellow-500"
    : donation.value.status === "COMPLETED"
    ? "bg-green-100 text-green-700 border-green-500"
    : "bg-red-100 text-red-700 border-red-500";
});

const goBack = () => {
  router.push({ name: 'dashboard-panti' });
};

const fetchDonationData = async () => {
  try {
    const data = await fetchFundDonationByDonationId(donationId);

    if (data.forbidden) {
      hasAccess.value = false;
      return;
    }

    if (data) {
      donation.value = {
        donatur_name: data.donatur_name,
        donation_date: data.donation_date,
        status: data.status || "PENDING",
        account_name: data.account_name,
        account_number: data.account_number,
        nominal_amount: data.nominal_amount,
        image: data.image,
      };
      hasAccess.value = true;
    }
  } catch (error) {
    console.error("Gagal mengambil data donasi:", error);
    if (error.response && error.response.status === 403) {
      hasAccess.value = false;
    }
  } finally {
    fetching.value = false;
  }
};

const errorMessages = ref({
  nominalAmount: "",
});

const validateForm = () => {
  let isValid = true;
  errorMessages.value.nominalAmount = "";

  if (!String(donation.value.nominal_amount).trim()) {
    errorMessages.value.nominalAmount = "Jumlah Transfer tidak boleh kosong";
    isValid = false;
  } else if (donation.value.nominal_amount === 0) {
    errorMessages.value.nominalAmount = "Jumlah Transfer tidak boleh 0";
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  try {
    const verifyDonation = {
      accountNumber: donation.value.account_number,
      accountName: donation.value.account_name,
      nominalAmount: String(donation.value.nominal_amount),
      status: donation.value.status,
    };

    isLoading.value = true;
    const response = await verifyDonationDana(donationId, verifyDonation);

    if (!response.message) {
      isLoading.value = false;
      goBack();
    } 
    else {
      alert(`Gagal: ${response.message || "Terjadi kesalahan."}`);
    }
  } catch (error) {
    console.error("Error saat verifikasi:", error);
  }
};

onMounted(() => {
  fetchDonationData();
});
</script>

<style scoped>
.bg-primary-500 {
  background-color: #3182ce;
}
.text-primary-500 {
  color: #3182ce;
}
</style>
