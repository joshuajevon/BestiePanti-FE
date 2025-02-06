<template>
  <footer
    class="c-container flex flex-col items-center justify-center gap-8 bg-primary-900 py-8 text-white"
  >
    <a href="/" class="">
      <img
        class="w-40 lg:w-48"
        src="/assets/logos/logo-icon-text-color-2.svg"
        alt="logo"
      />
    </a>

    <div id="web-nav-links" class="flex">
      <div aria-label="Site Nav">
        <ul
          class="flex w-full flex-wrap items-center justify-center gap-6 lg:gap-8"
        >
          <li>
            <a
              class="text-sm font-bold transition hover:text-primary-300 lg:text-base"
              href="/"
            >
              BERANDA
            </a>
          </li>

          <li>
            <a
              class="text-sm font-bold transition hover:text-primary-300 lg:text-base"
              href="/panti"
            >
              PANTI
            </a>
          </li>

          <li>
            <a
              class="text-sm font-bold transition hover:text-primary-300 lg:text-base"
              href="/tentang-kami"
            >
              TENTANG KAMI
            </a>
          </li>

          <li>
            <a
              class="text-sm font-bold transition hover:text-primary-300 lg:text-base"
              href="/cara-donasi"
            >
              CARA BERDONASI
            </a>
          </li>
        </ul>
      </div>
    </div>

    <p class="text-center text-sm lg:text-base">
      Copyright © 2025 BestiePanti. All rights reserved.
    </p>
  </footer>
</template>

<script>
export default {};
</script>

<style></style>
