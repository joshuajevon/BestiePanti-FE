<template>
  <router-link class="w-fit" :to="{ name: 'pantiDetail', params: { id: id } }">
    <div
      class="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 transition hover:bg-primary-300 group"
    >
      <img
        class="rounded-lg object-cover"
        src="/assets/beranda/banner-4.jpg"
        alt=""
      />

      <div class="flex w-full flex-col gap-1">
        <h2
          class="group-hover:text-white line-clamp-1 text-center text-2xl font-bold"
        >
          {{ name }}
        </h2>
        <p class="group-hover:text-white line-clamp-2">
          {{ address }}
        </p>

        <p class="group-hover:text-white line-clamp-2">
          {{ donationTypes }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from "vue";

// Define props for the component
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  donationTypes: {
    type: Object,
    required: true,
  },
});
</script>

<style></style>
