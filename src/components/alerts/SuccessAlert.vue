<template>
  <div role="alert" class="rounded-xl border border-gray-100 bg-white p-4">
    <div class="flex items-start gap-4">
      <span class="text-green-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>

      <div class="flex-1">
        <strong class="block font-medium text-gray-900"> {{ text1 }} </strong>

        <p class="mt-1 text-sm text-gray-700">
          {{ text2 }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  text1: {
    type: String,
    required: true,
  },
  text2: {
    type: String,
  },
});
</script>
