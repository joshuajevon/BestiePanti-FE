<template>
  <div>

    <LoadingIndicator v-if="fetching" 
      text="Memuat data donatur..." 
      color="text-secondary-500" 
    />
    
    <p v-else-if="!fetching && donaturList.length === 0" 
    class="text-center text-red-500 mt-20 mb-20">
      Tidak ada data donatur tersedia.
    </p>

    <div v-else >
      <!-- filter -->
      <div class="bg-gray-300 px-4 py-3 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        
        <div class="flex flex-col md:flex-row gap-3 w-full">
          
          <!-- filter Nama Donatur -->
          <input
            type="text"
            v-model="searchDonatur"
            placeholder="Cari donatur..."
            class="w-full md:max-w-xs px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

        </div>

      </div>

      <!-- table -->
      <p v-if="paginatedData.length === 0" 
      class="text-center text-red-500 mt-4">
        Tidak ada data donatur yang sesuai.
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
            <tr v-for="donatur in paginatedData" :key="donatur.id">
              <td class="border p-2">{{ donatur.name }}</td>
              <td class="border p-2">{{ donatur.email }}</td>
              <td class="border p-2">{{ donatur.phone || "-" }}</td>
              <td class="border p-2">{{ donatur.address || "-" }}</td>
              <td class="border p-2">
                <a href="#" 
                  class="text-red-600 hover:underline"
                  @click.prevent="showConfirmation(donatur.id)"
                >
                  Hapus
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex justify-end mt-4">
      <Pagination v-if="filteredDonaturList.length > 0" 
        :totalItems="filteredDonaturList.length" 
        :itemsPerPage="itemsPerPage" 
        v-model:currentPage="currentPage" 
        class="mt-4" 
      />
    </div>

    <!-- Confirmation Modal -->
    <ConfirmationModal 
      :show="modalVisible" 
      :message="modalMessage" 
      @confirm="handleDeleteConfirm"
      @cancel="modalVisible = false"
    />

    <!-- Loading Overlay -->
    <div
      v-if="isLoading"
      class="fixed inset-0 m-auto z-[200] w-screen h-screen bg-black/50 flex justify-center items-center"
    >
      <div class="bg-white rounded-xl p-8">
        <LoadingIndicator text="Sedang memproses..." class="text-secondary-500" />
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { fetchAllDonatur, deleteDonatur } from "@/services/api-donatur";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import Pagination from "@/components/pagination/PaginationDashboard.vue";
import ConfirmationModal from "@/components/modal/ConfirmationModal.vue"; 

const donaturList = ref([]);
const fetching = ref(true);
const isLoading = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;

const modalVisible = ref(false);
const modalMessage = ref("");
const selectedMessageId = ref(null);

// filter behavior
const searchDonatur = ref('')

const headers = [
  "Nama Donatur", 
  "Email", 
  "Kontak", 
  "Alamat", 
  "Aksi"
];

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredDonaturList.value.slice(start, start + itemsPerPage);
});

const filteredDonaturList = computed(() => {
  
  return donaturList.value.filter((donatur) => {

    const matchesSearch = donatur.name.toLowerCase().includes(searchDonatur.value.toLowerCase());

    return matchesSearch;
  });
});

watch(searchDonatur, () => {
  currentPage.value = 1;
});

const showConfirmation = (id) => {
  selectedMessageId.value = id;
  modalMessage.value = "Apakah kamu yakin ingin menghapus donatur ini?";
  modalVisible.value = true;
};

const handleDeleteConfirm = async () => {
  isLoading.value = true;
  await deleteDonatur(selectedMessageId.value);
  isLoading.value = false;
  modalVisible.value = false;
  
  fetching.value = true;
  fetchData();
};


const fetchData = async () => {
  try {
    const data = await fetchAllDonatur();
    donaturList.value = data.donatur_responses;
  } catch (error) {
    console.error("Error fetching donatur data:", error);
  } finally {
    fetching.value = false;
  }
};

onMounted(async () => {
  fetchData();
});
</script>
