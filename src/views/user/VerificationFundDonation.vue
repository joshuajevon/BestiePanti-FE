<template>
  <section class="min-h-screen pt-36 bg-gray-100">
    <LoadingIndicator v-if="fetching" 
      text="Memuat data..." 
      color="text-secondary-500" 
    />

    <div v-else-if="!hasAccess" class="p-6">
      <h1 class="text-4xl font-bold text-center text-red-700">
        Kamu Tidak Memiliki Akses
      </h1>
    </div>

    <div v-else class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div class="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
        <div>
          <div class="text-center border-b pb-4">
            <h1 class="text-3xl font-semibold text-primary-500">Verifikasi Donasi Dana</h1>
            <p class="text-gray-600 text-sm mt-2">
              Pastikan donasi dana anda telah sesuai.
            </p>
          </div>

          <div class="mt-6">
            <div class="flex justify-center mb-6">
              <img 
                alt="Gambar Donasi"
                :src="`${apiUrl}/storage/donation/${donation.image}`" 
                class="h-40 w-40 rounded-lg"
              />
            </div>
            
            <div class="text-center font-bold mb-6">
              <h2 class="text-lg">Dari: {{ donation.donatur_name }}</h2>
              <p>Rekening: {{ donation.account_number }}</p>
              <p>A/n {{ donation.account_name }}</p>
            </div>

            <form @submit.prevent="submitForm" class="space-y-4">
              <p class="text-gray-600 text-sm">Tanggal Donasi: {{ formatDate(donation.donation_date) }}</p>
              <div>
                <label class="block text-gray-700">Jumlah Transfer</label>
                <input 
                  type="number" 
                  v-model="donation.nominal_amount" 
                  placeholder="Verifikasi jumlah transfer" 
                  class="w-full border rounded px-3 py-2" 
                />
                <p v-if="errorMessages.nominalAmount" class="text-red-500 text-sm">
                  {{ errorMessages.nominalAmount }}
                </p>
              </div>
              <div>
                <label class="block text-gray-700">Status</label>
                <select v-model="donation.status" class="w-full border rounded px-3 py-2 appearance-none text-gray-700" :class="statusClass">
                  <option value="PENDING" class="bg-white text-black">PENDING</option>
                  <option value="COMPLETED" class="bg-white text-black">COMPLETED</option>
                  <option value="REJECTED" class="bg-white text-black">REJECTED</option>
                </select>
              </div>

              <div class="flex justify-end gap-4 mt-4 border-rounded">
                <button 
                  type="button" class="px-4 py-2 bg-gray-300 rounded" 
                  @click="goBack">
                  Batal
                </button>
                <button type="submit" class="px-4 py-2 bg-primary-500 text-white rounded">Kirim</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchFundDonationByDonationId, verifyDonationDana } from '@/services/api-donation';
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";

const route = useRoute();
const donationId = route.params.id;
const apiUrl = import.meta.env.VITE_API_URL;
const fetching = ref(true);

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

const formatDate = (dateString) => {
  if (!dateString) return "Tanggal tidak tersedia";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};



const statusClass = computed(() => {
  return donation.value.status === "PENDING"
    ? "bg-yellow-100 text-yellow-700 border-yellow-500"
    : donation.value.status === "COMPLETED"
    ? "bg-green-100 text-green-700 border-green-500"
    : "bg-red-100 text-red-700 border-red-500";
});

const goBack = () => {
  window.history.back();
};

const fetchDonationData = async () => {
  try {
    const data = await fetchFundDonationByDonationId(donationId);

    if (data.forbidden) {
      hasAccess.value = false; // Set akses menjadi false jika 403
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

    const response = await verifyDonationDana(donationId, verifyDonation);

    if (response.status === "PENDING" || 
          response.status === "COMPLETED" ||
          response.status === "REJECTED"
        ) {
      goBack();
    } 
    else {
      alert(`Gagal: ${response.message || "Terjadi kesalahan."}`);
    }
  } catch (error) {
    console.error("Error saat verifikasi:", error);
    // alert(`Terjadi kesalahan: ${error.response?.data?.message || error.message}`);
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
