<template>
  <router-link
    class="w-full h-full"
    :to="{ name: 'pantiDetail', params: { id: panti.id } }"
  >
    <div
      class="flex flex-col items-center justify-center gap-4 rounded-xl lg:rounded-2xl bg-white p-4 lg:p-5 xl:p-6 transition hover:bg-primary-300 group h-full"
    >
      <div class="flex w-full">
        <UrgentBadge v-if="panti?.is_urgent === 1" />
        <NotUrgentBadge v-if="panti?.is_urgent === 0" />
      </div>

      <div class="w-full aspect-video">
        <img
          v-if="panti?.image"
          class="rounded-md lg:rounded-lg object-cover w-full h-full"
          :src="`${apiUrl}/storage/image/${panti.image}`"
          :alt="`${panti?.name || 'Panti'}'s image`"
        />
      </div>

      <div class="flex w-full flex-col gap-2">
        <h2
          class="group-hover:text-white line-clamp-1 text-center text-lg lg:text-xl font-bold"
        >
          {{ panti?.name || "Unknown Panti" }}
        </h2>
        <p class="group-hover:text-white line-clamp-2 text-xs lg:text-sm">
          {{ panti?.address || "No Address Available" }}
        </p>

        <div class="flex flex-wrap gap-1 mt-2">
          <NoneBadge
            v-if="!panti?.donation_types || panti.donation_types.length === 0"
          />
          <BarangBadge v-if="panti?.donation_types?.includes('Barang')" />
          <DanaBadge v-if="panti?.donation_types?.includes('Dana')" />
          <PanganBadge v-if="panti?.donation_types?.includes('Pangan')" />
          <TenagaBadge v-if="panti?.donation_types?.includes('Tenaga')" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import UrgentBadge from "../badges/UrgentBadge.vue";
import NotUrgentBadge from "../badges/NotUrgentBadge.vue";
import DanaBadge from "../badges/DanaBadge.vue";
import BarangBadge from "../badges/BarangBadge.vue";
import PanganBadge from "../badges/PanganBadge.vue";
import TenagaBadge from "../badges/TenagaBadge.vue";
import NoneBadge from "../badges/NoneBadge.vue";

const apiUrl = import.meta.env.VITE_API_URL;

defineProps({
  panti: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});
</script>
