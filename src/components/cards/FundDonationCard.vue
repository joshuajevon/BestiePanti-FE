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

    <!-- Card Container -->
    <div v-else class="flex flex-col items-center space-y-4">

      <!-- filter -->
      <div class="w-full bg-gray-300 px-4 py-3 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        
        <div class="flex flex-col md:flex-row gap-3 w-full">
          
          <!-- filter Nama panti -->
          <input
            type="text"
            v-model="searchPanti"
            placeholder="Cari panti..."
            class="w-full md:max-w-xs px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          
          <!-- filter Status -->
          <div class="relative w-full md:w-64 lg:w-32">
            <select
              :value="selectedStatuses || ''"
              @change="handleStatusChange"
              class="w-full appearance-none border-none outline-none rounded-md px-4 py-2 text-sm
                    bg-white text-gray-800 transition-colors
                    focus:bg-blue-600 focus:border-blue-600 focus:text-white" 
            >
              <option disabled value="" hidden>Status</option>
              <option value="PENDING" class="text-black bg-white">PENDING</option>
              <option value="COMPLETED" class="text-black bg-white">COMPLETED</option>
              <option value="REJECTED" class="text-black bg-white">REJECTED</option>
              <option v-if="selectedStatuses" value="__reset" class="text-red-400 bg-white" >Reset</option>
            </select>
          </div>
          
        </div>

        <!-- Action Filter -->
        <div class="flex flex-col md:flex-row gap-3 md:items-center mt-2 md:mt-0">
          <button
            class="flex items-center justify-center gap-2 transition p-2 md:p-2.5 rounded-full w-10 h-10 border-2 border-red-400 bg-white text-red-400 hover:bg-red-400 hover:text-white"
            :class="{
              'pointer-events-none opacity-50':
                searchPanti.length === 0 &&
                selectedStatuses.length === 0,
            }"
            @click="resetAllFilters"
            aria-label="Reset semua filter"
            title="Reset semua filter"
          >
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="w-4 h-4"
            >
              <path
                d="M48.5 224L40 224c-13.3 0-24-10.7-24-24L16 72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8L48.5 224z"
              />
            </svg>
          </button>
        </div>

      </div>

      <!-- donation card -->
      <p v-if="paginatedData.length === 0" 
        class="text-center text-red-500 mt-4"
      >
        Tidak ada data donasi yang sesuai.
      </p>

      <div v-else v-for="donation in paginatedData" :key="donation.id"
        class="bg-white shadow-md rounded-xl p-4 border border-gray-200 w-full max-w-[600px] lg:max-w-full flex flex-col h-full"
      >
        <div class="flex space-x-4">
          <img 
            :src="`${apiUrl}/storage/image/${donation.profile}`" 
            alt="Gambar Donasi" 
            class="w-24 h-24 object-cover rounded-md border border-gray-300"
          />
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-gray-800">
              {{ donation.panti_name || '-' }}
            </h2>

            <p class="text-sm text-gray-600">
              <span class="font-medium">Tanggal Donasi:</span> 
              {{ formatDate(donation.donation_date) }}
            </p>

            <p class="text-sm text-gray-600 mb-2">
              <span class="font-medium">Nominal:</span>
              {{ formatRupiah(donation.nominal_amount) }}
            </p>
          </div>
        </div>

        <div class="mt-3 flex justify-between items-center">
          <p class="text-sm">
            <span class="font-medium">Status: </span>
            <span 
              :class="{
                'bg-yellow-200 text-yellow-700': donation.status === 'PENDING',
                'bg-green-200 text-green-700': donation.status === 'COMPLETED',
                'bg-red-200 text-red-700': donation.status === 'REJECTED'
              }"
              class="px-2 py-1 rounded text-xs font-semibold"
            >
              {{ donation.status }}
            </span>
          </p>

          <router-link 
            :to="{ name: 'pantiDetail', params: { id: donation.panti_id } }"
            class="text-blue-600 hover:underline px-4 py-2 rounded-md text-sm font-medium"
          >
            Lihat Panti Asuhan →
          </router-link>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-auto flex justify-end">
      <Pagination v-if="filteredFundDonationList.length > 0" 
        :totalItems="filteredFundDonationList.length" 
        :itemsPerPage="itemsPerPage" 
        v-model:currentPage="currentPage" 
        class="mt-4" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { fetchFundDonationsById } from "@/services/api-donation";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import Pagination from "@/components/pagination/PaginationDashboard.vue";
import { useAuthStore } from "@/stores/authStore";
import { formatDate } from "@/utils/date";
import { formatRupiah  } from "@/utils/amount";

const authStore = useAuthStore();

const fundDonationList = ref([]);
const fetching = ref(true);
const currentPage = ref(1);
const itemsPerPage = 5;
const apiUrl = import.meta.env.VITE_API_URL;

// filter behavior
const searchPanti = ref('')
const selectedStatuses = ref('')

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredFundDonationList.value.slice(start, start + itemsPerPage);
});

function handleStatusChange(e) {
  const value = e.target.value
  if (value === '__reset') {
    selectedStatuses.value = ''
  } else {
    selectedStatuses.value = value
  }
}

const resetAllFilters = () => {
  selectedStatuses.value = ''
  searchPanti.value = ''
}

const filteredFundDonationList = computed(() => {
  return fundDonationList.value.filter((donation) => {
    const matchesPantiSearch = donation.panti_name.toLowerCase().includes(searchPanti.value.toLowerCase());
    const matchesStatus = selectedStatuses.value.length === 0 || selectedStatuses.value.includes(donation.status);

    return matchesPantiSearch && matchesStatus;
  });
});

watch([searchPanti, selectedStatuses], () => {
  currentPage.value = 1;
});

const fetchData = async () => {
  try {
    const data = await fetchFundDonationsById(authStore.user?.id || 0);
    fundDonationList.value = data.fund_donation_responses;
  } catch (error) {
    console.error("Error fetching fund donation data:", error);
  } finally {
    fetching.value = false;
  }
};

onMounted(async () => {
  fetchData();
});
</script>
