<template>
  <section class="bg-primary-50 text-secondary-500">
    <!-- Panti -->
    <section
      class="c-container flex flex-col items-center justify-center gap-8 pb-16 pt-32 lg:pb-20 lg:pt-36 xl:pb-24 xl:pt-40"
    >
      <div
        class="flex flex-col items-center justify-center gap-2 text-center lg:gap-4 xl:gap-6"
      >
        <h1 class="text-3xl font-bold lg:text-4xl xl:text-5xl">Panti Asuhan</h1>
        <p class="text-lg lg:text-xl xl:text-2xl">
          Temukan panti yang membutuhkan, wujudkan kepedulian dengan berbagi.
        </p>
      </div>

      <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <PantiCard />
        <PantiCard />
        <PantiCard />
        <PantiCard />
        <PantiCard />
        <PantiCard />
        <PantiCard />
      </div>

      <button
        class="btn-primary pointer-events-none opacity-50"
        @click="loadMorePanti"
        disabled
      >
        Lihat Lebih Banyak
      </button>
    </section>
  </section>
</template>

<script setup>
import PantiCard from "@/components/cards/PantiCard.vue";

function loadMorePanti() {}
</script>

<style></style>
