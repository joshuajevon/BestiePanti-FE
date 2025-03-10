<template>
  <div>

    <LoadingIndicator v-if="fetching" 
      text="Memuat data panti asuhan..." 
      color="text-secondary-500"
     />
    
    <p v-else-if="!fetching && pantiList.length === 0" class="text-center text-red-500 mt-4">
      Tidak ada data panti tersedia.
    </p>

    <div v-else class="overflow-x-auto">
      <table class="w-full min-w-max border-collapse border border-gray-300">
        <thead class="bg-blue-700 text-white">
          <tr>
            <th v-for="header in headers" :key="header" class="p-2">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="panti in paginatedData" :key="panti.id">
            <td class="border p-2">{{ panti.name }}</td>
            <td class="border p-2">{{ panti.email }}</td>
            <td class="border p-2">{{ panti.phone }}</td>
            <td class="border p-2">{{ panti.address }}</td>
            <td class="border p-2">{{ panti.is_urgent ? "Urgent" : "Tidak Urgent" }}</td>
            <td class="border p-2">{{ panti.bank_name }}</td>
            <td class="border p-2">{{ panti.bank_account_number }}</td>
            <td class="border p-2">{{ panti.bank_account_name }}</td>
            <td class="border p-2">
              <a href="#" class="text-blue-600 hover:underline">Edit</a> <br>
              <a href="#" class="text-red-600 hover:underline">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end mt-4">
      <Pagination v-if="pantiList.length > 0" 
        :totalItems="pantiList.length" 
        :itemsPerPage="itemsPerPage" 
        v-model:currentPage="currentPage" 
        class="mt-4" />
      </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchAllPanti } from "@/services/api-panti";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import Pagination from "@/components/pagination/PaginationDashboard.vue";

const pantiList = ref([]);
const fetching = ref(true);
const currentPage = ref(1);
const itemsPerPage = 10;

const headers = ["Nama Panti",
  "Email",
  "Kontak",
  "Alamat",
  "Darurat",
  "Nama Bank",
  "Nomor Rekening",
  "Nama Pemilik Rekening",
  "Aksi"
];

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return pantiList.value.slice(start, start + itemsPerPage);
});

onMounted(async () => {
  try {
    const data = await fetchAllPanti();
    pantiList.value = data.panti_responses;
  } catch (error) {
    console.error("Error fetching panti data:", error);
  } finally {
    fetching.value = false;
  }
});
</script>
