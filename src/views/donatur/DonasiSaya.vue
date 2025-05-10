<template>
  <section class="min-h-screen pt-36 md:pt-40">
    <LoadingIndicator v-if="fetching" 
      text="Memuat data..." 
      color="text-secondary-500" 
    />

    <div v-else>
      <div v-if="!isDonatur" class="p-6">
        <h1 class="text-4xl font-bold text-center text-red-700">
          Kamu Tidak Memiliki Akses
        </h1>
      </div>

      <div v-else class="p-6">
        <!-- profile section -->
        <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-10 md:mb-20">
          <img 
            :src="authStore.user?.profile 
              ? `${apiUrl}/storage/profile/${authStore.user.profile}` 
              : '/assets/default-profile/profile.jpg'"
            :alt="`${authStore.user?.name || 'User'}'image`" 
            class="w-40 h-40 md:w-52 md:h-52 rounded-full border-2 border-gray-300"
          />

          <div class="text-center md:text-left">
            <h2 class="text-2xl font-bold">{{ authStore.user?.name }}</h2>
            <p class="text-gray-600">Email: {{ authStore.user?.email }}</p>
            <p class="text-gray-600">Telepon: {{ authStore.user?.phone || '-' }}</p>
            <p class="text-gray-600 break-words whitespace-pre-line">
              Alamat: {{ formatAddress(authStore.user?.address)}}
            </p>
           <router-link
              :to="{ name: 'ubah-profile-donatur' }"
              class="inline-block mt-4 px-4 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-400 transition duration-300 text-center min-w-[180px] max-w-[95%]"
            >
              Ubah Profil
            </router-link>
          </div>
        </div>

        <!-- Toggle Buttons -->
        <div class="flex flex-wrap justify-start gap-4 mb-4">
          <button @click="activeTabDonaturTab = 'fund-donation'" 
            :class="{
              'bg-blue-700 text-white rounded-lg': activeTabDonaturTab === 'fund-donation',
              'bg-gray-300 rounded-lg hover:bg-blue-600': activeTabDonaturTab !== 'fund-donation'
            }"
            class="px-4 py-2 transition duration-300">
            Donasi Dana
          </button>

          <button @click="activeTabDonaturTab = 'nonfund-donation'" 
            :class="{
              'bg-blue-700 text-white rounded-lg': activeTabDonaturTab === 'nonfund-donation',
              'bg-gray-300 rounded-lg hover:bg-blue-600': activeTabDonaturTab !== 'nonfund-donation'
            }"
            class="px-4 py-2 transition duration-300">
            Donasi Non-Dana
          </button>
        </div>

        <!-- Conditional Rendering -->
        <FundDonationCard v-if="activeTabDonaturTab === 'fund-donation'" class="relative" />
        <NonFundDonationCard v-else-if="activeTabDonaturTab === 'nonfund-donation'" class="relative" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import FundDonationCard from "@/components/dashboard-donatur/FundDonationTable.vue";
import NonFundDonationCard from "@/components/dashboard-donatur/NonFundDonationTable.vue";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const activeTabDonaturTab = ref("fund-donation");
const apiUrl = import.meta.env.VITE_API_URL;
const fetching = ref(true);

const isDonatur = computed(() => {
  return authStore.user?.role === "ROLE_DONATUR";
});

function formatAddress(address, wordsPerLine = 4) {
  if (!address) return "-"
  const words = address.split(" ")
  const lines = []
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(" "))
  }
  return lines.join("\n")
}

onMounted(async () => {
    await authStore.fetchUser();
    fetching.value = false;

    const savedTab = localStorage.getItem("activeTabDonaturTab");
    if (savedTab) {
      activeTabDonaturTab.value = savedTab;
    }
});

watch(activeTabDonaturTab, (newValue) => {
  localStorage.setItem("activeTabDonaturTab", newValue);
});
</script>