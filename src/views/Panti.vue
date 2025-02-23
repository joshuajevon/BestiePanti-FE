<template>
  <section class="bg-primary-50 text-secondary-500">
    <!-- Panti -->
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

      <div class="w-full">
        <input
          type="search"
          id="search-panti"
          name="search-panti"
          v-model="searchPanti"
          placeholder="Cari panti asuhan"
        />
      </div>

      <div
        v-if="filteredPanti.length === 0"
        class="text-center font-medium text-red-600 text-lg"
      >
        Data panti asuhan tidak ditemukan.
      </div>

      <div v-else class="grid w-full gap-4 grid-cols-1 lg:grid-cols-4">
        <PantiCard
          v-for="panti in filteredPanti || []"
          :key="panti.id"
          :id="panti.id"
          :name="panti.name"
          :address="panti.address"
          :donationTypes="panti.donation_types"
        />
      </div>

      <!-- <button
        class="btn-primary pointer-events-none opacity-50"
        @click="loadMorePanti"
        disabled
      >
        Lihat Lebih Banyak
      </button> -->
    </section>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchAllPanti } from "@/services/api-panti";
import PantiCard from "@/components/cards/PantiCard.vue";

// Reactive state
const searchPanti = ref(""); // Search query
const pantiList = ref([]); // List of all panti asuhan

// Fetch data when component mounts
onMounted(async () => {
  try {
    const data = await fetchAllPanti();
    pantiList.value = data.panti_responses;
  } catch (error) {
    console.error("Error fetching panti data:", error);
  }
});

// Computed property for filtered search results
const filteredPanti = computed(() =>
  pantiList.value.filter((panti) =>
    panti.name.toLowerCase().includes(searchPanti.value.toLowerCase())
  )
);
</script>

<style></style>
