<template>
  <div>

    <LoadingIndicator v-if="fetching" 
      text="Memuat data panti asuhan..." 
      color="text-secondary-500"
     />

    <div v-else>
      <!-- filter -->
      <div class="bg-gray-300 px-4 py-3 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        
        <div class="flex flex-col md:flex-row gap-3 w-full">
          
          <!-- filter Nama Panti -->
          <input
            type="text"
            :disabled="pantiList.length === 0"
            v-model="searchPanti"
            placeholder="Cari panti..."
            class="w-full md:max-w-xs px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          
          <!-- Filter Region -->
          <div class="relative">
            <button
              @click="toggleRegionsFilter"
              :disabled="pantiList.length === 0"
              :class="[
                'w-full justify-between border rounded-md h-10 px-3 shadow-sm flex items-center transition duration-200 text-sm',
                selectedFilter === 'Regions' 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-800'
              ]"
            >
              Region
              <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-if="selectedFilter === 'Regions'"
              class="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md p-4"
            >
              <div v-for="region in regions" :key="region" class="mb-2">
                <label class="inline-flex items-center">
                  <input
                    type="checkbox"
                    :disabled="pantiList.length === 0"
                    :value="region"
                    v-model="selectedRegions"
                    class="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  <span class="ml-2 text-sm">{{ region }}</span>
                </label>
              </div>
              <button @click="resetRegionsFilter" class="text-sm text-red-500 hover:underline mt-2">Reset</button>
            </div>
          </div>

          <!-- filter Type Donasi -->
          <div class="relative">
            <button
              @click="toggleDonationTypesFilter"
              :disabled="pantiList.length === 0"
              :class="[
                'w-full justify-between border rounded-md h-10 px-3 shadow-sm flex items-center transition duration-200 text-sm',
                selectedFilter === 'Donation Types' 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-800'
              ]"
            >
              Tipe Donasi
              <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-if="selectedFilter === 'Donation Types'"
              class="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md p-4"
            >
              <div v-for="type in donationTypes" :key="type" class="mb-2">
                <label class="inline-flex items-center">
                  <input
                    type="checkbox"
                    :value="type"
                    v-model="selectedDonationTypes"
                    class="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  <span class="ml-2 text-sm">{{ type }}</span>
                </label>
              </div>
              <button @click="resetDonationTypesFilter" class="text-sm text-red-500 hover:underline mt-2">Reset</button>
            </div>
          </div>

          <!-- filter darurat -->
          <div class="relative">
            <button
              @click="toggleStatusesFilter"
              :disabled="pantiList.length === 0"
              :class="[
                'w-full justify-between border rounded-md h-10 px-3 shadow-sm flex items-center transition duration-200 text-sm',
                selectedFilter === 'Statuses' 
                  ? 'bg-blue-600 border-blue-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-800'
              ]"
            >
              Status
              <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-if="selectedFilter === 'Statuses'"
              class="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md p-4"
            >
              <div class="mb-2">
                <label class="inline-flex items-center">
                  <input
                    type="checkbox"
                    :value="1"
                    v-model="selectedStatuses"
                    class="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  <span class="ml-2 text-sm">Darurat</span>
                </label>
              </div>
              <div class="mb-2">
                <label class="inline-flex items-center">
                  <input
                    type="checkbox"
                    :value="0"
                    v-model="selectedStatuses"
                    class="form-checkbox h-4 w-4 text-indigo-600"
                  />
                  <span class="ml-2 text-sm">Tidak Darurat</span>
                </label>
              </div>
              <button @click="resetStatusesFilter" class="text-sm text-red-500 hover:underline mt-2">Reset</button>
            </div>
          </div>

        </div>
         
         <!-- Action Filter -->
        <div class="flex flex-col md:flex-row gap-3 md:items-center mt-2 md:mt-0">
          <button
            class="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl transition duration-200 hover:bg-red-400"
            :class="{
              'pointer-events-none opacity-50':
                searchPanti.length === 0 &&
                selectedDonationTypes.length === 0 &&
                selectedStatuses.length === 0 &&
                selectedRegions.length === 0,
            }"
            @click="resetAllFilters"
            aria-label="Reset semua filter"
            title="Reset semua filter"
          >
            Reset Filter
          </button>


          <button
            @click="$router.push({ name: 'tambah-panti' })"
            class="px-4 py-2 bg-blue-700 text-white font-semibold rounded-xl rounded shadow-md hover:bg-blue-500 transition duration-200"
          >
            Tambah Panti
          </button>
        </div>
      </div>

      <!-- table -->
       <p v-if="!fetching && pantiList.length === 0" 
      class="text-center text-red-500 mt-4">
        Tidak ada data panti tersedia.
      </p>

      <p v-else-if="paginatedData.length === 0" 
      class="text-center text-red-500 mt-4">
        Tidak ada data panti yang sesuai.
      </p>

      <div v-else class="overflow-x-auto rounded-xl">
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
              <td class="border p-2 whitespace-pre-line">
                {{ formatAddress(panti.address) }}
              </td>
              <td class="border p-2">{{ panti.region }}</td>
              <td class="border p-2">
                <strong>{{ panti.bank_name }} </strong>
                <br> 
                {{ panti.bank_account_number }} 
              </td>
              <td class="border p-2">{{ panti.bank_account_name }}</td>
              <td class="border p-2">
                <div class="flex flex-col gap-2">
                  <div 
                    v-for="(group, gIndex) in chunkedDonationTypes(panti.donation_types, 2)" 
                    :key="gIndex" 
                    class="flex flex-wrap gap-2"
                  >
                    <span 
                      v-for="(type, index) in group" 
                      :key="index" 
                      :class="{
                        'bg-green-200 text-green-700': type === 'Dana',
                        'bg-blue-200 text-blue-700': type === 'Barang',
                        'bg-yellow-200 text-yellow-700': type === 'Tenaga',
                        'bg-purple-200 text-purple-700': type === 'Pangan'
                      }"
                      class="px-2 py-1 rounded"
                    >
                      {{ type }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="border p-2">
                <label class="flex items-center cursor-pointer">
                  <div class="relative">
                    <input
                      type="checkbox"
                      :checked="panti.is_urgent"
                      @change="() => triggerUrgentChange(
                        panti.id, 
                        panti.is_urgent
                        )"
                      class="sr-only"
                    />
                    
                    <div
                      class="block w-12 h-6 rounded-full transition-colors duration-300"
                      :class="{
                        'bg-gray-300': !panti.is_urgent,
                        'bg-green-500': panti.is_urgent
                      }"
                    ></div>
                    
                    <div
                      class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300"
                      :class="{ 'translate-x-6': panti.is_urgent }"
                    ></div>
                  </div>
                  <span class="ml-3 text-sm">
                    {{ panti.is_urgent ? "Darurat" : "Tidak Darurat" }}
                  </span>
                </label>
              </td>
              <td class="border p-2">
                <a href="#" 
                  class="text-red-600 hover:underline"
                  @click.prevent="showConfirmation(
                    panti.id, 
                    'delete', 
                    'Apakah kamu yakin ingin menghapus panti ini?'
                    )"
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
      <Pagination v-if="filteredPantiList.length > 0" 
        :totalItems="filteredPantiList.length" 
        :itemsPerPage="itemsPerPage" 
        v-model:currentPage="currentPage" 
        class="mt-4" />
    </div>

    <!-- Confirmation Modal -->
    <ConfirmationModal
      :show="modalVisible && !isLoading" 
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
import { fetchAllPanti, deletePanti, updateIsUrgentPanti } from "@/services/api-panti";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import Pagination from "@/components/pagination/PaginationDashboard.vue";
import ConfirmationModal from "@/components/modal/ConfirmationModal.vue";

const pantiList = ref([]);
const fetching = ref(true);
const isLoading = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;

const modalVisible = ref(false)
const modalMessage = ref("")
const selectedPantiId = ref(null)
const actionType = ref("delete")
const urgentTargetValue = ref("")

// Filter Beehavior
const selectedFilter = ref('')
const selectedRegions = ref([])
const selectedDonationTypes = ref([])
const selectedStatuses = ref([])

const searchPanti = ref('')

const regions = [
  'Jakarta', 
  'Bogor', 
  'Depok',
  'Tangerang',
  'Bekasi'
]

const donationTypes = [
  "Barang", 
  "Pangan", 
  "Dana", 
  "Tenaga"
];

const headers = [
  "Nama Panti",
  "Email",
  "Kontak",
  "Alamat",
  "Region",
  "Bank",
  "Nama Pemilik Rekening",
  "Tipe Donasi",
  "Darurat",
  "Aksi"
];

const toggleRegionsFilter = () => {
  selectedFilter.value = selectedFilter.value === 'Regions' ? '' : 'Regions'
}
const toggleDonationTypesFilter = () => {
  selectedFilter.value = selectedFilter.value === 'Donation Types' ? '' : 'Donation Types'
}
const toggleStatusesFilter = () => {
  selectedFilter.value = selectedFilter.value === 'Statuses' ? '' : 'Statuses'
}

const resetRegionsFilter = () => {
  selectedRegions.value = []
}
const resetDonationTypesFilter = () => {
  selectedDonationTypes.value = []
}
const resetStatusesFilter = () => {
  selectedStatuses.value = []
}
const resetAllFilters = () => {
  selectedRegions.value = []
  selectedDonationTypes.value = []
  selectedStatuses.value = []
  searchPanti.value = ''
}

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredPantiList.value.slice(start, start + itemsPerPage);
});

function chunkedDonationTypes(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const filteredPantiList = computed(() => {
  return pantiList.value.filter((panti) => {
    const matchesSearch = panti.name.toLowerCase().includes(searchPanti.value.toLowerCase());

    const matchesRegion = selectedRegions.value.length === 0 || selectedRegions.value.includes(panti.region);

    const matchesStatus =
      selectedStatuses.value.length === 0 || selectedStatuses.value.includes(panti.is_urgent);

    const matchesDonationType =
      selectedDonationTypes.value.length === 0 ||
      selectedDonationTypes.value.some((type) =>
        panti.donation_types?.includes(type)
      );

    return matchesSearch && matchesRegion && matchesStatus && matchesDonationType;
  });
});

watch([searchPanti, selectedRegions, selectedDonationTypes, selectedStatuses], () => {
  currentPage.value = 1;
});

const formatAddress = (text) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.reduce((acc, word, index) => {
    return acc + (index % 5 === 0 && index !== 0 ? "\n" : " ") + word;
  });
};

const showConfirmation = (id, type, message, urgentValue = null) => {
  selectedPantiId.value = id
  modalMessage.value = message
  modalVisible.value = true
  actionType.value = type
  urgentTargetValue.value = urgentValue
};

const triggerUrgentChange = (id, currentStatus) => {
  const newStatus = currentStatus ? 0 : 1;
  showConfirmation(
    id,
    "update_urgent",
    `Apakah kamu yakin ingin mengubah status menjadi ${newStatus ? "Darurat" : "Tidak Darurat"}?`,
    newStatus
  )
}

const handleDeleteConfirm = async () => {
  if (actionType.value === "delete") {
    isLoading.value = true;
    await deletePanti(selectedPantiId.value)
    isLoading.value = false;
  } else if (actionType.value === "update_urgent") {
    isLoading.value = true;
    await updateIsUrgentPanti(selectedPantiId.value, urgentTargetValue.value)
    isLoading.value = false;
  }
  modalVisible.value = false
  fetching.value = true
  fetchData()
}

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
