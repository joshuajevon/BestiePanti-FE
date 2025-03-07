<template>
  <div
    class="flex h-fit flex-col justify-center gap-4 rounded-2xl bg-white p-8"
  >
    <div class="w-24 h-24 rounded-full bg-secondary-300">
      <img
        class="h-full w-full object-cover object-center"
        :src="`${apiUrl}/storage/profile/${profile}`"
        :alt="`${name}'s profile image`"
      />
    </div>

    <div class="flex w-full flex-col gap-1 md:gap-2">
      <h2 class="line-clamp-1 text-xl font-bold md:text-2xl">{{ name }}</h2>
      <p class="text-justify text-secondary-300">"{{ message }}"</p>
    </div>
  </div>
</template>

<script setup>
const apiUrl = import.meta.env.VITE_API_URL;

defineProps({
  profile: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
</script>

<style></style>
