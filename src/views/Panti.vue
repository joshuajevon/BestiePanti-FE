<template>
  <section class="bg-primary-50 text-secondary-500">
    <section
      class="c-container flex flex-col items-center gap-8 pb-16 pt-32 lg:pb-20 lg:pt-36 xl:pb-24 xl:pt-40 min-h-screen"
    >
      <div
        v-motion-slide-visible-once-left
        class="flex flex-col items-center justify-center gap-2 text-center lg:gap-4 xl:gap-6"
      >
        <h1 class="text-3xl font-bold lg:text-4xl xl:text-5xl">Panti Asuhan</h1>
        <p class="text-lg lg:text-xl xl:text-2xl">
          Temukan panti yang membutuhkan, wujudkan kepedulian dengan berbagi.
        </p>
      </div>

      <!-- Search bar -->
      <div v-motion-slide-visible-once-left class="w-full">
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
        v-motion-slide-visible-once-left
        class="flex flex-wrap items-center justify-center gap-2 relative bg-white p-3 rounded-full z-10"
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
          class="flex cursor-pointer items-center gap-2 transition py-2 px-4 rounded-full text-red-400"
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
            class="size-3"
          >
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
            />
          </svg>
          Hapus Filter
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

    <!-- Hubungi Kami -->
    <section
      v-motion-slide-visible-once-lef
      class="c-container flex flex-col items-center justify-center gap-8 py-16 lg:py-20 xl:py-24 bg-secondary-100"
    >
      <div class="flex flex-col items-center justify-center gap-4 text-center">
        <h1 class="text-3xl font-bold lg:text-4xl xl:text-5xl">
          Punya pertanyaan atau
          <span class="text-primary-300">butuh bantuan</span>?
        </h1>

        <p class="text-primary text-lg text-secondary-300 lg:text-xl">
          Jangan ragu untuk menghubungi kami! Kami siap membantu menjawab
          pertanyaan dan memberikan solusi terbaik untuk Anda.
        </p>
      </div>

      <a
        :href="`https://wa.me/6287876731950`"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-primary gap-2"
      >
        <svg
          class="size-6 lg:size-7"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
          />
        </svg>
        Hubungi Kami
      </a>
    </section>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { fetchAllPanti } from "@/services/api-panti";
import PantiCard from "@/components/cards/PantiCard.vue";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";

// Get route
const route = useRoute();

// Reactive state
const searchPanti = ref(route.query.search || ""); // Set initial search value from query
const pantiList = ref([]);
const itemsToShow = ref(8);
const loading = ref(false);
const fetching = ref(true);

const selectedFilter = ref("");

// Reset all filters
const resetAllFilters = () => {
  selectedRegions.value = [];
  selectedDonationTypes.value = [];
  selectedStatuses.value = [];
};

// Regions filter states
const regions = ["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"];
const selectedRegions = ref([]);

const toggleRegionsFilter = () => {
  selectedFilter.value = selectedFilter.value === "Regions" ? "" : "Regions";
};

const resetRegionsFilter = () => {
  selectedRegions.value = [];
};

// Donation Types filter states
const donationTypes = ["Barang", "Pangan", "Dana", "Tenaga"];
const selectedDonationTypes = ref([]);

const toggleDonationTypesFilter = () => {
  selectedFilter.value =
    selectedFilter.value === "Donation Types" ? "" : "Donation Types";
};

const resetDonationTypesFilter = () => {
  selectedDonationTypes.value = [];
};

// Statuses filter states
const selectedStatuses = ref([]);

const toggleStatusesFilter = () => {
  selectedFilter.value = selectedFilter.value === "Statuses" ? "" : "Statuses";
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
    fetching.value = false;
  }

  window.addEventListener("scroll", handleScroll);
});

// Cleanup listener when component unmounts
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Watch for changes in the route and update searchPanti accordingly
watch(
  () => route.query.search,
  (newSearch) => {
    searchPanti.value = newSearch || "";
  },
  { immediate: true }
);

// Computed: Filtered search results
const filteredPanti = computed(() => {
  let results = pantiList.value;

  if (searchPanti.value) {
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

  if (scrollTop + windowHeight >= fullHeight - 200) {
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
