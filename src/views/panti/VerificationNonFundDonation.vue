<template>
  <section
    class="min-h-screen c-container flex flex-col gap-8 pb-8 pt-36 lg:gap-12 lg:pb-16 lg:pt-40 xl:gap-16 xl:pb-32 xl:pt-44 2xl:pt-48 bg-primary-50 text-secondary-500"
  >
    <LoadingIndicator
      v-if="fetching"
      text="Memuat data..."
      color="text-secondary-500"
    />
    <div v-else-if="!hasAccess" class="p-6">
      <h1 class="text-4xl font-bold text-center text-red-700">
        Kamu Tidak Memiliki Akses
      </h1>
    </div>

    <div
      v-if="!fetching && hasAccess"
      class="flex items-center justify-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8"
    >
      <h1
        class="text-2xl font-bold text-secondary-500 xl:text-3xl 2xl:text-4xl"
      >
        Verifikasi Donasi Non Dana
      </h1>
      <div class="h-0.5 flex-1 bg-secondary-500"></div>
    </div>

    <form
      v-if="!fetching && hasAccess"
      method="PUT"
      @submit.prevent="submitForm"
      class="flex flex-col items-center gap-6 rounded-md bg-white px-6 py-12 shadow-[0px_4.7451px_41.5196px_rgba(41,82,144,0.25)] sm:rounded-lg sm:px-8 sm:py-16 md:rounded-xl md:px-10 md:py-20 lg:rounded-2xl lg:px-12 lg:py-24 xl:rounded-3xl xl:px-14 xl:py-28 2xl:px-16 2xl:py-32"
    >
      <!-- Donatur Info -->
      <div class="flex flex-col md:flex-row gap-8 w-full justify-center mb-4">
        <div class="text-center">
          <span class="block text-blue-400 font-semibold text-base md:text-2xl">
            Donatur
          </span>
          <span class="block text-gray-800 text-lg md:text-2xl">
            {{ donation.donatur_name }}
          </span>
        </div>
        <div class="text-center">
          <span class="block text-blue-400 font-semibold text-base md:text-2xl">
            Kontak
          </span>
          <span class="block text-gray-800 text-lg md:text-2xl">
            {{ donation.active_phone }}
          </span>
        </div>
      </div>


      <!-- Tanggal Donasi -->
      <div class="col-span-1 input-container">
        <label class="text-base font-medium text-secondary-500">
          Tanggal Donasi <span class="text-red-500">*</span>
        </label>
        <input 
          type="date" 
          v-model="donation.donation_date"
          placeholder="Masukkan tanggal lahir"
          :min="new Date().toISOString().split('T')[0]"
        />

        <p
          class="error-message"
          v-if="errorMessages.donationDate"
        >
          {{ errorMessages.donationDate }}
        </p>

      </div>

      <!-- Metode Donasi -->
      <div class="input-container w-full">
        <label class="text-base font-medium text-secondary-500"
          >Metode Donasi <span class="text-red-500">*</span>
          </label
        >
        <div class="flex flex-col sm:flex-row gap-4">
          <label class="flex items-center gap-2">
            <input
              type="radio"
              id="onsite"
              name="donation-method"
              v-model="donation.is_onsite"
              value="1"
            />
            Onsite
          </label>
          <label class="flex items-center gap-2">
            <input
              type="radio"
              id="online"
              name="donation-method"
              v-model="donation.is_onsite"
              value="0"
            />
            Online (Kurir / Gosend, dll)
          </label>
        </div>
      </div>

      <!-- Tipe Donasi -->
      <div class="input-container w-full">
        <label class="text-base font-medium text-secondary-500"
          >Tipe Donasi</label
        >
        <div class="flex flex-wrap gap-2">
          <span
            v-for="type in donation.donation_types"
            :key="type"
            class="px-3 py-1 rounded text-sm"
            :class="{
              'bg-blue-200 text-blue-700': type === 'Barang',
              'bg-yellow-200 text-yellow-700': type === 'Tenaga',
              'bg-purple-200 text-purple-700': type === 'Pangan'
            }"
          >
            {{ type }}
          </span>
        </div>
      </div>

      <!-- Catatan Donatur -->
      <div class="input-container w-full">
        <label
          for="notes"
          class="text-base font-medium text-secondary-500"
        >
          Catatan Donatur <span class="text-red-500">*</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows="5"
          v-model="donation.notes"
          class="w-full border bg-gray-100 text-gray-700 px-4 py-2 rounded-xl"
        ></textarea>
        <p v-if="errorMessages.notes" class="error-message">
          {{ errorMessages.notes }}
        </p>
      </div>

      <!-- Status -->
      <div class="input-container w-full">
        <label class="text-base font-medium text-secondary-500">
          Status <span class="text-red-500">*</span>
        </label>
        <select
          v-model="donation.status"
          class="w-full border rounded-full px-4 py-2 appearance-none text-gray-700"
          :class="statusClass"
        >
          <option value="PENDING" class="bg-white text-black">PENDING</option>
          <option value="COMPLETED" class="bg-white text-black">COMPLETED</option>
          <option value="REJECTED" class="bg-white text-black">REJECTED</option>
        </select>
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
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchNonFundDonationByDonationId, verifyDonationNonDana } from '@/services/api-donation';
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const donationId = route.params.id;
const fetching = ref(true);
const isLoading = ref(false);

const donation = ref({
  donatur_name: "",
  donation_date: "",
  status: "PENDING",
  donation_types: [],
  notes: "",
  is_onsite: 0,
  pic: "",
  active_phone: "",
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
    const data = await fetchNonFundDonationByDonationId(donationId);

    if (data.forbidden) {
      hasAccess.value = false;
      return;
    }

    if (data) {
      donation.value = {
        donatur_name: data.donatur_name,
        donation_date: data.donation_date,
        status: data.status || "PENDING",
        donation_types: data.donation_types,
        is_onsite: data.is_onsite,
        notes: data.notes || "-",
        pic: data.pic,
        active_phone: data.active_phone,
      };
    }
  } catch (error) {
    console.error("Gagal mengambil data donasi:", error);
    if (error.response.status === 403) {
      hasAccess.value = false;
    }
  } finally {
    fetching.value = false;
  }
};

const errorMessages = ref({
  notes: "",
  donationDate: "",
});

const validateForm = () => {
  let isValid = true;
  errorMessages.value.notes = "";

  if (!donation.value.donation_date) {
    errorMessages.value.donationDate = "Tanggal donasi tidak boleh kosong";
    isValid = false;
  }
  if (!donation.value.notes.trim()) {
    errorMessages.value.notes = "Catatan tidak boleh kosong";
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  try {
    const verifyDonation = {
      donationDate: donation.value.donation_date,
      isOnsite: donation.value.is_onsite,
      donationTypes: donation.value.donation_types,
      pic: donation.value.pic,
      status: donation.value.status,
      activePhone: donation.value.active_phone.slice(3),
      notes: donation.value.notes,
    };

    isLoading.value = true;
    const response = await verifyDonationNonDana(donationId, verifyDonation);

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
