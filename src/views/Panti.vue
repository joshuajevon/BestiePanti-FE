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

// Filter states
const donationTypes = ["Barang", "Pangan", "Dana", "Tenaga"];
const selectedFilters = ref([]);
const urgentFilter = ref(false);

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

  if (selectedFilters.value.length > 0) {
    results = results.filter((panti) =>
      selectedFilters.value.some((filter) =>
        panti.donation_types.includes(filter)
      )
    );
  }

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
    await nextTick();
    setTimeout(() => {
      itemsToShow.value += 8;
      loading.value = false;
    }, 1000);
  }
};
</script>
