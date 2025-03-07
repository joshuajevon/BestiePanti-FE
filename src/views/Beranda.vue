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
        class="mySwiper h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] xl:h-[700px]"
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

      <router-link :to="{ name: 'panti' }">
        <button class="btn-primary">Lihat Selengkapnya</button>
      </router-link>
    </section>

    <!-- Non-Urgent Panti -->
    <section
      class="c-container flex flex-col items-center justify-center gap-8 py-16 lg:py-20 xl:py-24"
    >
      <div
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

      <router-link :to="{ name: 'panti' }">
        <button class="btn-primary">Lihat Selengkapnya</button>
      </router-link>
    </section>

    <!-- Cara Berdonasi -->
    <section
      class="c-container bg-primary-900 py-16 text-white lg:py-20 xl:py-24"
    >
      <div class="flex flex-col items-center gap-12 lg:flex-row">
        <img
          src="/assets/beranda/banner-3.jpg"
          alt=""
          class="h-auto w-full rounded-xl lg:h-96 lg:w-auto"
        />

        <div class="flex flex-col justify-center gap-8">
          <div class="flex flex-col justify-center gap-3">
            <h1 class="text-3xl font-bold text-white lg:text-4xl xl:text-5xl">
              Ingin Berdonasi?
            </h1>

            <p
              class="text-primary text-lg text-secondary-300 lg:text-xl xl:text-2xl"
            >
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

        <p
          class="text-primary text-lg text-secondary-300 lg:text-xl xl:text-2xl"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni
          inventore quis sed, reiciendis, ut consequatur totam eveniet eaque
          quae voluptatibus earum optio sequi ipsam. Eveniet necessitatibus
          facilis ipsam ratione et?
        </p>
      </div>

      <router-link :to="{ name: 'tentangKami' }">
        <button class="btn-primary">Baca Selengkapnya</button>
      </router-link>
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
