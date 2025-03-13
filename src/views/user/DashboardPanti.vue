<template>
  <section class="min-h-screen pt-36">
    <div v-if="!isPanti" class="p-6">
      <h1 class="text-4xl font-bold text-center text-red-700 justify-center">
        Kamu Tidak Memiliki Akses
      </h1>
    </div>

    <div v-else class="p-6">
      <!-- Profile Section Placeholder -->
      <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-10 md:mb-20">
        <!-- Profile Picture Placeholder -->
        <img 
          src="/assets/cara-berdonasi/banner-1.jpg" 
          alt="Profile Picture" 
          class="w-40 h-40 md:w-52 md:h-52 rounded-full border-2 border-gray-300"
        />
        
        <!-- User Info Placeholder -->
        <div class="text-center md:text-left">
          <h2 class="text-2xl font-bold">Nama Pengguna</h2>
          <p class="text-gray-600">Email: user@example.com</p>
          <p class="text-gray-600">Telepon: +62 812-3456-7890</p>
          <p class="text-gray-600">Alamat: Jl Sudirman Raya No 1</p>
          <div class="mt-4 md:text-right">
            <button class="px-4 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-400 transition duration-300">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <!-- Toggle Buttons -->
      <div class="flex flex-wrap justify-start gap-4 mb-4">
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
        
        <button @click="activeTab = 'message'" 
          :class="{
            'bg-blue-700 text-white rounded-lg': activeTab === 'message',
            'bg-gray-300 rounded-lg hover:bg-blue-600': activeTab !== 'message'
            }"
          class="px-4 py-2  transition duration-300">
          Pesan
        </button>
      </div>

      <!-- Conditional Rendering -->
      <DonationFundTable v-if="activeTab === 'fund-donation'" class="relative" />
      <DonationNonFundTable v-else-if="activeTab === 'nonfund-donation'" class="relative" />
      <MessageTable v-else-if="activeTab === 'message'" class="relative" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import DonationFundTable from "@/components/dashboard-panti/DonationFundTable.vue";
import DonationNonFundTable from "@/components/dashboard-panti/DonationNonFundTable.vue";
import MessageTable from "@/components/dashboard-panti/MessageTable.vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const activeTab = ref("fund-donation");

const isPanti = computed(() => {
  return authStore.user?.role === "ROLE_PANTI" ? true : false;
});

onMounted(() => {
  const savedTab = localStorage.getItem("activeTab");
  if (savedTab) {
    activeTab.value = savedTab;
  }
});

watch(activeTab, (newValue) => {
  localStorage.setItem("activeTab", newValue);
});
</script>