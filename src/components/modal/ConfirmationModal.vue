<template>
  <Transition name="fade">
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div class="bg-white rounded-2xl shadow-lg p-6 w-96 md:w-[500px] max-w-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Konfirmasi</h3>
        <p class="text-gray-600 mb-6">{{ message }}</p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="cancel"
            class="px-5 py-2 text-white bg-red-600 rounded-lg hover:bg-red-400 transition"
          >
            Batal
          </button>
          <button 
            @click="confirm"
            class="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-400 transition"
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String,
});

const emit = defineEmits(["confirm", "cancel"]);

const confirm = () => emit("confirm");
const cancel = () => emit("cancel");
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
