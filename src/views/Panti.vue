<template>
  <section class="bg-primary-50 text-secondary-500">
    <!-- Panti -->
    <section
      class="c-container flex flex-col items-center justify-center gap-8 pb-16 pt-32 lg:pb-20 lg:pt-36 xl:pb-24 xl:pt-40"
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
        <router-link :to="{ name: 'pantiDetail' }">
          <div class="panti-card group">
            <img
              class="rounded-lg object-cover"
              src="/assets/beranda/banner-4.jpg"
              alt=""
            />

            <div class="flex w-full flex-col gap-1">
              <h2 class="group-hover:text-white">
                Nama Panti asd asd ad as dasd
              </h2>
              <p class="group-hover:text-white">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Impedit consequatur reprehenderit soluta, inventore excepturi at
                nihil obcaecati repellat est? Nemo vero voluptatibus quisquam
                velit perferendis nam vel quas maxime aspernatur?
              </p>
            </div>
          </div>
        </router-link>

        <a href="/panti-detail">
          <div class="panti-card group">
            <img
              class="rounded-lg object-cover"
              src="/assets/beranda/banner-4.jpg"
              alt=""
            />

            <div class="flex w-full flex-col gap-1">
              <h2 class="group-hover:text-white">
                Nama Panti asd asd ad as dasd
              </h2>
              <p class="group-hover:text-white">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Impedit consequatur reprehenderit soluta, inventore excepturi at
                nihil obcaecati repellat est? Nemo vero voluptatibus quisquam
                velit perferendis nam vel quas maxime aspernatur?
              </p>
            </div>
          </div>
        </a>

        <a href="/panti-detail">
          <div class="panti-card group">
            <img
              class="rounded-lg object-cover"
              src="/assets/beranda/banner-4.jpg"
              alt=""
            />

            <div class="flex w-full flex-col gap-1">
              <h2 class="group-hover:text-white">
                Nama Panti asd asd ad as dasd
              </h2>
              <p class="group-hover:text-white">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Impedit consequatur reprehenderit soluta, inventore excepturi at
                nihil obcaecati repellat est? Nemo vero voluptatibus quisquam
                velit perferendis nam vel quas maxime aspernatur?
              </p>
            </div>
          </div>
        </a>

        <a href="/panti-detail">
          <div class="panti-card group">
            <img
              class="rounded-lg object-cover"
              src="/assets/beranda/banner-4.jpg"
              alt=""
            />

            <div class="flex w-full flex-col gap-1">
              <h2 class="group-hover:text-white">
                Nama Panti asd asd ad as dasd
              </h2>
              <p class="group-hover:text-white">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Impedit consequatur reprehenderit soluta, inventore excepturi at
                nihil obcaecati repellat est? Nemo vero voluptatibus quisquam
                velit perferendis nam vel quas maxime aspernatur?
              </p>
            </div>
          </div>
        </a>

        <a href="/panti-detail">
          <div class="panti-card group">
            <img
              class="rounded-lg object-cover"
              src="/assets/beranda/banner-4.jpg"
              alt=""
            />

            <div class="flex w-full flex-col gap-1">
              <h2 class="group-hover:text-white">
                Nama Panti asd asd ad as dasd
              </h2>
              <p class="group-hover:text-white">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Impedit consequatur reprehenderit soluta, inventore excepturi at
                nihil obcaecati repellat est? Nemo vero voluptatibus quisquam
                velit perferendis nam vel quas maxime aspernatur?
              </p>
            </div>
          </div>
        </a>

        <a href="/panti-detail">
          <div class="panti-card group">
            <img
              class="rounded-lg object-cover"
              src="/assets/beranda/banner-4.jpg"
              alt=""
            />

            <div class="flex w-full flex-col gap-1">
              <h2 class="group-hover:text-white">
                Nama Panti asd asd ad as dasd
              </h2>
              <p class="group-hover:text-white">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Impedit consequatur reprehenderit soluta, inventore excepturi at
                nihil obcaecati repellat est? Nemo vero voluptatibus quisquam
                velit perferendis nam vel quas maxime aspernatur?
              </p>
            </div>
          </div>
        </a>

        <a href="/panti-detail">
          <div class="panti-card group">
            <img
              class="rounded-lg object-cover"
              src="/assets/beranda/banner-4.jpg"
              alt=""
            />

            <div class="flex w-full flex-col gap-1">
              <h2 class="group-hover:text-white">
                Nama Panti asd asd ad as dasd
              </h2>
              <p class="group-hover:text-white">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Impedit consequatur reprehenderit soluta, inventore excepturi at
                nihil obcaecati repellat est? Nemo vero voluptatibus quisquam
                velit perferendis nam vel quas maxime aspernatur?
              </p>
            </div>
          </div>
        </a>
      </div>

      <button
        class="btn-primary pointer-events-none opacity-50"
        onclick="loadMorePanti()"
        disabled
      >
        Lihat Lebih Banyak
      </button>
    </section>
  </section>
</template>
<script>
export default {};
</script>
<style></style>
