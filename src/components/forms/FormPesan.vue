<template>
  <section
    v-show="isFormPesanOpen"
    class="c-container fixed z-[100] h-screen w-screen bg-black/80"
  >
    <!-- Loading Overlay -->
    <div
      v-if="isSubmitting"
      class="absolute inset-0 m-auto z-[200] w-screen h-screen bg-black/50 flex justify-center items-center"
    >
      <div class="bg-white rounded-xl p-8">
        <LoadingIndicator text="Mengirim pesan..." class="text-secondary-500" />
      </div>
    </div>

    <form
      method="POST"
      class="flex h-full w-full items-center justify-center relative"
      @submit.prevent="submitForm"
    >
      <div
        class="h-max-[80vh] flex w-full max-w-screen-xl flex-col gap-8 rounded-xl bg-white p-8 sm:rounded-2xl sm:p-12 lg:rounded-3xl lg:p-16"
      >
        <!-- Title -->
        <div
          class="flex w-full flex-col items-center justify-center gap-2 border-b-2 border-b-secondary-500 px-4 pb-5 sm:gap-3 lg:gap-4"
        >
          <h1
            class="pb-2 text-center text-4xl font-medium leading-9 sm:text-5xl lg:text-6xl"
          >
            Formulir
            <span class="font-bold text-primary-300">Kirim Pesan</span>
          </h1>
          <p class="text-center text-base sm:text-lg">
            Silakan menulis pesan yang ingin disampaikan kepada panti asuhan
            terkait.
          </p>
        </div>

        <div class="flex w-full flex-col items-start justify-center gap-6">
          <!-- Message -->
          <div class="input-container mt-2">
            <label
              for="message"
              class="text-base font-medium text-secondary-500 sm:text-lg"
            >
              Pesan
            </label>

            <textarea
              name="message"
              id="message"
              placeholder="Masukkan pesan"
              rows="5"
              v-model="form.message"
              :disabled="isSubmitting"
            ></textarea>
            <p
              v-if="errorMessages.message"
              id="message-error-message"
              class="error-message"
            >
              {{ errorMessages.message }}
            </p>
          </div>
        </div>

        <div class="flex items-center justify-center gap-4">
          <button
            class="btn-secondary"
            type="button"
            @click="closeFormPesan"
            :disabled="isSubmitting"
          >
            Tutup
          </button>
          <button class="btn-primary" type="submit" :disabled="isSubmitting">
            Kirim
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { createMessage } from "@/services/api-message";
import { reactive, ref } from "vue";
import LoadingIndicator from "../loading/LoadingIndicator.vue";

const props = defineProps({
  isFormPesanOpen: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["closeFormPesan", "success"]);

const form = reactive({
  message: "",
});

const errorMessages = reactive({ message: "" });

const isSubmitting = ref(false); // Fetching state

const validateForm = () => {
  Object.keys(errorMessages).forEach((key) => {
    errorMessages[key] = "";
  });

  let isValid = true;

  if (!form.message) {
    errorMessages.message = "Pesan tidak boleh kosong";
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    const response = await createMessage(props.id, form.message);

    if (response.message && !response.id) {
      errorMessages.message = response.message;
      return;
    }

    errorMessages.message = "";
    form.message = "";

    emit("success");
    closeFormPesan();
  } catch (error) {
    console.error("Error sending message:", error);
    errorMessages.message = "Terjadi kesalahan. Silakan coba lagi.";
  } finally {
    isSubmitting.value = false;
  }
};

const closeFormPesan = () => {
  emit("closeFormPesan");
};
</script>

<style scoped></style>
