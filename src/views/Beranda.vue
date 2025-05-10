<template>
  <section class="bg-primary-50 text-secondary-500 pt-20 lg:pt-24">
    <!-- Success Alert -->
    <div
      class="p-8 fixed z-[100] h-screen w-screen flex justify-end items-end left-0 top-0 pointer-events-none"
    >
      <transition name="slide-fade">
        <SuccessAlert
          v-if="showLoginSuccessAlert"
          text1="Berhasil Masuk!"
          text2="Selamat datang kembali! Anda telah berhasil masuk."
        />
      </transition>

      <transition name="slide-fade">
        <SuccessAlert
          v-if="showRegisterSuccessAlert"
          text1="Pendafataran Berhasil!"
          text2="Akun Anda telah dibuat. Selamat datang!"
        />
      </transition>
    </div>

    <!-- Banner -->
    <section>
      <swiper
        :autoplay="{
          delay: 4000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        :modules="modules"
        :loop="true"
        class="mySwiper h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]"
      >
        <swiper-slide>
          <img
            class="h-full w-full object-cover"
            src="/assets/beranda/banner-1.jpg"
            alt=""
          />
        </swiper-slide>
        <swiper-slide>
          <img
            class="h-full w-full object-cover"
            src="/assets/beranda/banner-2.jpg"
            alt=""
          />
        </swiper-slide>
        <swiper-slide>
          <img
            class="h-full w-full object-cover"
            src="/assets/beranda/banner-3.jpg"
            alt=""
        /></swiper-slide>
        <swiper-slide>
          <img
            class="h-full w-full object-cover"
            src="/assets/beranda/banner-4.jpg"
            alt=""
          />
        </swiper-slide>
        <swiper-slide>
          <img
            class="h-full w-full object-cover"
            src="/assets/beranda/banner-5.jpg"
            alt=""
        /></swiper-slide>
      </swiper>
    </section>

    <!-- Urgent Panti -->
    <section
      class="c-container flex flex-col items-center justify-center gap-8 py-16 lg:py-20 xl:py-24 bg-primary-900"
    >
      <div
        v-motion-slide-visible-once-left
        class="flex flex-col items-center justify-center gap-2 text-center lg:gap-4 xl:gap-6 text-white"
      >
        <h1 class="text-3xl font-bold lg:text-4xl xl:text-5xl">
          Panti Asuhan Darurat
        </h1>
        <p class="text-lg lg:text-xl xl:text-2xl">
          Bantu mereka yang paling membutuhkan, saat mereka membutuhkannya.
        </p>
      </div>

      <LoadingIndicator
        v-if="fetching"
        text="Memuat data panti asuhan..."
        class="text-white"
      />

      <div
        v-else-if="
          pantiList.filter((panti) => panti.is_urgent === 1).length === 0
        "
        class="text-center font-medium text-red-600 text-lg"
      >
        Data panti asuhan tidak ditemukan.
      </div>

      <div
        v-else
        class="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        <PantiCard
          v-for="panti in pantiList
            .filter((panti) => panti.is_urgent === 1)
            .slice(0, 4)"
          :key="panti.id"
          :panti="panti"
        />
      </div>

      <router-link v-motion-slide-visible-once-left :to="{ name: 'panti' }">
        <button class="btn-primary">Lihat Selengkapnya</button>
      </router-link>
    </section>

    <!-- Non-Urgent Panti -->
    <section
      class="c-container flex flex-col items-center justify-center gap-8 py-16 lg:py-20 xl:py-24"
    >
      <div
        v-motion-slide-visible-once-left
        class="flex flex-col items-center justify-center gap-2 text-center lg:gap-4 xl:gap-6"
      >
        <h1 class="text-3xl font-bold lg:text-4xl xl:text-5xl">Panti Asuhan</h1>
        <p class="text-lg lg:text-xl xl:text-2xl">
          Temukan panti yang membutuhkan, wujudkan kepedulian dengan berbagi.
        </p>
      </div>

      <LoadingIndicator
        v-if="fetching"
        text="Memuat data panti asuhan..."
        color="text-secondary-500"
      />

      <div
        v-else-if="
          pantiList.filter((panti) => panti.is_urgent === 0).length === 0
        "
        class="text-center font-medium text-red-600 text-lg"
      >
        Data panti asuhan tidak ditemukan.
      </div>

      <div
        v-else
        class="grid w-full gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        <PantiCard
          v-for="panti in pantiList
            .filter((panti) => panti.is_urgent === 0)
            .slice(0, 4)"
          :key="panti.id"
          :panti="panti"
        />
      </div>

      <router-link v-motion-slide-visible-once-left :to="{ name: 'panti' }">
        <button class="btn-primary">Lihat Selengkapnya</button>
      </router-link>
    </section>

    <!-- Cara Berdonasi -->
    <section
      class="c-container bg-primary-900 py-16 text-white lg:py-20 xl:py-24"
    >
      <div class="flex flex-col items-center gap-12 lg:flex-row">
        <img
          v-motion-fade-visible-once
          src="/assets/beranda/banner-3.jpg"
          alt=""
          class="h-auto w-full rounded-xl lg:h-96 lg:w-auto"
        />

        <div
          v-motion-slide-visible-once-left
          class="flex flex-col justify-center gap-8"
        >
          <div class="flex flex-col justify-center gap-3">
            <h1 class="text-3xl font-bold text-white lg:text-4xl xl:text-5xl">
              Ingin Berdonasi?
            </h1>

            <p class="text-primary text-lg text-secondary-300 lg:text-xl">
              Membantu mereka yang membutuhkan kini lebih mudah! Pilih jenis
              donasi, tentukan panti asuhan tujuan, dan kirim bantuan Anda hanya
              dalam beberapa langkah.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-4 lg:gap-6">
            <div>
              <router-link :to="{ name: 'caraBerdonasi' }">
                <button class="btn-primary">Baca Selengkapnya</button>
              </router-link>
            </div>

            <div v-if="!authStore.isAuthenticated()">
              <router-link :to="{ name: 'register' }">
                <button class="btn-secondary">Daftar Sekarang</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tentang Kami -->
    <section
      v-motion-slide-visible-once-left
      class="c-container flex flex-col items-center justify-center gap-8 py-16 lg:py-20 xl:py-24"
    >
      <img
        src="/assets/logos/logo-icon-text-color.svg"
        alt="logo"
        class="w-56 lg:w-60 xl:w-64"
      />

      <div class="flex flex-col items-center justify-center gap-4 text-center">
        <h1 class="text-3xl font-bold lg:text-4xl xl:text-5xl">
          Siapa itu <span class="text-primary-300">BestiePanti</span>?
        </h1>

        <p class="text-primary text-lg text-secondary-300 lg:text-xl">
          Kami datang sebagai platform manajemen donasi yang berkomitmen untuk
          menjadi jembatan kebaikan antara para donatur dan panti asuhan di
          Jabodetabek.
        </p>
      </div>

      <router-link :to="{ name: 'tentangKami' }">
        <button class="btn-primary">Baca Selengkapnya</button>
      </router-link>
    </section>

    <!-- Hubungi Kami -->
    <section
      v-motion-slide-visible-once-left
      class="c-container flex flex-col items-center justify-center gap-8 py-16 lg:py-20 xl:py-24 bg-secondary-100"
    >
      <div class="flex flex-col items-center justify-center gap-4 text-center">
        <h1 class="text-3xl font-bold lg:text-4xl xl:text-5xl">
          Punya pertanyaan atau
          <span class="text-primary-300">butuh bantuan</span>?
        </h1>

        <p class="text-primary text-lg text-secondary-300 lg:text-xl">
          Jangan ragu untuk menghubungi kami! Kami siap membantu menjawab
          pertanyaan dan memberikan solusi terbaik untuk Anda.
        </p>
      </div>

      <a
        :href="`https://wa.me/6287876731950`"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-primary gap-2"
      >
        <svg
          class="size-6 lg:size-7"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
          />
        </svg>
        Hubungi Kami
      </a>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchAllPanti } from "@/services/api-panti";
import PantiCard from "@/components/cards/PantiCard.vue";
import { useAuthStore } from "@/stores/authStore";

import "@/assets/swiper.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import SuccessAlert from "@/components/alerts/SuccessAlert.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const modules = [Autoplay, Pagination, Navigation];
const authStore = useAuthStore();
const pantiList = ref([]);
const fetching = ref(true);

const showLoginSuccessAlert = ref(false);
const showRegisterSuccessAlert = ref(false);

const handleLoginSuccess = () => {
  router.replace({ query: {} });
  showLoginSuccessAlert.value = true;

  setTimeout(() => {
    showLoginSuccessAlert.value = false;
  }, 3000);
};

const handleRegisterSuccess = () => {
  router.replace({ query: {} });
  showRegisterSuccessAlert.value = true;

  setTimeout(() => {
    showRegisterSuccessAlert.value = false;
  }, 3000);
};

onMounted(async () => {
  if (route.query.showLoginSuccessAlert) {
    handleLoginSuccess();
  } else if (route.query.showRegisterSuccessAlert) {
    handleRegisterSuccess();
  }

  try {
    const data = await fetchAllPanti();
    pantiList.value = data.panti_responses;
  } catch (error) {
    console.log(error);
  } finally {
    fetching.value = false;
  }
});
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
