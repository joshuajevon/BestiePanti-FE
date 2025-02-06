<template>
  <section class="bg-primary-50 text-secondary-500">
    <!-- Form Dana -->
    <section
      id="form-dana"
      class="c-container fixed z-[100] hidden h-screen w-screen bg-black/80"
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

            <!-- Password -->
            <div class="input-container">
              <label
                for="password"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Kata Sandi
              </label>

              <div class="relative mt-1 w-full">
                <input
                  type="password"
                  autocomplete="false"
                  id="password"
                  name="password"
                  placeholder="Masukkan kata sandi"
                  class="w-full rounded-md border border-secondary-500 bg-white p-4 pr-12 text-sm autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] sm:text-base lg:pr-14"
                />

                <svg
                  id="eye-slash"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="absolute inset-y-0 right-4 my-auto h-5 w-5 cursor-pointer lg:right-5 lg:h-6 lg:w-6"
                  onclick="togglePassword()"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>

                <svg
                  id="eye"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="absolute inset-y-0 right-4 my-auto hidden h-5 w-5 cursor-pointer lg:right-5 lg:h-6 lg:w-6"
                  onclick="togglePassword()"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <p id="password-error-message" class="error-message"></p>
            </div>
          </div>

          <div class="flex items-center justify-center gap-4">
            <button
              class="btn-secondary"
              type="button"
              onclick="closeFormDana()"
            >
              Tutup
            </button>
            <button class="btn-primary" type="submit">Kirim</button>
          </div>
        </div>
      </form>
    </section>

    <!-- Form Non Dana -->
    <section
      id="form-non-dana"
      class="c-container fixed z-[100] hidden h-screen w-screen bg-black/80"
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

            <!-- Password -->
            <div class="input-container">
              <label
                for="password"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Kata Sandi
              </label>

              <div class="relative mt-1 w-full">
                <input
                  type="password"
                  autocomplete="false"
                  id="password"
                  name="password"
                  placeholder="Masukkan kata sandi"
                  class="w-full rounded-md border border-secondary-500 bg-white p-4 pr-12 text-sm autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] sm:text-base lg:pr-14"
                />

                <svg
                  id="eye-slash"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="absolute inset-y-0 right-4 my-auto h-5 w-5 cursor-pointer lg:right-5 lg:h-6 lg:w-6"
                  onclick="togglePassword()"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>

                <svg
                  id="eye"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="absolute inset-y-0 right-4 my-auto hidden h-5 w-5 cursor-pointer lg:right-5 lg:h-6 lg:w-6"
                  onclick="togglePassword()"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <p id="password-error-message" class="error-message"></p>
            </div>
          </div>

          <div class="flex items-center justify-center gap-4">
            <button
              class="btn-secondary"
              type="button"
              onclick="closeFormNonDana()"
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
      id="form-pesan"
      class="c-container fixed z-[100] hidden h-screen w-screen bg-black/80"
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
              <span class="font-bold text-primary-300">Kirim Pesan</span>
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

            <!-- Password -->
            <div class="input-container">
              <label
                for="password"
                class="text-base font-medium text-secondary-500 sm:text-lg"
              >
                Kata Sandi
              </label>

              <div class="relative mt-1 w-full">
                <input
                  type="password"
                  autocomplete="false"
                  id="password"
                  name="password"
                  placeholder="Masukkan kata sandi"
                  class="w-full rounded-md border border-secondary-500 bg-white p-4 pr-12 text-sm autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] sm:text-base lg:pr-14"
                />

                <svg
                  id="eye-slash"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="absolute inset-y-0 right-4 my-auto h-5 w-5 cursor-pointer lg:right-5 lg:h-6 lg:w-6"
                  onclick="togglePassword()"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>

                <svg
                  id="eye"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="absolute inset-y-0 right-4 my-auto hidden h-5 w-5 cursor-pointer lg:right-5 lg:h-6 lg:w-6"
                  onclick="togglePassword()"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <p id="password-error-message" class="error-message"></p>
            </div>
          </div>

          <div class="flex items-center justify-center gap-4">
            <button
              class="btn-secondary"
              type="button"
              onclick="closeFormPesan()"
            >
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
        <h1 class="text-3xl font-bold lg:text-4xl xl:text-5xl">
          Nama Panti Asuhan
        </h1>
        <p class="text-lg lg:text-xl xl:text-2xl">Alamat Panti Asuhan</p>
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
        <swiper-slide>
          <img
            class="h-full w-full object-contain"
            src="/assets/beranda/banner-1.jpg"
            alt=""
          />
        </swiper-slide>
        <swiper-slide>
          <img
            class="h-full w-full object-contain"
            src="/assets/beranda/banner-2.jpg"
            alt="" /></swiper-slide
        ><swiper-slide>
          <img
            class="h-full w-full object-contain"
            src="/assets/beranda/banner-3.jpg"
            alt=""
        /></swiper-slide>
        <swiper-slide>
          <img
            class="h-full w-full object-contain"
            src="/assets/beranda/banner-4.jpg"
            alt="" /></swiper-slide
        ><swiper-slide>
          <img
            class="h-full w-full object-contain"
            src="/assets/beranda/banner-5.jpg"
            alt=""
        /></swiper-slide>
      </swiper>
    </section>

    <!-- Details -->
    <section
      class="c-container flex flex-col items-center justify-center gap-8 pb-8 lg:pb-12 xl:pb-16"
    >
      <div class="flex flex-wrap items-center justify-center gap-4">
        <button class="btn-primary" onclick="openFormDana()">
          Donasi Dana
        </button>
        <button class="btn-primary" onclick="openFormNonDana()">
          Donasi Non Dana
        </button>
        <button class="btn-primary" onclick="openFormPesan()">
          Kirim Pesan
        </button>
      </div>

      <div class="w-full">
        <p
          class="text-justify text-lg text-secondary-500 lg:text-xl xl:text-2xl"
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis
          laudantium asperiores architecto corporis itaque saepe pariatur
          reiciendis cum, nisi ipsa earum exercitationem veritatis sapiente
          ipsum voluptate reprehenderit animi ratione, tenetur tempore
          repudiandae quo libero dicta beatae cumque. Quisquam repudiandae
          laborum earum non voluptatum officia fugit dolore, hic totam maxime
          est dolorum fugiat laboriosam repellat veritatis, doloremque
          voluptatibus eaque, sunt iste culpa magnam pariatur quia illo sequi?
          Quia labore laborum dignissimos mollitia id unde voluptate velit,
          soluta cum dolores consequuntur minus quaerat eum nobis dolorem quae
          culpa iste explicabo debitis dolore distinctio. Iste nam dolorum
          provident quidem debitis fuga perferendis reprehenderit delectus
          excepturi. Quam praesentium voluptatum atque facere quas similique
          ratione reprehenderit autem distinctio nisi corrupti odio sapiente
          illum earum in, sed possimus harum. Vitae, enim quos placeat
          blanditiis numquam id atque. Dolorem architecto cum, quae veniam
          perspiciatis dolores expedita alias laboriosam vero similique suscipit
          autem dolore aperiam temporibus quisquam facere, quidem sunt ea omnis
          quasi repellat, repudiandae harum deleniti? Totam nemo facilis
          doloribus et doloremque numquam, eveniet molestiae! Sunt officia
          nihil, alias minima sed dicta tempore quibusdam, sit, dignissimos
          similique reprehenderit in id minus quam? Amet, quod, iste, pariatur
          voluptates possimus architecto vero eos nostrum eligendi ipsam magnam
          sapiente. Accusantium.
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
        onclick="loadMorePesan()"
        disabled
      >
        Lihat Lebih Banyak
      </button>
    </section>
  </section>
</template>

<script setup>
import PesanCard from "@/components/cards/PesanCard.vue";

import "@/assets/swiper.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const modules = [Pagination, Navigation];
</script>

<style></style>
