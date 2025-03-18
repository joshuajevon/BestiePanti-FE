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
      <div v-for="donation in paginatedData" :key="donation.id"
        class="bg-white shadow-md rounded-xl p-4 border border-gray-200 w-full max-w-[600px] lg:max-w-full flex flex-col h-full"
      >
        <div>
          <h2 class="text-lg font-semibold text-gray-800">
            {{ donation.panti_name || '-' }}
          </h2>

          <p class="text-sm text-gray-600">
            <span class="font-medium">Tanggal Donasi:</span> {{ donation.donation_date }}
          </p>

          <p class="text-sm text-gray-600 mb-2">
            <span class="font-medium">Nominal:</span> Rp.{{ donation.nominal_amount.toLocaleString() }}
          </p>
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
const itemsPerPage = 5;

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
