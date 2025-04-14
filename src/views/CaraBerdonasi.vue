<template>
  <section class="bg-primary-50 text-secondary-500">
    <section
      v-motion-fade-visible-once
      class="c-container flex items-center justify-center bg-cover bg-center pt-16 text-white sm:pt-[4.5rem] md:pt-20 lg:pt-[5.5rem] xl:pt-24"
      style="background-image: url('/assets/cara-berdonasi/banner-1.jpg')"
    >
      <div
        class="flex h-[200px] flex-col items-center justify-center gap-2 sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]"
      >
        <img
          class="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44 2xl:w-48"
          src="/assets/logos/logo-icon-text-white.svg"
          alt="logo"
        />
        <h1
          class="text-center text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          Cara Berdonasi
        </h1>
      </div>
    </section>

    <section
      class="c-container flex flex-col gap-8 pt-8 lg:gap-12 lg:pt-16 xl:gap-16 xl:pt-32"
    >
      <div
        v-motion-slide-visible-once-left
        class="flex items-center justify-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8"
      >
        <h1 class="text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl">
          Cara Berdonasi
        </h1>
        <div class="h-0.5 flex-1 bg-secondary-500"></div>
      </div>

      <div
        class="flex flex-col items-start justify-center gap-4 self-end sm:w-4/5 sm:gap-6 lg:gap-8"
      >
        <img
          v-motion-slide-visible-once-left
          class="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44 2xl:w-48"
          src="/assets/logos/logo-icon-text-color.svg"
          alt="logo"
        />

        <div
          v-motion-slide-visible-once-left
          class="flex flex-col text-justify text-sm sm:text-base lg:text-lg gap-8 sm:gap-10 lg:gap-12"
        >
          <div class="flex flex-col gap-2">
            <h3 class="font-bold text-base sm:text-lg lg:text-xl">
              Ingin berbagi dengan panti asuhan?
            </h3>
            <p>
              Berikut adalah langkah-langkah sederhana untuk melakukan donasi
              melalui BestiePanti:
            </p>
          </div>
        </div>

        <div
          class="flex flex-col gap-8 sm:gap-10 lg:gap-12 relative pb-8 lg:pb-12 xl:pb-16"
        >
          <span
            v-motion-slide-visible-once-lef
            class="absolute w-1 sm:w-1.5 lg:w-2 h-full top-0 bg-primary-200 left-[1.125rem] sm:left-6 lg:left-7"
          ></span>

          <div
            v-motion-slide-visible-once-left
            class="flex gap-4 sm:gap-5 lg:gap-6 z-10"
          >
            <div
              class="bg-primary-500 text-white rounded-full p-3 sm:p-3.5 lg:p-4 w-fit h-fit"
            >
              <svg
                class="size-4 sm:size-6 lg:size-8 overflow-visible"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"
                />
              </svg>
            </div>

            <div class="flex flex-col gap-8 sm:gap-10 lg:gap-12">
              <div class="flex flex-col gap-1">
                <h3 class="font-bold text-base sm:text-lg lg:text-xl">
                  1. Login Terlebih Dahulu
                </h3>

                <ol
                  class="text-sm sm:text-base lg:text-lg text-justify list-disc pl-5 space-y-1"
                >
                  <li>
                    Pastikan Anda sudah memiliki akun di BestiePanti. Jika
                    belum, silakan daftar terlebih dahulu.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div
            v-motion-slide-visible-once-left
            class="flex gap-4 sm:gap-5 lg:gap-6 z-10"
          >
            <div
              class="bg-primary-500 text-white rounded-full p-3 sm:p-3.5 lg:p-4 w-fit h-fit"
            >
              <svg
                class="size-4 sm:size-6 lg:size-8 overflow-visible"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                />
              </svg>
            </div>

            <div class="flex flex-col gap-8 sm:gap-10 lg:gap-12">
              <div class="flex flex-col gap-1">
                <h3 class="font-bold text-base sm:text-lg lg:text-xl">
                  2. Pilih Panti Asuhan
                </h3>

                <ol
                  class="text-sm sm:text-base lg:text-lg text-justify list-disc pl-5 space-y-1"
                >
                  <li>
                    Kunjungi halaman panti asuhan. Di sini, Anda dapat mencari
                    panti asuhan berdasarkan nama, kebutuhan dan wilayah yang
                    ingin Anda tuju.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div
            v-motion-slide-visible-once-left
            class="flex gap-4 sm:gap-5 lg:gap-6 z-10"
          >
            <div
              class="bg-primary-500 text-white rounded-full p-3 sm:p-3.5 lg:p-4 w-fit h-fit"
            >
              <svg
                class="size-4 sm:size-6 lg:size-8 overflow-visible"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                />
              </svg>
            </div>

            <div class="flex flex-col gap-8 sm:gap-10 lg:gap-12">
              <div class="flex flex-col gap-1">
                <h3 class="font-bold text-base sm:text-lg lg:text-xl">
                  3. Akses Halaman Detail Panti Asuhan
                </h3>

                <ol
                  class="text-sm sm:text-base lg:text-lg text-justify list-disc pl-5 space-y-1"
                >
                  <li>
                    Klik pada nama atau gambar panti asuhan pilihan Anda untuk
                    membuka halaman detailnya.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div
            v-motion-slide-visible-once-left
            class="flex gap-4 sm:gap-5 lg:gap-6 z-10"
          >
            <div
              class="bg-primary-500 text-white rounded-full p-3 sm:p-3.5 lg:p-4 w-fit h-fit"
            >
              <svg
                class="size-4 sm:size-6 lg:size-8 overflow-visible"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9l2.6-2.4C267.2 438.6 256 404.6 256 368c0-97.2 78.8-176 176-176c28.3 0 55 6.7 78.7 18.5c.9-6.5 1.3-13 1.3-19.6l0-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1l0 5.8c0 41.5 17.2 81.2 47.6 109.5zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm16-208l0 48 48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-48 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48-48 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l48 0 0-48c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                />
              </svg>
            </div>

            <div class="flex flex-col gap-8 sm:gap-10 lg:gap-12">
              <div class="flex flex-col gap-1">
                <h3 class="font-bold text-base sm:text-lg lg:text-xl">
                  4. Pilih Bentuk Donasi
                </h3>

                <ol
                  class="text-sm sm:text-base lg:text-lg text-justify list-disc pl-5 space-y-1"
                >
                  <li>
                    Pada halaman detail, pilih jenis donasi yang ingin Anda
                    berikan:
                    <br />
                    - Dana
                    <br />
                    - Non Dana (Barang, makanan dan tenaga)
                  </li>

                  <li>Tekan tombol yang sesuai dengan bentuk donasi Anda.</li>
                </ol>
              </div>
            </div>
          </div>

          <div
            v-motion-slide-visible-once-left
            class="flex gap-4 sm:gap-5 lg:gap-6 z-10"
          >
            <div
              class="bg-primary-500 text-white rounded-full p-3 sm:p-3.5 lg:p-4 w-fit h-fit"
            >
              <svg
                class="size-4 sm:size-6 lg:size-8 overflow-visible"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                />
              </svg>
            </div>

            <div class="flex flex-col gap-8 sm:gap-10 lg:gap-12">
              <div class="flex flex-col gap-1">
                <h3 class="font-bold text-base sm:text-lg lg:text-xl">
                  5. Isi Formulir Donasi
                </h3>

                <ol
                  class="text-sm sm:text-base lg:text-lg text-justify list-disc pl-5 space-y-1"
                >
                  <li>
                    Sebuah formulir akan muncul setelah Anda memilih jenis
                    donasi.
                  </li>

                  <li>Lengkapi data yang diminta pada formulir tersebut.</li>
                </ol>
              </div>
            </div>
          </div>

          <div
            v-motion-slide-visible-once-left
            class="flex gap-4 sm:gap-5 lg:gap-6 z-10"
          >
            <div
              class="bg-primary-500 text-white rounded-full p-3 sm:p-3.5 lg:p-4 w-fit h-fit"
            >
              <svg
                class="size-4 sm:size-6 lg:size-8 overflow-visible"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64l0 11c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437l0 11c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 256 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-11c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1l0-11c17.7 0 32-14.3 32-32s-14.3-32-32-32L320 0 64 0 32 0zM96 75l0-11 192 0 0 11c0 19-5.6 37.4-16 53L112 128c-10.3-15.6-16-34-16-53zm16 309c3.5-5.3 7.6-10.3 12.1-14.9L192 301.3l67.9 67.9c4.6 4.6 8.6 9.6 12.1 14.9L112 384z"
                />
              </svg>
            </div>

            <div class="flex flex-col gap-8 sm:gap-10 lg:gap-12">
              <div class="flex flex-col gap-1">
                <h3 class="font-bold text-base sm:text-lg lg:text-xl">
                  6. Tunggu Verifikasi
                </h3>

                <ol
                  class="text-sm sm:text-base lg:text-lg text-justify list-disc pl-5 space-y-1"
                >
                  <li>
                    Setelah mengirim formulir, donasi Anda akan diteruskan ke
                    panti asuhan terkait.
                  </li>

                  <li>
                    Panti asuhan akan memverifikasi donasi Anda sebelum langkah
                    berikutnya dilakukan.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div
            v-motion-slide-visible-once-left
            class="flex gap-4 sm:gap-5 lg:gap-6 z-10"
          >
            <div
              class="bg-primary-500 text-white rounded-full p-3 sm:p-3.5 lg:p-4 w-fit h-fit"
            >
              <svg
                class="size-4 sm:size-6 lg:size-8 overflow-visible"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                />
              </svg>
            </div>

            <div class="flex flex-col gap-8 sm:gap-10 lg:gap-12">
              <div class="flex flex-col gap-1">
                <h3 class="font-bold text-base sm:text-lg lg:text-xl">
                  7. Cek Status Donasi
                </h3>

                <ol
                  class="text-sm sm:text-base lg:text-lg text-justify list-disc pl-5 space-y-1"
                >
                  <li>
                    Anda dapat memantau status donasi yang telah diajukan
                    melalui halaman “Donasi Saya” di akun Anda. Hal ini
                    memudahkan Anda untuk mengikuti perkembangan donasi secara
                    real-time.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
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

<script setup></script>

<style></style>
