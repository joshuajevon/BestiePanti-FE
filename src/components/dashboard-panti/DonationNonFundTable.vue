<template>
  <div>

    <LoadingIndicator v-if="fetching" 
      text="Memuat data donasi..." 
      color="text-secondary-500" 
    />
    
    <p v-else-if="!fetching && nonFundDonationList.length === 0" 
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
            <td class="border p-2">{{ formatDate(donation.donation_date) }}</td>
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
            <td class="border p-2">
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="(type, index) in donation.donation_types" 
                  :key="index" 
                  :class="{
                    'bg-blue-200 text-blue-700': type === 'Barang',
                    'bg-yellow-200 text-yellow-700': type === 'Tenaga',
                    'bg-purple-200 text-purple-700': type === 'Pangan'
                  }"
                  class="px-2 py-1 rounded"
                >
                  {{ type }}
                </span>
              </div>
            </td>
            <td class="border p-2">
              {{ donation.is_onsite  === 1 ? 'Onsite' : 'Online' }}
            </td>
            <td class="border p-2 whitespace-pre-line">
              {{ formatNotes(donation.notes) }}
            </td>
            <td class="border p-2">
              {{ donation.pic }}
            </td>
            <td class="border p-2">
              <a 
                :href="`https://wa.me/${donation.active_phone}`"
                target="_blank"
                class="text-blue-600 mb-2 hover:underline"
                @click="markAsContacted(donation.id)"
              >
                Hubungi
              </a>
              <br>
              <router-link 
                :to="{ name: 'donasi-nondana', params: { id: donation.id } }"
                class="text-green-600 hover:underline"
                :class="{ 'pointer-events-none opacity-45': 
                  !contactedDonations.has(donation.id) && donation.status === 'PENDING' }"
              >
                Verifikasi
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end mt-4">
      <Pagination v-if="nonFundDonationList.length > 0" 
        :totalItems="nonFundDonationList.length" 
        :itemsPerPage="itemsPerPage" 
        v-model:currentPage="currentPage" 
        class="mt-4" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchNonFundDonationsById } from "@/services/api-donation";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import Pagination from "@/components/pagination/PaginationDashboard.vue";
import { formatDate } from "@/utils/date";

const nonFundDonationList = ref([]);
const fetching = ref(true);
const currentPage = ref(1);
const itemsPerPage = 10;
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const contactedDonations = ref(new Set());

const headers = [
  "Donatur",
  "Tanggal Donasi",
  "Status", 
  "Tipe Donasi",
  "Onsite/Online",
  "Catatan", 
  "PIC",
  "Aksi"
];

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return nonFundDonationList.value.slice(start, start + itemsPerPage);
});

const formatNotes = (text) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.reduce((acc, word, index) => {
    return acc + (index % 7 === 0 && index !== 0 ? "\n" : " ") + word;
  });
};

const fetchData = async () => {
  try {
    const data = await fetchNonFundDonationsById(authStore.user?.id || 0);
    nonFundDonationList.value = data.nonfund_donation_responses;
  } catch (error) {
    console.error("Error fetching fund donation data:", error);
  } finally {
    fetching.value = false;
  }
};

const markAsContacted = (donationId) => {
  contactedDonations.value.add(donationId);
  localStorage.setItem("contactedDonations", JSON.stringify([...contactedDonations.value]));
};

onMounted(async () => {
  fetchData();
  const storedContacts = JSON.parse(localStorage.getItem("contactedDonations"));
  if (storedContacts) {
    contactedDonations.value = new Set(storedContacts);
  }
});
</script>
