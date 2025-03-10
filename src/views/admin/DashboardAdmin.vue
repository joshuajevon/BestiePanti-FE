<template>
  <section class="min-h-screen pt-36">
    <div class="p-6">
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
        <button @click="activeTab = 'panti'" 
          :class="{'bg-blue-700 text-white rounded-lg': activeTab === 'panti', 'bg-gray-300 rounded-lg hover:bg-blue-600': activeTab !== 'panti'}"
          class="px-4 py-2  transition duration-300">
          Panti Asuhan
        </button>
        <button @click="activeTab = 'donatur'" 
          :class="{'bg-blue-700 text-white rounded-lg': activeTab === 'donatur', 'bg-gray-300 rounded-lg hover:bg-blue-600': activeTab !== 'donatur'}"
          class="px-4 py-2  transition duration-300">
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