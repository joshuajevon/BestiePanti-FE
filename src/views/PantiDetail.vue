<template>
  <section class="bg-primary-50 text-secondary-500">
    <!-- Form Dana -->
    <section
      v-show="isFormDanaOpen"
      class="c-container fixed z-[100] h-screen w-screen bg-black/80"
    >
      <form
        action=""
        method=""
        class="flex h-full w-full items-center justify-center"
        onsubmit=""
      >
        <div
          class="h-max-[80vh] flex w-full max-w-screen-xl flex-col gap-8 rounded-xl bg-white p-8 sm:rounded-2xl sm:p-12 lg:rounded-3xl lg:p-16"
        >
          <!-- Title -->
          <div
            class="flex w-full flex-col items-center justify-center gap-2 border-b-2 border-b-secondary-500 px-4 pb-5 sm:gap-3 lg:gap-4"
          >
            <h1
              class="pb-2 text-center text-4xl font-medium leading-9 sm:text-5xl lg:text-6xl"
            >
              Formulir
              <span class="font-bold text-primary-300">Donasi Dana</span>
            </h1>
            <p class="text-center text-base sm:text-lg">
              Silakan lengkapi form pendaftaran berikut. Akun pengguna yang
              didaftarkan
              <span class="font-bold">harus atas nama perorangan</span>.
            </p>
          </div>

          <div class="flex w-full flex-col items-start justify-center gap-6">
            <!-- Email Address -->
            <div class="input-container mt-2">
              <label
                for="email"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Email
              </label>

              <input
                type="email"
                autocomplete="false"
                id="email"
                name="email"
                placeholder="Masukkan alamat email"
                class="autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]' mt-1 w-full rounded-md border border-secondary-500 bg-white p-4 text-sm sm:text-base"
              />
              <p id="email-error-message" class="error-message"></p>
            </div>
          </div>

          <div class="flex items-center justify-center gap-4">
            <button class="btn-secondary" type="button" @click="closeFormDana">
              Tutup
            </button>
            <button class="btn-primary" type="submit">Kirim</button>
          </div>
        </div>
      </form>
    </section>

    <!-- Form Non Dana -->
    <section
      v-show="isFormNonDanaOpen"
      class="c-container fixed z-[100] h-screen w-screen bg-black/80"
    >
      <form
        action=""
        method=""
        class="flex h-full w-full items-center justify-center"
        onsubmit=""
      >
        <div
          class="h-max-[80vh] flex w-full max-w-screen-xl flex-col gap-8 rounded-xl bg-white p-8 sm:rounded-2xl sm:p-12 lg:rounded-3xl lg:p-16"
        >
          <!-- Title -->
          <div
            class="flex w-full flex-col items-center justify-center gap-2 border-b-2 border-b-secondary-500 px-4 pb-5 sm:gap-3 lg:gap-4"
          >
            <h1
              class="pb-2 text-center text-4xl font-medium leading-9 sm:text-5xl lg:text-6xl"
            >
              Formulir
              <span class="font-bold text-primary-300">Donasi Non Dana</span>
            </h1>
            <p class="text-center text-base sm:text-lg">
              Silakan lengkapi form pendaftaran berikut. Akun pengguna yang
              didaftarkan
              <span class="font-bold">harus atas nama perorangan</span>.
            </p>
          </div>

          <div class="flex w-full flex-col items-start justify-center gap-6">
            <!-- Email Address -->
            <div class="input-container mt-2">
              <label
                for="email"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Email
              </label>

              <input
                type="email"
                autocomplete="false"
                id="email"
                name="email"
                placeholder="Masukkan alamat email"
                class="autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]' mt-1 w-full rounded-md border border-secondary-500 bg-white p-4 text-sm sm:text-base"
              />
              <p id="email-error-message" class="error-message"></p>
            </div>
          </div>

          <div class="flex items-center justify-center gap-4">
            <button
              class="btn-secondary"
              type="button"
              @click="closeFormNonDana"
            >
              Tutup
            </button>
            <button class="btn-primary" type="submit">Kirim</button>
          </div>
        </div>
      </form>
    </section>

    <!-- Form Pesan -->
    <section
      v-show="isFormPesanOpen"
      class="c-container fixed z-[100] h-screen w-screen bg-black/80"
    >
      <form
        method="POST"
        class="flex h-full w-full items-center justify-center"
        @submit.prevent="submitMessage()"
      >
        js
        <div
          class="h-max-[80vh] flex w-full max-w-screen-xl flex-col gap-8 rounded-xl bg-white p-8 sm:rounded-2xl sm:p-12 lg:rounded-3xl lg:p-16"
        >
          <!-- Title -->
          <div
            class="flex w-full flex-col items-center justify-center gap-2 border-b-2 border-b-secondary-500 px-4 pb-5 sm:gap-3 lg:gap-4"
          >
            <h1
              class="pb-2 text-center text-4xl font-medium leading-9 sm:text-5xl lg:text-6xl"
            >
              Formulir
              <span class="font-bold text-primary-300">Kirim Pesan</span>
            </h1>
            <p class="text-center text-base sm:text-lg">
              Silakan menulis pesan yang ingin disampaikan kepada panti asuhan
              terkait.
            </p>
          </div>

          <div class="flex w-full flex-col items-start justify-center gap-6">
            <!-- Message -->
            <div class="input-container mt-2">
              <label
                for="message"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Pesan
              </label>

              <textarea
                name="message"
                id="message"
                class="autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]' mt-1 w-full rounded-md border border-secondary-500 bg-white text-sm sm:text-base"
                placeholder="Masukkan pesan"
                rows="5"
                v-model="form.message"
              ></textarea>
              <p id="message-error-message" class="error-message">
                {{ state.errorMessage }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-center gap-4">
            <button class="btn-secondary" type="button" @click="closeFormPesan">
              Tutup
            </button>
            <button class="btn-primary" type="submit">Kirim</button>
          </div>
        </div>
      </form>
    </section>

    <!-- Title -->
    <section
      class="c-container flex flex-col items-center justify-center gap-8 pb-8 pt-32 lg:pb-12 lg:pt-36 xl:pb-16 xl:pt-40"
    >
      <div
        class="flex flex-col items-center justify-center gap-2 text-center lg:gap-4 xl:gap-6"
      >
        <h1 v-if="panti" class="text-3xl font-bold lg:text-4xl xl:text-5xl">
          {{ panti.name || "" }}
        </h1>
        <p v-if="panti" class="text-lg lg:text-xl xl:text-2xl">
          {{ panti.address || "" }}
        </p>
      </div>
    </section>

    <!-- Image Carousel -->
    <section class="c-container pb-8 lg:pb-12 xl:pb-16">
      <swiper
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        :modules="modules"
        :loop="true"
        class="mySwiper h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[800px]"
      >
        <swiper-slide
          v-if="panti"
          v-for="(image, index) in panti.image"
          :key="index"
        >
          <img
            class="h-full w-full object-contain"
            :src="`${apiUrl}/uploads/image/${image}`"
            alt="Panti Image"
          />
        </swiper-slide>
      </swiper>
    </section>

    <!-- Details -->
    <section
      class="c-container flex flex-col items-center justify-center gap-8 pb-8 lg:pb-12 xl:pb-16"
    >
      <div class="flex flex-wrap items-center justify-center gap-4">
        <button class="btn-primary" @click="openFormDana">Donasi Dana</button>
        <button class="btn-primary" @click="openFormNonDana">
          Donasi Non Dana
        </button>
        <button class="btn-primary" @click="openFormPesan">Kirim Pesan</button>
      </div>

      <div class="w-full">
        <p
          v-if="panti"
          class="text-justify text-lg text-secondary-500 lg:text-xl xl:text-2xl"
        >
          {{ panti.description }}
        </p>
      </div>
    </section>

    <!-- Pesan -->
    <section
      class="c-container flex flex-col items-center justify-center gap-8 pb-16 lg:pb-20 xl:pb-24"
    >
      <div
        class="flex w-full items-center justify-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8"
      >
        <h1 class="text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl">
          Pesan
        </h1>
        <div class="h-0.5 flex-1 bg-secondary-500"></div>
      </div>

      <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <PesanCard />
      </div>

      <button
        class="btn-primary pointer-events-none opacity-50"
        @click="loadMorePesan"
        disabled
      >
        Lihat Lebih Banyak
      </button>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import PesanCard from "@/components/cards/PesanCard.vue";
import { fetchPantiById } from "@/services/api-panti";
import { createMessage } from "@/services/api-message";

import "@/assets/swiper.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const modules = [Pagination, Navigation];

const apiUrl = import.meta.env.VITE_API_URL;
const route = useRoute();
const pantiId = route.params.id;
const panti = ref(null);

const isFormDanaOpen = ref(false);
const isFormNonDanaOpen = ref(false);
const isFormPesanOpen = ref(false);

const form = reactive({
  message: "",
});

const state = reactive({
  errorMessage: "",
});

const submitMessage = async () => {
  try {
    const success = await createMessage(pantiId, form.message);
    if (success) {
      form.message = "";
      state.errorMessage = "";
      closeFormPesan();
    }
  } catch (error) {
    state.errorMessage = error.message;
  }
};

function openFormDana() {
  isFormDanaOpen.value = true;
}

function openFormNonDana() {
  isFormNonDanaOpen.value = true;
}

function openFormPesan() {
  isFormPesanOpen.value = true;
}

function closeFormDana() {
  isFormDanaOpen.value = false;
}

function closeFormNonDana() {
  isFormNonDanaOpen.value = false;
}

function closeFormPesan() {
  isFormPesanOpen.value = false;
}

function loadMorePesan() {}

onMounted(async () => {
  try {
    const data = await fetchPantiById(pantiId);
    panti.value = data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<style></style>
