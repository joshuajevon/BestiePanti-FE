<template>
  <router-link class="w-fit" :to="{ name: 'pantiDetail', params: { id: id } }">
    <div
      class="flex flex-col items-center justify-center gap-4 rounded-xl lg:rounded-2xl bg-white p-4 lg:p-5 xl:P-6 transition hover:bg-primary-300 group"
    >
      <div class="flex w-full">
        <UrgentBadge v-if="isUrgent === 1" />
        <NotUrgentBadge v-if="isUrgent === 0" />
      </div>

      <img
        class="rounded-md lg:rounded-lg object-cover"
        src="/assets/beranda/banner-4.jpg"
        alt=""
      />

      <div class="flex w-full flex-col gap-2">
        <h2
          class="group-hover:text-white line-clamp-1 text-center text-lg lg:text-xl font-bold"
        >
          {{ name }}
        </h2>
        <p class="group-hover:text-white line-clamp-2 text-xs lg:text-sm">
          {{ address }}
        </p>

        <div class="flex flex-wrap gap-1 mt-2">
          <NoneBadge v-if="donationTypes.length === 0" />
          <BarangBadge v-if="donationTypes.includes('Barang')" />
          <DanaBadge v-if="donationTypes.includes('Dana')" />
          <PanganBadge v-if="donationTypes.includes('Pangan')" />
          <TenagaBadge v-if="donationTypes.includes('Tenaga')" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from "vue";
import UrgentBadge from "../badges/UrgentBadge.vue";
import NotUrgentBadge from "../badges/NotUrgentBadge.vue";
import DanaBadge from "../badges/DanaBadge.vue";
import BarangBadge from "../badges/BarangBadge.vue";
import PanganBadge from "../badges/PanganBadge.vue";
import TenagaBadge from "../badges/TenagaBadge.vue";
import NoneBadge from "../badges/NoneBadge.vue";

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
  isUrgent: {
    type: Number,
    required: true,
  },
});
</script>

<style></style>
