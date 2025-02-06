<template>
  <section class="bg-primary-50 text-secondary-500">
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
        class="mySwiper h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px]"
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
            alt="" /></swiper-slide
        ><swiper-slide>
          <img
            class="h-full w-full object-cover"
            src="/assets/beranda/banner-3.jpg"
            alt=""
        /></swiper-slide>
        <swiper-slide>
          <img
            class="h-full w-full object-cover"
            src="/assets/beranda/banner-4.jpg"
            alt="" /></swiper-slide
        ><swiper-slide>
          <img
            class="h-full w-full object-cover"
            src="/assets/beranda/banner-5.jpg"
            alt=""
        /></swiper-slide>
      </swiper>
    </section>

    <!-- Panti -->
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

      <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <PantiCard />
      </div>

      <router-link :to="{ name: 'panti' }">
        <button class="btn-primary">Lihat Semua Panti Asuhan</button>
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
            <router-link :to="{ name: 'caraBerdonasi' }">
              <button class="btn-primary">Baca Selengkapnya</button>
            </router-link>

            <router-link :to="{ name: 'register' }">
              <button class="btn-secondary">Daftar Sekarang</button>
            </router-link>
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
import PantiCard from "@/components/cards/PantiCard.vue";

import "@/assets/swiper.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const modules = [Autoplay, Pagination, Navigation];
</script>

<style></style>
