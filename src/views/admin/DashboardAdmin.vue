<template>
  <section class="min-h-screen pt-36">
    <div class="p-6">
      <div class="flex gap-4 mb-4">
        <button @click="activeTab = 'panti'" 
          :class="{'bg-blue-700 text-white': activeTab === 'panti', 'bg-gray-300': activeTab !== 'panti'}"
          class="px-4 py-2 rounded">
          Panti Asuhan
        </button>
        <button @click="activeTab = 'donatur'" 
          :class="{'bg-blue-700 text-white': activeTab === 'donatur', 'bg-gray-300': activeTab !== 'donatur'}"
          class="px-4 py-2 rounded">
          Donatur
        </button>
      </div>
      
      <!-- Conditional Rendering -->
      <PantiTable v-if="activeTab === 'panti'" class="relative" />
      <DonaturTable v-else class="relative" />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import PantiTable from "@/components/dashboard/PantiTable.vue";
import DonaturTable from "@/components/dashboard/DonaturTable.vue";

const activeTab = ref("panti");
</script>
