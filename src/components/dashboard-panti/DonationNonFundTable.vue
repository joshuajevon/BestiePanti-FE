<template>
  <div>
    <LoadingIndicator
      v-if="fetching"
      text="Memuat data donasi..."
      color="text-secondary-500"
    />

    <p
      v-else-if="!fetching && nonFundDonationList.length === 0"
      class="text-center text-red-500 mt-20 mb-20"
    >
      Tidak ada data donasi tersedia.
    </p>

    <div v-else>
      <!-- filter -->
      <div
        class="bg-gray-300 px-4 py-3 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5"
      >
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
              class="w-full appearance-none border-none outline-none rounded-md px-4 h-10 text-sm bg-white text-gray-800 transition-colors focus:bg-blue-600 focus:border-blue-600 focus:text-white"
            >
              <option disabled value="" hidden>Status</option>
              <option value="PENDING" class="text-black bg-white">
                PENDING
              </option>
              <option value="COMPLETED" class="text-black bg-white">
                COMPLETED
              </option>
              <option value="REJECTED" class="text-black bg-white">
                REJECTED
              </option>
              <option
                v-if="selectedStatuses"
                value="__reset"
                class="text-red-400 bg-white"
              >
                Reset
              </option>
            </select>
          </div>

          <!-- filter Type Donasi -->
          <div class="relative">
            <button
              @click="toggleDonationTypesFilter"
              :class="[
                'w-full border rounded-md h-10 px-3 shadow-sm flex items-center justify-between transition duration-200 text-sm',
                selectedFilter === 'Donation Types'
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-300 text-gray-800',
              ]"
            >
              Tipe Donasi
              <svg
                class="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
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
              <button
                @click="resetDonationTypesFilter"
                class="text-sm text-red-500 hover:underline mt-2"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <!-- Action Filter -->
        <div
          class="flex flex-col md:flex-row gap-3 md:items-center mt-2 md:mt-0"
        >
          <button
            class="px-4 py-2 bg-red-500 text-white font-semibold rounded-xl transition duration-200 hover:bg-red-400"
            :class="{
              'pointer-events-none opacity-50':
                searchDonatur.length === 0 &&
                selectedDonationTypes.length === 0 &&
                selectedStatuses.length === 0,
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
      <p
        v-if="paginatedData.length === 0"
        class="text-center text-red-500 mt-4"
      >
        Tidak ada data donasi yang sesuai.
      </p>

      <p v-else-if="paginatedData.length != 0" class="text-s mb-2">
        *Note: Anda dapat melakukan verifikasi ketika sudah menghubungi donatur
      </p>

      <div v-if="paginatedData.length != 0" class="overflow-x-auto rounded-xl">
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
                {{ donation.donatur_name ? donation.donatur_name : "-" }}
              </td>
              <td class="border p-2">
                {{ formatDate(donation.donation_date) }}
              </td>
              <td class="border p-2">
                <span
                  :class="{
                    'bg-yellow-200 text-yellow-700':
                      donation.status === 'PENDING',
                    'bg-green-200 text-green-700':
                      donation.status === 'COMPLETED',
                    'bg-red-200 text-red-700': donation.status === 'REJECTED',
                  }"
                  class="px-2 py-1 rounded"
                >
                  {{ donation.status }}
                </span>
              </td>
              <td class="border p-2">
                <div class="flex flex-col gap-2">
                  <div
                    v-for="(group, gIndex) in chunkedDonationTypes(
                      donation.donation_types,
                      2
                    )"
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
                        'bg-purple-200 text-purple-700': type === 'Pangan',
                      }"
                      class="px-2 py-1 rounded"
                    >
                      {{ type }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="border p-2">
                {{ donation.is_onsite === 1 ? "Onsite" : "Online" }}
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
                <br />
                <router-link
                  :to="{ name: 'donasi-nondana', params: { id: donation.id } }"
                  class="text-green-600 hover:underline"
                  :class="{
                    'pointer-events-none opacity-45':
                      !contactedDonations.has(donation.id) &&
                      donation.status === 'PENDING',
                  }"
                >
                  Verifikasi
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex justify-end mt-4">
      <Pagination
        v-if="filteredNonFundDonationList.length > 0"
        :totalItems="filteredNonFundDonationList.length"
        :itemsPerPage="itemsPerPage"
        v-model:currentPage="currentPage"
        class="mt-4"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
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

// filter behavior
const searchDonatur = ref("");
const selectedStatuses = ref("");
const selectedDonationTypes = ref([]);
const selectedFilter = ref("");

const donationTypes = ["Barang", "Pangan", "Tenaga"];

const headers = [
  "Donatur",
  "Tanggal Donasi",
  "Status",
  "Tipe Donasi",
  "Onsite/Online",
  "Catatan",
  "PIC",
  "Aksi",
];

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredNonFundDonationList.value.slice(start, start + itemsPerPage);
});

function handleStatusChange(e) {
  const value = e.target.value;
  if (value === "__reset") {
    selectedStatuses.value = "";
  } else {
    selectedStatuses.value = value;
  }
}

const toggleDonationTypesFilter = () => {
  selectedFilter.value =
    selectedFilter.value === "Donation Types" ? "" : "Donation Types";
};

const resetDonationTypesFilter = () => {
  selectedDonationTypes.value = [];
};

const resetAllFilters = () => {
  selectedStatuses.value = "";
  searchDonatur.value = "";
  selectedDonationTypes.value = [];
};

function chunkedDonationTypes(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const filteredNonFundDonationList = computed(() => {
  return nonFundDonationList.value.filter((donation) => {
    const matchesDonaturSearch = donation.donatur_name
      .toLowerCase()
      .includes(searchDonatur.value.toLowerCase());
    const matchesStatus =
      selectedStatuses.value.length === 0 ||
      selectedStatuses.value.includes(donation.status);

    const matchesDonationType =
      selectedDonationTypes.value.length === 0 ||
      selectedDonationTypes.value.some((type) =>
        donation.donation_types?.includes(type)
      );

    return matchesDonaturSearch && matchesStatus && matchesDonationType;
  });
});

watch([searchDonatur, selectedStatuses, selectedDonationTypes], () => {
  currentPage.value = 1;
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
  localStorage.setItem(
    "contactedDonations",
    JSON.stringify([...contactedDonations.value])
  );
};

onMounted(async () => {
  fetchData();
  const storedContacts = JSON.parse(localStorage.getItem("contactedDonations"));
  if (storedContacts) {
    contactedDonations.value = new Set(storedContacts);
  }
});
</script>
