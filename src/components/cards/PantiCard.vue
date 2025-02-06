<template>
  <router-link class="w-fit" :to="{ name: 'pantiDetail' }">
    <div
      class="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 transition hover:bg-primary-300 group"
    >
      <img
        class="rounded-lg object-cover"
        src="/assets/beranda/banner-4.jpg"
        alt=""
      />

      <div class="flex w-full flex-col gap-1">
        <h2
          class="group-hover:text-white line-clamp-1 text-center text-2xl font-bold"
        >
          Nama Panti asd asd ad as dasd
        </h2>
        <p class="group-hover:text-white line-clamp-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit
          consequatur reprehenderit soluta, inventore excepturi at nihil
          obcaecati repellat est? Nemo vero voluptatibus quisquam velit
          perferendis nam vel quas maxime aspernatur?
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {};
</script>

<style></style>
