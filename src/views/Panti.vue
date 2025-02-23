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

      <!-- Donation Type Filters -->
      <div class="flex flex-wrap gap-4">
        <label
          v-for="type in donationTypes"
          :key="type"
          class="flex items-center gap-2"
        >
          <input
            type="checkbox"
            :value="type"
            v-model="selectedFilters"
            class="w-4 h-4"
          />
          {{ type }}
        </label>

        <!-- Urgent Filter -->
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="urgentFilter" class="w-4 h-4" />
          Urgent
        </label>
      </div>

      <div
        v-if="fetching"
        class="text-center mt-4 flex justify-center items-center gap-3"
      >
        <svg
          class="size-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Memuat data panti ashuan...
      </div>

      <div
        v-else-if="visiblePanti.length === 0"
        class="text-center font-medium text-red-600 text-lg"
      >
        Data panti asuhan tidak ditemukan.
      </div>

      <div class="grid w-full gap-4 grid-cols-1 lg:grid-cols-4">
        <PantiCard
          v-for="panti in visiblePanti"
          :key="panti.id"
          :id="panti.id"
          :name="panti.name"
          :address="panti.address"
          :donationTypes="panti.donation_types"
          :isUrgent="panti.is_urgent"
        />
      </div>

      <div
        v-if="loading"
        class="text-center mt-4 flex justify-center items-center gap-3"
      >
        <svg
          class="size-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Memuat lebih banyak...
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { fetchAllPanti } from "@/services/api-panti";
import PantiCard from "@/components/cards/PantiCard.vue";

// Reactive state
const searchPanti = ref("");
const pantiList = ref([]);
const itemsToShow = ref(8);
const loading = ref(false);

// Filter states
const donationTypes = ["Barang", "Pangan", "Dana", "Tenaga"];
const selectedFilters = ref([]);
const urgentFilter = ref(false); // New state for "Urgent"

// Fetch data
onMounted(async () => {
  try {
    const data = await fetchAllPanti();
    pantiList.value = data.panti_responses;
  } catch (error) {
    console.error("Error fetching panti data:", error);
  }

  // Attach scroll event listener to window
  window.addEventListener("scroll", handleScroll);
});

// Cleanup listener when component unmounts
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Computed: Filtered search results
const filteredPanti = computed(() => {
  let results = pantiList.value;

  // Search filter
  if (searchPanti.value !== "") {
    results = results.filter((panti) =>
      panti.name.toLowerCase().includes(searchPanti.value.toLowerCase())
    );
  }

  // Donation type filter
  if (selectedFilters.value.length > 0) {
    results = results.filter((panti) =>
      selectedFilters.value.some((filter) =>
        panti.donation_types.includes(filter)
      )
    );
  }

  // Urgent filter
  if (urgentFilter.value) {
    results = results.filter((panti) => panti.is_urgent === 1);
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
    await nextTick(); // Ensure Vue updates the DOM before loading more
    setTimeout(() => {
      itemsToShow.value += 8;
      loading.value = false;
    }, 1000); // Simulate API delay
  }
};
</script>
