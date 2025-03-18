<template>
  <div>

    <LoadingIndicator v-if="fetching" 
      text="Memuat data panti asuhan..." 
      color="text-secondary-500"
     />
    
    <p v-else-if="!fetching && pantiList.length === 0" class="text-center text-red-500 mt-4">
      Tidak ada data panti tersedia.
    </p>

    <div v-else>

      <div class="mt-4 md:text-right mb-5">
        <button class="px-4 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-400 transition duration-300">
          Tambah Panti
        </button>
      </div>

      <div class="overflow-x-auto rounded-xl">
        <table class="w-full min-w-max border-collapse border">
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
              <td class="border p-2">{{ panti.is_urgent ? "Darurat" : "Tidak Darurat" }}</td>
              <td class="border p-2">{{ panti.region }}</td>
              <td class="border p-2">{{ panti.bank_name }} - {{ panti.bank_account_number }}</td>
              <td class="border p-2">{{ panti.bank_account_name }}</td>
              <td class="border p-2">
                <a href="#" class="text-blue-600 hover:underline">Ubah</a>
                <br>
                <a href="#" class="text-red-600 hover:underline">Hapus</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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

const headers = [
  "Nama Panti",
  "Email",
  "Kontak",
  "Alamat",
  "Darurat",
  "Region",
  "Bank",
  "Nama Pemilik Rekening",
  "Aksi"
];

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return pantiList.value.slice(start, start + itemsPerPage);
});

const fetchData = async () => {
  try {
    const data = await fetchAllPanti();
    pantiList.value = data.panti_responses;
  } catch (error) {
    console.error("Error fetching panti data:", error);
  } finally {
    fetching.value = false;
  }
};

onMounted(async () => {
  fetchData();
});
</script>
