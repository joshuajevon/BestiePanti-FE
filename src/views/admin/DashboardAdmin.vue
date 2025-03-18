<template>
  <section class="min-h-screen pt-36">
    <LoadingIndicator v-if="fetching" 
      text="Memuat data..." 
      color="text-secondary-500" 
    />

    <div v-else-if="!isAdmin" class="p-6">
      <h1 class="text-4xl font-bold text-center text-red-700 justify-center">
        Kamu Tidak Memiliki Akses
      </h1>
    </div>

    <div v-else class="p-6">
      <!-- Profile Section -->
      <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-10 md:mb-20">
        <img 
          src="/assets/default-profile/admin-profile.jpg" 
          alt="admin-profile" 
          class="w-40 h-40 md:w-52 md:h-52 rounded-full border-2 border-gray-300"
        />

        <div class="text-center md:text-left">
          <h2 class="text-2xl font-bold">{{ authStore.user.name }}</h2>
          <p class="text-gray-600">
            Email: {{ authStore.user.email }}
          </p>
        </div>
      </div>

      <!-- Toggle Buttons -->
      <div class="flex flex-wrap justify-start gap-4 mb-4">
        <button @click="activeTab = 'panti'" 
          :class="{
            'bg-blue-700 text-white rounded-lg': activeTab === 'panti',
            'bg-gray-300 rounded-lg hover:bg-blue-600': activeTab !== 'panti'
            }"
          class="px-4 py-2  transition duration-300">
          Panti Asuhan
        </button>

        <button @click="activeTab = 'donatur'" 
          :class="{
            'bg-blue-700 text-white rounded-lg': activeTab === 'donatur',
            'bg-gray-300 rounded-lg hover:bg-blue-600': activeTab !== 'donatur'
            }"
          class="px-4 py-2  transition duration-300">
          Donatur
        </button>

        <button @click="activeTab = 'fund-donation'" 
          :class="{
            'bg-blue-700 text-white rounded-lg': activeTab === 'fund-donation',
            'bg-gray-300 rounded-lg hover:bg-blue-600': activeTab !== 'fund-donation'
            }"
          class="px-4 py-2  transition duration-300">
          Donasi Dana
        </button>

        <button @click="activeTab = 'nonfund-donation'" 
          :class="{
            'bg-blue-700 text-white rounded-lg': activeTab === 'nonfund-donation',
            'bg-gray-300 rounded-lg hover:bg-blue-600': activeTab !== 'nonfund-donation'
            }"
          class="px-4 py-2  transition duration-300">
          Donasi Non-Dana
        </button>
        
      </div>

      <!-- Conditional Rendering -->
      <PantiTable v-if="activeTab === 'panti'" class="relative" />
      <DonaturTable v-else-if="activeTab === 'donatur'" class="relative" />
      <DonationFundTable v-else-if="activeTab === 'fund-donation'" class="relative" />
      <DonationNonFundTable v-else-if="activeTab === 'nonfund-donation'" class="relative" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import PantiTable from "@/components/dashboard-admin/PantiTable.vue";
import DonaturTable from "@/components/dashboard-admin/DonaturTable.vue";
import DonationFundTable from "@/components/dashboard-admin/DonationFundTable.vue";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import DonationNonFundTable from "@/components/dashboard-admin/DonationNonFundTable.vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const activeTab = ref("panti");
const fetching = ref(true);

const isAdmin = computed(() => {
  return authStore.user?.role === "ROLE_ADMIN";
});

onMounted(async () => {
  await authStore.fetchUser();
  fetching.value = false;
  
  const savedTab = localStorage.getItem("activeTab");
  if (savedTab) {
    activeTabPanti.value = savedTab;
  }
});

watch(activeTab, (newValue) => {
  localStorage.setItem("activeTab", newValue);
});
</script>