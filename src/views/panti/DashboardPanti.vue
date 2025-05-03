<template>
  <section class="min-h-screen pt-36 md:pt-40">
    <LoadingIndicator v-if="fetching" 
      text="Memuat data..." 
      color="text-secondary-500" 
    />
    
    <div v-else-if="!isPanti" class="p-6">
      <h1 class="text-4xl font-bold text-center text-red-700">
        Kamu Tidak Memiliki Akses
      </h1>
    </div>

    <div v-else class="p-6">
      <!-- Profile Section -->
      <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-10 md:mb-20">
        <img 
          :src="`${apiUrl}/storage/image/${authStore.user.image[0]}`"
          :alt="`${authStore.user?.name || 'User'}' image`" 
          class="w-40 h-40 md:w-52 md:h-52 rounded-full border-2 border-gray-300"
        />
        
        <!-- User Info Placeholder -->
        <div class="text-center md:text-left">
          <h2 class="text-2xl font-bold">{{ authStore.user.name }}</h2>
          <p class="text-gray-600">Email: {{ authStore.user.email }}</p>
          <p class="text-gray-600">Telepon: {{ authStore.user.phone }}</p>
          <p class="text-gray-600">Alamat: {{ authStore.user.address }}</p>
          <div class="mt-4 md:text-right">
            <router-link
                  :to="{ name: 'ubah-profile-panti' }"
                  class="px-4 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-400 transition duration-300"
              >
                Ubah Profil
              </router-link>
          </div>
        </div>
      </div>

      <!-- Toggle Buttons -->
      <div class="flex flex-wrap justify-start gap-4 mb-4">
        <button @click="activeTabPantiTab = 'fund-donation'" 
          :class="{
            'bg-blue-700 text-white rounded-lg': activeTabPantiTab === 'fund-donation',
            'bg-gray-300 rounded-lg hover:bg-blue-600': activeTabPantiTab !== 'fund-donation'
            }"
          class="px-4 py-2 transition duration-300">
          Donasi Dana
        </button>

        <button @click="activeTabPantiTab = 'nonfund-donation'" 
          :class="{
            'bg-blue-700 text-white rounded-lg': activeTabPantiTab === 'nonfund-donation',
            'bg-gray-300 rounded-lg hover:bg-blue-600': activeTabPantiTab !== 'nonfund-donation'
            }"
          class="px-4 py-2 transition duration-300">
          Donasi Non-Dana
        </button>
        
        <button @click="activeTabPantiTab = 'message'" 
          :class="{
            'bg-blue-700 text-white rounded-lg': activeTabPantiTab === 'message',
            'bg-gray-300 rounded-lg hover:bg-blue-600': activeTabPantiTab !== 'message'
            }"
          class="px-4 py-2 transition duration-300">
          Pesan
        </button>
      </div>

      <!-- Conditional Rendering -->
      <DonationFundTable v-if="activeTabPantiTab === 'fund-donation'" class="relative" />
      <DonationNonFundTable v-else-if="activeTabPantiTab === 'nonfund-donation'" class="relative" />
      <MessageTable v-else-if="activeTabPantiTab === 'message'" class="relative" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import DonationFundTable from "@/components/dashboard-panti/DonationFundTable.vue";
import DonationNonFundTable from "@/components/dashboard-panti/DonationNonFundTable.vue";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import MessageTable from "@/components/dashboard-panti/MessageTable.vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const activeTabPantiTab = ref("fund-donation");
const apiUrl = import.meta.env.VITE_API_URL;
const fetching = ref(true);

const isPanti = computed(() => {
  return authStore.user?.role === "ROLE_PANTI";
});

onMounted(async () => {
  await authStore.fetchUser();
  fetching.value = false;
  
  const savedTab = localStorage.getItem("activeTabPantiTab");
  if (savedTab) {
    activeTabPantiTab.value = savedTab;
  }
});

watch(activeTabPantiTab, (newValue) => {
  localStorage.setItem("activeTabPantiTab", newValue);
});
</script>
