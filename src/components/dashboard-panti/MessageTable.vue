<template>
  <div>
    <LoadingIndicator v-if="fetching" 
      text="Memuat data pesan..." 
      color="text-secondary-500" 
    />
    
    <p v-else-if="!fetching && messageList.length === 0" 
      class="text-center text-red-500 mt-4">
      Panti asuhan anda belum menerima pesan.
    </p>

    <div v-else>
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
              <option value="1" class="text-black bg-white">Ditampilkan</option>
              <option value="0" class="text-black bg-white">Belum Tampil</option>
              <option v-if="selectedStatuses" value="__reset" class="text-red-400 bg-white" >Reset</option>
            </select>
          </div>
          
        </div>

        <!-- Action Filter -->
        <div class="flex flex-col md:flex-row gap-3 md:items-center mt-2 md:mt-0">
          <button
            class="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl transition duration-200 hover:bg-red-400"
            :class="{
              'pointer-events-none opacity-50':
                searchDonatur.length === 0 &&
                selectedStatuses.length === 0
            }"
            @click="resetAllFilters"
            aria-label="Reset semua filter"
            title="Reset semua filter"
          >
            Reset Filter
          </button>
        </div>

      </div>

      <!-- table -->
       <p v-if="paginatedData.length === 0" 
        class="text-center text-red-500 mt-4"
      >
        Tidak ada data pesan yang sesuai.
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
            <tr v-for="message in paginatedData" :key="message.id">
              <td class="border p-2">
                {{ message.donatur_name ? message.donatur_name : '-' }}
              </td>
              <td class="border p-2">
                <span 
                  :class="message.is_shown ? 
                  'bg-green-200 text-green-700 px-2 py-1 rounded' : 
                  'bg-yellow-200 text-yellow-700 px-2 py-1 rounded'">
                  {{ message.is_shown ? "Ditampilkan" : "Belum Ditampilkan" }}
                </span>
              </td>
              <td class="border p-2 whitespace-pre-line">{{ formatMessage(message.message) }}</td>
              <td class="border p-2">
                <a 
                  v-if="message.is_shown === 0"
                  href="#" 
                  class="text-green-600 hover:underline ml-2"
                  @click.prevent="showConfirmation(message.id, 'tampilkan')">
                  Tampilkan <br>
                </a>
                <a 
                  href="#" 
                  class="text-red-600 hover:underline ml-2"
                  @click.prevent="showConfirmation(message.id, 'hapus')">
                  Hapus
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex justify-end mt-4">
      <Pagination v-if="filteredmessageList.length > 0" 
        :totalItems="filteredmessageList.length" 
        :itemsPerPage="itemsPerPage" 
        v-model:currentPage="currentPage" 
        class="mt-4" 
      />
    </div>

    <!-- Confirmation Modal -->
    <ConfirmationModal 
      :show="modalVisible && !isLoading" 
      :message="modalMessage" 
      @confirm="handleConfirm"
      @cancel="modalVisible = false"
    />

    <!-- loading overlay -->
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
import { fetchAllMessagesById, acceptMessage, deleteMessage } from "@/services/api-message";
import { useAuthStore } from "@/stores/authStore";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import Pagination from "@/components/pagination/PaginationDashboard.vue";
import ConfirmationModal from "@/components/modal/ConfirmationModal.vue"; 

const authStore = useAuthStore();

const messageList = ref([]);
const fetching = ref(true);
const isLoading = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;

const modalVisible = ref(false);
const modalMessage = ref("");
const selectedMessageId = ref(null);
const actionType = ref(null);

// filter behavior
const searchDonatur = ref('')
const selectedStatuses = ref('')

const headers = [
  "Donatur", 
  "Ditampilkan", 
  "Pesan", 
  "Aksi"
];

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredmessageList.value.slice(start, start + itemsPerPage);
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
  searchDonatur.value = ''
}

const filteredmessageList = computed(() => {
  return messageList.value.filter((message) => {
    const matchesDonaturSearch = message.donatur_name.toLowerCase().includes(searchDonatur.value.toLowerCase());
    const matchesIsShown = selectedStatuses.value.length === 0 || selectedStatuses.value.includes(message.is_shown);

    return matchesDonaturSearch && matchesIsShown;
  });
});

watch([searchDonatur, selectedStatuses], () => {
  currentPage.value = 1;
});

const formatMessage = (text) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.reduce((acc, word, index) => {
    return acc + (index % 19 === 0 && index !== 0 ? "\n" : " ") + word;
  });
};

const showConfirmation = (id, type) => {
  selectedMessageId.value = id;
  actionType.value = type;
  modalMessage.value = type === "tampilkan"
    ? "Apakah kamu yakin ingin menampilkan pesan ini?"
    : "Apakah kamu yakin ingin menghapus pesan ini?";
  modalVisible.value = true;
};

const fetchData = async () => {
  try {
    const data = await fetchAllMessagesById(authStore?.user.id || 0);
    messageList.value = data.message_responses;
  } catch (error) {
    console.error("Error fetching message data:", error);
  } finally {
    fetching.value = false;
  }
};

const handleConfirm = async () => {
  if (actionType.value === "tampilkan") {
    isLoading.value = true;
    await acceptMessage(selectedMessageId.value);
    isLoading.value = false;
  } 
  else if (actionType.value === "hapus") {
    isLoading.value = true;
    await deleteMessage(selectedMessageId.value);
    isLoading.value = false;
  }

  modalVisible.value = false;
  
  fetching.value = true;
  fetchData();
};

onMounted(async () => {
  fetchData();
});
</script>
