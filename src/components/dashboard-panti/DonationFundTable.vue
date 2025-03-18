<template>
  <div>

    <LoadingIndicator v-if="fetching" 
      text="Memuat data donasi..." 
      color="text-secondary-500" 
    />
    
    <p v-else-if="!fetching && fundDonationList.length === 0" 
    class="text-center text-red-500 mt-4">
      Tidak ada data donasi tersedia.
    </p>

    <div v-else class="overflow-x-auto rounded-xl">
      <table class="w-full min-w-max border-collapse border border-gray-300">
        <thead class="bg-blue-700 text-white">
          <tr>
            <th v-for="header in headers" :key="header" class="p-2">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="donation in paginatedData" :key="donation.id">
            <td class="border p-2">
              {{ donation.donatur_name? donation.donatur_name : '-' }}
            </td>
            <td class="border p-2">
              {{ donation.donation_date }}
            </td>
            <td class="border p-2">
              <span 
                :class="{
                  'bg-yellow-200 text-yellow-700': donation.status === 'PENDING',
                  'bg-green-200 text-green-700': donation.status === 'COMPLETED',
                  'bg-red-200 text-red-700': donation.status === 'REJECTED'
                }"
                class="px-2 py-1 rounded"
                >
                {{ donation.status }}
              </span>
            </td>
            <td class="border p-2">{{ donation.nominal_amount }}</td>
            <td class="border p-2">
              <a href="#" class="text-green-600 hover:underline">
                Verifikasi
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end mt-4">
      <Pagination v-if="fundDonationList.length > 0" 
        :totalItems="fundDonationList.length" 
        :itemsPerPage="itemsPerPage" 
        v-model:currentPage="currentPage" 
        class="mt-4" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchFundDonationsById } from "@/services/api-donation";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import Pagination from "@/components/pagination/PaginationDashboard.vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

const fundDonationList = ref([]);
const fetching = ref(true);
const currentPage = ref(1);
const itemsPerPage = 10;

const headers = [
  "Donatur", 
  "Tanggal Donasi",
  "Status", 
  "Nominal", 
  "Aksi"
];

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return fundDonationList.value.slice(start, start + itemsPerPage);
});

onMounted(async () => {
  try {
    const data = await fetchFundDonationsById(authStore ? authStore.user.id : 0);
    fundDonationList.value = data.fund_donation_responses;
  } catch (error) {
    console.error("Error fetching fund donation data:", error);
  } finally {
    fetching.value = false;
  }
});
</script>
