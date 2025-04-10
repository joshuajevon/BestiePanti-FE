<template>
  <div class="flex justify-center mt-4 space-x-2">
    <button
      @click="prevPage"
      :disabled="currentPage === 1"
      class="px-3 py-1 border rounded disabled:opacity-50"
    >
      « Prev
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      @click="$emit('update:currentPage', page)"
      class="px-3 py-1 border rounded"
      :class="{ 'bg-blue-500 text-white': currentPage === page }"
    >
      {{ page }}
    </button>

    <button
      @click="nextPage"
      :disabled="currentPage === totalPages"
      class="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next »
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  totalItems: Number,
  itemsPerPage: { type: Number, default: 10 },
  currentPage: Number,
});

const emit = defineEmits(["update:currentPage"]);

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
);

const prevPage = () => {
  if (props.currentPage > 1) emit("update:currentPage", props.currentPage - 1);
};

const nextPage = () => {
  if (props.currentPage < totalPages.value)
    emit("update:currentPage", props.currentPage + 1);
};
</script>
