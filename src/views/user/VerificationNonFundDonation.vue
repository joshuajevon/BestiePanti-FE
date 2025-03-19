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
            <h1 class="text-3xl font-semibold text-primary-500">Verifikasi Donasi Non Dana</h1>
            <p class="text-gray-600 text-sm mt-2">
              Pastikan donasi dana anda telah sesuai.
            </p>
          </div>

          <div class="mt-6">

            <form
              method="PUT" 
              @submit.prevent="submitForm" 
              class="space-y-4"
            >
              <!-- Donation date section -->
              <div class="input-container mt-2">
                <label
                  for="donation_date"
                  class="text-base font-medium text-secondary-500 sm:text-lg"
                  >Tanggal Donasi</label
                >

                <input
                  type="date"
                  id="donation_date"
                  name="donation_date"
                  placeholder="Masukkan tanggal donasi"
                  v-model="donation.donation_date"
                />
              </div>

              <!-- Donation Method -->
              <div class="input-container mt-2">
                <label class="text-base font-medium text-secondary-500 sm:text-lg"
                  >Metode Donasi</label
                >
                <div
                  class="mt-1 flex w-full items-center justify-start gap-8 text-sm sm:text-base"
                >
                  <div class="flex items-center gap-2">
                    <input
                      type="radio"
                      id="onsite"
                      name="donation-method"
                      v-model="donation.is_onsite"
                      value="1"
                    />
                    <label for="onsite">Onsite</label>
                  </div>
                  <div class="flex items-center gap-2">
                    <input
                      type="radio"
                      id="online"
                      name="donation-method"
                      v-model="donation.is_onsite"
                      value="0"
                    />
                    <label for="online">Online (Kurir / Gosend, dll)</label>
                  </div>
                </div>
              </div>

              <div class="input-container mt-2">
                <label class="text-base font-medium text-secondary-500 sm:text-lg"
                  >Tipe Donasi</label
                >
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="type in donation.donation_types" 
                    :key="type" 
                    class="px-3 py-1 rounded"
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

              <div class="input-container mt-2">
                <label for="notes" class="text-base font-medium text-secondary-500 sm:text-lg">
                  Catatan Donatur
                </label>

                <textarea
                  name="notes"
                  id="notes"
                  rows="5"
                  v-model="donation.notes"
                  readonly
                  class="w-full border bg-gray-100 text-gray-700 px-3 py-2 rounded"
                ></textarea>
              </div>

              <div class="input-container mt-2">
                <label class="text-base font-medium text-secondary-500 sm:text-lg">
                  Status
                </label>
                <select 
                v-model="donation.status" 
                class="w-full border rounded-full px-3 py-2 appearance-none text-gray-700" 
                :class="statusClass">
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
                <button type="submit" class="px-4 py-2 bg-primary-500 text-white rounded">
                  Kirim
                </button>
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
import { fetchNonFundDonationByDonationId, verifyDonationNonDana } from '@/services/api-donation';
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";

const route = useRoute();
const donationId = route.params.id;
const fetching = ref(true);

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
  window.history.back();
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
    if (error.response && error.response.status === 403) {
      hasAccess.value = false;
    }
  } finally {
    fetching.value = false;
  }
};

const submitForm = async () => {

  try {
    const verifyDonation = {
      donationDate: donation.value.donation_date,
      isOnsite: donation.value.is_onsite,
      donationTypes: donation.value.donation_types,
      pic: donation.value.pic,
      status: donation.value.status,
      activePhone: donation.value.active_phone,
      notes: donation.value.notes,
    };

    console.log("verifyDonation", verifyDonation);
    const response = await verifyDonationNonDana(donationId, verifyDonation);

    if (!response.message) {
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
