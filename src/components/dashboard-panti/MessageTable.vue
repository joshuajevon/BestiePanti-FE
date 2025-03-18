<template>
  <div>
    <LoadingIndicator v-if="fetching" 
      text="Memuat data donasi..." 
      color="text-secondary-500" 
    />
    
    <p v-else-if="!fetching && messageList.length === 0" 
      class="text-center text-red-500 mt-4">
      Panti asuhan anda belum menerima pesan.
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
                Tampilkan
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

    <div class="flex justify-end mt-4">
      <Pagination v-if="messageList.length > 0" 
        :totalItems="messageList.length" 
        :itemsPerPage="itemsPerPage" 
        v-model:currentPage="currentPage" 
        class="mt-4" 
      />
    </div>

    <!-- Confirmation Modal -->
    <ConfirmationModal 
      :show="modalVisible" 
      :message="modalMessage" 
      @confirm="handleConfirm"
      @cancel="modalVisible = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchAllMessagesById, acceptMessage, deleteMessage } from "@/services/api-message";
import { useAuthStore } from "@/stores/authStore";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import Pagination from "@/components/pagination/PaginationDashboard.vue";
import ConfirmationModal from "@/components/modal/ConfirmationModal.vue"; 

const authStore = useAuthStore();

const messageList = ref([]);
const fetching = ref(true);
const currentPage = ref(1);
const itemsPerPage = 10;

const modalVisible = ref(false);
const modalMessage = ref("");
const selectedMessageId = ref(null);
const actionType = ref(null);

const headers = [
  "Donatur", 
  "Ditampilkan", 
  "Pesan", 
  "Aksi"
];

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return messageList.value.slice(start, start + itemsPerPage);
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
    await acceptMessage(selectedMessageId.value);
  } 
  else if (actionType.value === "hapus") {
    await deleteMessage(selectedMessageId.value);
  }

  modalVisible.value = false;
  
  fetching.value = true;
  fetchData();
};

onMounted(async () => {
  fetchData();
});
</script>
