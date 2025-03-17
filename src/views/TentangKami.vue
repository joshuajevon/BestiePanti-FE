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
              dengan kebutuhan mereka.
            </p>
          </div>

          <div class="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
              <div class="flex items-center gap-4">
                <svg class="w-8 h-8 text-indigo-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M248 0L208 0c-26.5 0-48 21.5-48 48l0 112c0 35.3 28.7 64 64 64l128 0c35.3 0 64-28.7 64-64l0-112c0-26.5-21.5-48-48-48L328 0l0 80c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-80zM64 256c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l160 0c35.3 0 64-28.7 64-64l0-128c0-35.3-28.7-64-64-64l-40 0 0 80c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-80-40 0zM352 512l160 0c35.3 0 64-28.7 64-64l0-128c0-35.3-28.7-64-64-64l-40 0 0 80c0 8.8-7.2 16-16 16l-48 0c-8.8 0-16-7.2-16-16l0-80-40 0c-15 0-28.8 5.1-39.7 13.8c4.9 10.4 7.7 22 7.7 34.2l0 160c0 12.2-2.8 23.8-7.7 34.2C323.2 506.9 337 512 352 512z"/>
                </svg>
                <h5 class="text-base sm:text-lg lg:text-xl font-bold">Fleksibilitas Donasi</h5>
              </div>
              <p class="mt-3 font-normal text-gray-500">Donatur dapat menyumbang dalam bentuk barang, pangan, tenaga, maupun dana.</p>
            </div>

            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
              <div class="flex items-center gap-4">
                <svg class="w-8 h-8 text-indigo-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M256 64l128 0 0 64-128 0 0-64zM240 0c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l48 0 0 32L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0 0 32-48 0c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l160 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-48 0 0-32 256 0 0 32-48 0c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l160 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-48 0 0-32 96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-256 0 0-32 48 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48L240 0zM96 448l0-64 128 0 0 64L96 448zm320-64l128 0 0 64-128 0 0-64z"/>
                </svg>
                <h5 class="text-base sm:text-lg lg:text-xl font-bold">Koneksi Langsung</h5>
              </div>
              <p class="mt-3 font-normal text-gray-500">Donatur dapat mencari dan memilih panti asuhan berdasarkan
                kebutuhan spesifik yang terdaftar di platform kami.</p>
            </div>

            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
              <div class="flex items-center gap-4">
                <svg class="w-8 h-8 text-indigo-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8 512 128l-.7 0-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 193.7 235.6c-22.2-30.5-16.6-73.1 12.7-96.8l83.2-67.3c-11.6-4.9-24.1-7.4-36.8-7.4C234 64 215.7 69.6 200 80l-72 48 0 224 28.2 0 91.4 83.4c19.6 17.9 49.9 16.5 67.8-3.1c5.5-6.1 9.2-13.2 11.1-20.6l17 15.6c19.5 17.9 49.9 16.6 67.8-2.9c4.5-4.9 7.8-10.6 9.9-16.5c19.4 13 45.8 10.3 62.1-7.5c17.9-19.5 16.6-49.9-2.9-67.8l-134.2-123zM16 128c-8.8 0-16 7.2-16 16L0 352c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-224-80 0zM48 320a16 16 0 1 1 0 32 16 16 0 1 1 0-32zM544 128l0 224c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-208c0-8.8-7.2-16-16-16l-80 0zm32 208a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"/>
                </svg>
                <h5 class="text-base sm:text-lg lg:text-xl font-bold">Janji Temu <i>Offline</i></h5>
              </div>
              <p class="mt-3 font-normal text-gray-500">Donasi dapat difasilitasi secara online maupun pertemuan langsung untuk interaksi yang personal dengan panti asuhan.</p>
            </div>

            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
              <div class="flex items-center gap-4">
                <svg class="w-8 h-8 text-indigo-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                </svg>
                <h5 class="text-base sm:text-lg lg:text-xl font-bold">Manajemen Donasi</h5>
              </div>
              <p class="mt-3 font-normal text-gray-500">Memiliki akses pada fitur manajemen donasi yang komprehensif, termasuk laporan, riwayat donasi, dan profil informasi.</p>
            </div>

            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
              <div class="flex items-center gap-4">
                <svg class="w-8 h-8 text-indigo-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"/>
                </svg>
                <h5 class="text-base sm:text-lg lg:text-xl font-bold">Pesan Personal</h5>
              </div>
              <p class="mt-3 font-normal text-gray-500">Donatur dapat menambahkan pesan khusus untuk panti asuhan
                sebagai bentuk perhatian atau harapan pribadi mereka.</p>
            </div>

            <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
              <div class="flex items-center gap-4">
                <svg class="w-7 h-7 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                </svg>
                <h5 class="text-base sm:text-lg lg:text-xl font-bold">Transaparansi Donasi</h5>
              </div>
              <p class="mt-3 font-normal text-gray-500">Transparansi dalam setiap proses donasi diutamakan untuk memastikan kepercayaan semua pihak.</p>
            </div>
          </div>   

          <div>
            <p>
              Kami percaya bahwa dengan bersama-sama, kita dapat
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
