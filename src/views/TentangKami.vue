<template>
  <section class="bg-primary-50 text-secondary-500">
    <section
      class="c-container flex items-center justify-center bg-cover bg-center pt-16 text-white sm:pt-[4.5rem] md:pt-20 lg:pt-[5.5rem] xl:pt-24"
      :style="backgroundStyle"
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
        <p class="text-justify text-sm font-normal sm:text-lg lg:text-xl">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo earum
          animi esse corporis odit. Repellat ipsam tempore magni voluptas
          assumenda eligendi nisi voluptatum non dolores. Dicta ipsum veritatis
          maxime modi magnam voluptate minus accusantium saepe sint eveniet.
          Sunt ipsum quas et praesentium odio suscipit minima animi incidunt
          deleniti nemo perspiciatis aliquid quis iure fuga, ducimus dolore
          magnam alias eaque. Exercitationem rerum sed quae corporis assumenda
          ullam saepe vel in, ab, autem magni odio accusantium sequi nostrum
          architecto nulla sunt placeat sapiente reiciendis itaque. Aut eaque
          eveniet fugiat eligendi labore omnis expedita, incidunt impedit atque
          iusto nisi sapiente possimus ipsam ipsum doloremque neque id fugit
          eius maiores perferendis inventore. Asperiores perferendis maxime,
          labore animi perspiciatis, maiores voluptatibus placeat quos ut modi
          nostrum tenetur autem? Culpa aut dolores rerum veniam. Laborum, sequi,
          eveniet odit quas in impedit ad hic blanditiis amet quaerat error
          omnis nam itaque, illo dolore? Facere illo aliquid et unde quaerat
          ducimus, odit perferendis earum praesentium tenetur. Eveniet
          doloremque numquam eum ratione sed tenetur optio molestias aliquid
          labore perspiciatis dolor dignissimos iusto quidem atque perferendis
          magnam quod totam maiores voluptates, repudiandae sit alias, inventore
          corporis praesentium? Harum accusamus, quae illo sit officia, eligendi
          modi totam debitis, ut asperiores tempora!
        </p>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  data() {
    return {
      backgroundImageUrl: "/assets/tentang-kami/banner-1.jpg",
    };
  },
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `url(${this.backgroundImageUrl})`,
      };
    },
  },
};
</script>
<style></style>
