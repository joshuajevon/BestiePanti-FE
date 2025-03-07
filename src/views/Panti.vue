<template>
  <section class="bg-primary-50 text-secondary-500">
    <section
      class="c-container flex flex-col items-center gap-8 pb-16 pt-32 lg:pb-20 lg:pt-36 xl:pb-24 xl:pt-40 min-h-screen"
    >
      <div
        class="flex flex-col items-center justify-center gap-2 text-center lg:gap-4 xl:gap-6"
      >
        <h1 class="text-3xl font-bold lg:text-4xl xl:text-5xl">Panti Asuhan</h1>
        <p class="text-lg lg:text-xl xl:text-2xl">
          Temukan panti yang membutuhkan, wujudkan kepedulian dengan berbagi.
        </p>
      </div>

      <!-- Search bar -->
      <div class="w-full">
        <input
          type="search"
          id="search-panti"
          name="search-panti"
          v-model="searchPanti"
          placeholder="Cari panti asuhan"
        />
      </div>

      <!-- Filters -->
      <div
        class="flex flex-wrap items-center justify-center gap-2 relative bg-white p-3 rounded-full"
      >
        <!-- Region Filters -->
        <div>
          <div
            class="flex cursor-pointer items-center gap-2 text-secondary-500 transition px-4 py-2 rounded-full"
            :class="{
              'bg-primary-300 text-white': selectedFilter === 'Regions',
            }"
            @click="toggleRegionsFilter"
          >
            <span class="font-medium text-sm sm:text-base">
              Wilayah
              <span v-if="selectedRegions.length > 0" class="font-normal">
                ({{ selectedRegions.length }})
              </span></span
            >

            <span
              class="transition"
              :class="{
                '-rotate-180': selectedFilter === 'Regions',
              }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>

          <div
            v-if="selectedFilter === 'Regions'"
            class="w-full absolute z-40 left-0 top-[100%] mt-2 rounded-lg lg:rounded-xl bg-white border border-secondary-100"
          >
            <div class="flex items-center justify-between p-4">
              <span class="text-sm text-secondary-500">
                {{ selectedRegions.length }} Terpilih
              </span>

              <button
                type="button"
                class="text-sm flex items-center justify-end gap-1 text-red-400"
                :class="{
                  'pointer-events-none opacity-50':
                    selectedRegions.length === 0,
                }"
                @click="resetRegionsFilter"
              >
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="size-3"
                >
                  <path
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                  />
                </svg>
                Hapus Pilihan
              </button>
            </div>

            <ul class="space-y-1 border-t border-secondary-100 p-4">
              <li v-for="region in regions" :key="region">
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    :value="region"
                    v-model="selectedRegions"
                    class="w-4 h-4"
                  />
                  {{ region }}
                </label>
              </li>
            </ul>
          </div>
        </div>

        <!-- Donation Types Filters -->
        <div>
          <div
            class="flex cursor-pointer items-center gap-2 text-secondary-500 transition px-4 py-2 rounded-full"
            :class="{
              'bg-primary-300 text-white': selectedFilter === 'Donation Types',
            }"
            @click="toggleDonationTypesFilter"
          >
            <span class="font-medium text-sm sm:text-base">
              Jenis Donasi
              <span v-if="selectedDonationTypes.length > 0" class="font-normal">
                ({{ selectedDonationTypes.length }})
              </span></span
            >

            <span
              class="transition"
              :class="{
                '-rotate-180': selectedFilter === 'Donation Types',
              }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>

          <div
            v-if="selectedFilter === 'Donation Types'"
            class="w-full absolute z-40 left-0 top-[100%] mt-2 rounded-lg lg:rounded-xl bg-white border border-secondary-100"
          >
            <div class="flex items-center justify-between p-4">
              <span class="text-sm text-secondary-500">
                {{ selectedDonationTypes.length }} Terpilih
              </span>

              <button
                type="button"
                class="text-sm flex items-center justify-end gap-1 text-red-400"
                :class="{
                  'pointer-events-none opacity-50':
                    selectedDonationTypes.length === 0,
                }"
                @click="resetDonationTypesFilter"
              >
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="size-3"
                >
                  <path
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                  />
                </svg>
                Hapus Pilihan
              </button>
            </div>

            <ul class="space-y-1 border-t border-secondary-100 p-4">
              <li v-for="type in donationTypes" :key="type">
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    :value="type"
                    v-model="selectedDonationTypes"
                    class="w-4 h-4"
                  />
                  {{ type }}
                </label>
              </li>
            </ul>
          </div>
        </div>

        <!-- Statuses Filters -->
        <div>
          <div
            class="flex cursor-pointer items-center gap-2 text-secondary-500 transition px-4 py-2 rounded-full"
            :class="{
              'bg-primary-300 text-white': selectedFilter === 'Statuses',
            }"
            @click="toggleStatusesFilter"
          >
            <span class="font-medium text-sm sm:text-base">
              Status
              <span v-if="selectedStatuses.length > 0" class="font-normal">
                ({{ selectedStatuses.length }})
              </span></span
            >

            <span
              class="transition"
              :class="{
                '-rotate-180': selectedFilter === 'Statuses',
              }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>

          <div
            v-if="selectedFilter === 'Statuses'"
            class="w-full absolute z-40 left-0 top-[100%] mt-2 rounded-lg lg:rounded-xl bg-white border border-secondary-100"
          >
            <div class="flex items-center justify-between p-4">
              <span class="text-sm text-secondary-500">
                {{ selectedStatuses.length }} Terpilih
              </span>

              <button
                type="button"
                class="text-sm flex items-center justify-end gap-1 text-red-400"
                :class="{
                  'pointer-events-none opacity-50':
                    selectedStatuses.length === 0,
                }"
                @click="resetStatusesFilter"
              >
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  class="size-3"
                >
                  <path
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                  />
                </svg>
                Hapus Pilihan
              </button>
            </div>

            <ul class="space-y-1 border-t border-secondary-100 p-4">
              <li>
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    :value="1"
                    v-model="selectedStatuses"
                    class="w-4 h-4"
                  />
                  Darurat
                </label>
              </li>

              <li>
                <label class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    :value="0"
                    v-model="selectedStatuses"
                    class="w-4 h-4"
                  />
                  Tidak Darurat
                </label>
              </li>
            </ul>
          </div>
        </div>

        <button
          class="flex cursor-pointer items-center gap-2 transition p-2 rounded-full aspect-square border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
          :class="{
            'pointer-events-none opacity-50':
              selectedRegions.length === 0 &&
              selectedDonationTypes.length === 0 &&
              selectedStatuses.length === 0,
          }"
          @click="resetAllFilters"
        >
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="size-4"
          >
            <path
              d="M48.5 224L40 224c-13.3 0-24-10.7-24-24L16 72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8L48.5 224z"
            />
          </svg>

          <!-- <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            class="size-4"
          >
            <path
              d="M3.9 22.9C10.5 8.9 24.5 0 40 0L472 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L396.4 195.6C316.2 212.1 256 283 256 368c0 27.4 6.3 53.4 17.5 76.5c-1.6-.8-3.2-1.8-4.7-2.9l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 65.3C-.7 53.4-2.8 36.8 3.9 22.9zM432 224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm59.3 107.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L432 345.4l-36.7-36.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L409.4 368l-36.7 36.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L432 390.6l36.7 36.7c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L454.6 368l36.7-36.7z"
            />
          </svg> -->
        </button>
      </div>

      <LoadingIndicator
        v-if="fetching"
        text="Memuat data panti asuhan..."
        color="text-secondary-500"
      />

      <div
        v-else-if="visiblePanti.length === 0"
        class="text-center font-medium text-red-600 text-lg"
      >
        Data panti asuhan tidak ditemukan.
      </div>

      <div class="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <PantiCard
          v-for="panti in visiblePanti"
          :key="panti.id"
          :panti="panti"
        />
      </div>

      <LoadingIndicator
        v-if="loading"
        text="Memuat lebih banyak data panti asuhan..."
        color="text-secondary-500"
      />
    </section>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { fetchAllPanti } from "@/services/api-panti";
import PantiCard from "@/components/cards/PantiCard.vue";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";

// Reactive state
const searchPanti = ref("");
const pantiList = ref([]);
const itemsToShow = ref(8);
const loading = ref(false);
const fetching = ref(true); // Added state for initial loading

const selectedFilter = ref("");

const resetAllFilters = () => {
  selectedRegions.value = [];
  selectedDonationTypes.value = [];
  selectedStatuses.value = [];
};

// Regions filter states
const regions = ["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"];
const selectedRegions = ref([]);

const toggleRegionsFilter = () => {
  if (selectedFilter.value === "Regions") {
    selectedFilter.value = "";
    return;
  }

  selectedFilter.value = "Regions";
};

const resetRegionsFilter = () => {
  selectedRegions.value = [];
};

// Donation Types filter states
const donationTypes = ["Barang", "Pangan", "Dana", "Tenaga"];
const selectedDonationTypes = ref([]);

const toggleDonationTypesFilter = () => {
  if (selectedFilter.value === "Donation Types") {
    selectedFilter.value = "";
    return;
  }

  selectedFilter.value = "Donation Types";
};

const resetDonationTypesFilter = () => {
  selectedDonationTypes.value = [];
};

// Statuses filter states
const selectedStatuses = ref([]);

const toggleStatusesFilter = () => {
  if (selectedFilter.value === "Statuses") {
    selectedFilter.value = "";
    return;
  }

  selectedFilter.value = "Statuses";
};

const resetStatusesFilter = () => {
  selectedStatuses.value = [];
};

// Fetch data
onMounted(async () => {
  try {
    const data = await fetchAllPanti();
    pantiList.value = data.panti_responses;
  } catch (error) {
    console.error("Error fetching panti data:", error);
  } finally {
    fetching.value = false; // Set fetching to false after data is loaded
  }

  window.addEventListener("scroll", handleScroll);
});

// Cleanup listener when component unmounts
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Computed: Filtered search results
const filteredPanti = computed(() => {
  let results = pantiList.value;

  if (searchPanti.value !== "") {
    results = results.filter((panti) =>
      panti.name.toLowerCase().includes(searchPanti.value.toLowerCase())
    );
  }

  if (selectedRegions.value.length > 0) {
    results = results.filter((panti) =>
      selectedRegions.value.includes(panti.region)
    );
  }

  if (selectedDonationTypes.value.length > 0) {
    results = results.filter((panti) =>
      selectedDonationTypes.value.some((filter) =>
        panti.donation_types.includes(filter)
      )
    );
  }

  if (selectedStatuses.value.length > 0) {
    results = results.filter((panti) =>
      selectedStatuses.value.some((filter) => panti.is_urgent === filter)
    );
  }

  return results;
});

// Show only a limited number of items
const visiblePanti = computed(() =>
  filteredPanti.value.slice(0, itemsToShow.value)
);

// Infinite Scroll Function
const handleScroll = () => {
  if (loading.value) return;

  const scrollTop = document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= fullHeight - 10) {
    loadMore();
  }
};

// Load more items when scrolling to the bottom
const loadMore = async () => {
  if (itemsToShow.value < filteredPanti.value.length) {
    loading.value = true;
    await nextTick();
    setTimeout(() => {
      itemsToShow.value += 8;
      loading.value = false;
    }, 1000);
  }
};
</script>
