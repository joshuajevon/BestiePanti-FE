<template>
  <div>

    <LoadingIndicator v-if="fetching" 
      text="Memuat data donatur..." 
      color="text-secondary-500" 
    />
    
    <p v-else-if="!fetching && donaturList.length === 0" 
    class="text-center text-red-500 mt-4">
      Tidak ada data donatur tersedia.
    </p>

    <div v-else class="overflow-x-auto">
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
            <td class="border p-2">{{ donatur.phone }}</td>
            <td class="border p-2">{{ donatur.address }}</td>
            <td class="border p-2">
              <a href="#" class="text-red-600 hover:underline">
                Delete
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end mt-4">
      <Pagination v-if="donaturList.length > 0" 
        :totalItems="donaturList.length" 
        :itemsPerPage="itemsPerPage" 
        v-model:currentPage="currentPage" 
        class="mt-4" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchAllDonatur } from "@/services/api-donatur";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import Pagination from "@/components/pagination/PaginationDashboard.vue";

const donaturList = ref([]);
const fetching = ref(true);
const currentPage = ref(1);
const itemsPerPage = 10;

const headers = [
  "Nama Donatur", 
  "Email", 
  "Kontak", 
  "Alamat", 
  "Aksi"
];

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return donaturList.value.slice(start, start + itemsPerPage);
});

onMounted(async () => {
  try {
    const data = await fetchAllDonatur();
    donaturList.value = data.donatur_responses;
  } catch (error) {
    console.error("Error fetching donatur data:", error);
  } finally {
    fetching.value = false;
  }
});
</script>
