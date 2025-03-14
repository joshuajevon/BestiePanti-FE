<template>
  <section class="min-h-screen pt-36">
    <div v-if="!isDonatur" class="p-6">
      <h1 class="text-4xl font-bold text-center text-red-700 justify-center">
        Kamu Tidak Memiliki Akses
      </h1>
    </div>

    <div v-else class="p-6">
      <!-- Profile Section Placeholder -->
      <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-10 md:mb-20">
        <!-- Profile Picture Placeholder -->
        <img 
          :src="`${apiUrl}/storage/profile/${authStore.user.profile}`"
          :alt="`${authStore.user?.name || 'User'}'image`" 
          class="w-40 h-40 md:w-52 md:h-52 rounded-full border-2 border-gray-300"
        />
        
        <!-- User Info Placeholder -->
        <div class="text-center md:text-left">
          <h2 class="text-2xl font-bold">{{ authStore.user.name }}</h2>
          <p class="text-gray-600">Email: {{ authStore.user.email }}</p>
          <p class="text-gray-600">Telepon: {{ authStore.user.phone }}</p>
          <p class="text-gray-600">Alamat: {{ authStore.user.address }}</p>
          <div class="mt-4 md:text-right">
            <button class="px-4 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-400 transition duration-300">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <!-- Toggle Buttons -->
      <div class="flex flex-wrap justify-start gap-4 mb-4">
        <button @click="activeTabDonatur = 'fund-donation'" 
          :class="{
            'bg-blue-700 text-white rounded-lg': activeTabDonatur === 'fund-donation',
            'bg-gray-300 rounded-lg hover:bg-blue-600': activeTabDonatur !== 'fund-donation'
            }"
          class="px-4 py-2  transition duration-300">
          Donasi Dana
        </button>

        <button @click="activeTabDonatur = 'nonfund-donation'" 
          :class="{
            'bg-blue-700 text-white rounded-lg': activeTabDonatur === 'nonfund-donation',
            'bg-gray-300 rounded-lg hover:bg-blue-600': activeTabDonatur !== 'nonfund-donation'
            }"
          class="px-4 py-2  transition duration-300">
          Donasi Non-Dana
        </button>
        
      </div>

      <!-- Conditional Rendering -->
      <FundDonationCard v-if="activeTabDonatur === 'fund-donation'" class="relative" />
      <NonFundDonationCard v-else-if="activeTabDonatur === 'nonfund-donation'" class="relative" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import FundDonationCard from "@/components/cards/FundDonationCard.vue";
import NonFundDonationCard from "@/components/cards/NonFundDonationCard.vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const activeTabDonatur = ref("fund-donation");
const apiUrl = import.meta.env.VITE_API_URL;

const isDonatur = computed(() => {
  return authStore.user?.role === "ROLE_DONATUR" ? true : false;
});

onMounted(() => {
  const savedTab = localStorage.getItem("activeTabDonatur");
  if (savedTab) {
    activeTabDonatur.value = savedTab;
  }
});

watch(activeTabDonatur, (newValue) => {
  localStorage.setItem("activeTabDonatur", newValue);
});
</script>