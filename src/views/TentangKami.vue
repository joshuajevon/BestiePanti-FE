<template>
  <section class="bg-primary-50 text-secondary-500">
    <section
      class="c-container flex items-center justify-center bg-cover bg-center pt-16 text-white sm:pt-[4.5rem] md:pt-20 lg:pt-[5.5rem] xl:pt-24"
      style="background-image: url('/assets/tentang-kami/banner-1.jpg')"
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
          Tentang Kami
        </h1>
      </div>
    </section>

    <section
      class="c-container flex flex-col gap-8 py-8 lg:gap-12 lg:py-16 xl:gap-16 xl:py-32"
    >
      <div
        class="flex items-center justify-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8"
      >
        <h1 class="text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl">
          Tentang Kami
        </h1>
        <div class="h-0.5 flex-1 bg-secondary-500"></div>
      </div>

      <div
        class="flex flex-col items-start justify-center gap-4 self-end sm:w-4/5 sm:gap-6 lg:gap-8"
      >
        <img
          class="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44 2xl:w-48"
          src="/assets/logos/logo-icon-text-color.svg"
          alt="logo"
        />

        <div
          class="flex flex-col text-justify text-sm sm:text-base lg:text-lg gap-8 sm:gap-10 lg:gap-12"
        >
          <div class="flex flex-col gap-2">
            <h3 class="font-bold text-base sm:text-lg lg:text-xl">
              Siapa Kami?
            </h3>
            <p>
              Selamat datang di BestiePanti, platform manajemen donasi yang
              berkomitmen untuk menjadi jembatan kebaikan antara para donatur
              dan panti asuhan di Jabodetabek. Kami memahami pentingnya berbagi
              dan mendukung mereka yang membutuhkan, itulah sebabnya kami hadir
              untuk mempermudah proses donasi dalam berbagai bentuk.
            </p>
          </div>

          <div class="flex flex-col gap-2">
            <h3 class="font-bold text-base sm:text-lg lg:text-xl">Misi Kami</h3>
            <p>
              Kami berupaya menciptakan ekosistem donasi yang transparan,
              efektif, dan mudah diakses. Dengan fitur-fitur unggulan, kami
              memberikan solusi bagi donatur untuk mendukung panti asuhan sesuai
              dengan kebutuhan mereka, baik secara online maupun offline.
            </p>
          </div>

          <div class="flex flex-col gap-2">
            <h3 class="font-bold text-base sm:text-lg lg:text-xl">
              Koneksi Langsung:
            </h3>
            <p>
              Donatur dapat mencari dan memilih panti asuhan berdasarkan
              kebutuhan spesifik yang terdaftar di platform kami.
            </p>
          </div>

          <div class="flex flex-col gap-2">
            <h3 class="font-bold text-base sm:text-lg lg:text-xl">
              Janji Temu Offline:
            </h3>
            <p>
              Selain donasi online, kami memfasilitasi pertemuan langsung antara
              donatur dan panti asuhan, memungkinkan interaksi dan kontribusi
              secara personal.
            </p>
          </div>

          <div class="flex flex-col gap-2">
            <h3 class="font-bold text-base sm:text-lg lg:text-xl">
              Manajemen Donasi untuk Panti Asuhan:
            </h3>
            <p>
              Panti asuhan memiliki akses ke fitur manajemen donasi yang
              komprehensif, termasuk laporan, riwayat donasi, dan profil
              informasi.
            </p>
          </div>

          <div class="flex flex-col gap-2">
            <h3 class="font-bold text-base sm:text-lg lg:text-xl">
              Pesan untuk Panti Asuhan:
            </h3>
            <p>
              Donatur juga dapat menambahkan pesan khusus untuk panti asuhan
              sebagai bentuk perhatian atau harapan pribadi mereka.
            </p>
          </div>

          <div>
            <p>
              Dengan sistem komunikasi dua arah yang tersedia, kami memastikan
              bahwa hubungan antara donatur dan panti asuhan dapat berjalan
              lancar, transparan, dan penuh makna.
            </p>
          </div>
          <div>
            <p>
              Komitmen Kami Kami percaya bahwa dengan bersama-sama, kita dapat
              menciptakan dampak positif yang berkelanjutan bagi komunitas.
              BestiePanti ada untuk menjadikan proses berbagi lebih mudah dan
              terarah, sehingga kebaikan dapat menjangkau mereka yang
              membutuhkan.
            </p>
          </div>
          <div>
            <p class="font-bold">
              Bergabunglah dengan kami dan jadilah bagian dari perubahan hari
              ini!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Hubungi Kami -->
    <section
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
