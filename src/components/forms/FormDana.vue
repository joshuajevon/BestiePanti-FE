<template>
  <section
    v-show="isFormDanaOpen"
    class="c-container fixed z-[100] h-screen w-screen bg-black/80 py-8"
  >
    <form
      action=""
      method=""
      class="flex h-full w-full items-center justify-center"
      onsubmit=""
    >
      <div
        class="h-full flex w-full max-w-screen-xl flex-col gap-8 rounded-xl bg-white p-8 sm:rounded-2xl sm:p-12 lg:rounded-3xl lg:p-16 overflow-scroll"
      >
        <!-- Title -->
        <div
          class="flex w-full flex-col items-center justify-center gap-2 border-b-2 border-b-secondary-500 px-4 pb-5 sm:gap-3 lg:gap-4"
        >
          <h1
            class="pb-2 text-center text-4xl font-medium leading-9 sm:text-5xl lg:text-6xl"
          >
            Formulir
            <span class="font-bold text-primary-300">Donasi Dana</span>
          </h1>
          <p class="text-center text-base sm:text-lg">
            Silakan isi formulir berikut untuk melakukan donasi dana.
            <span class="font-bold"
              >Pastikan semua informasi yang Anda masukkan akurat</span
            >
            agar proses donasi dapat berjalan dengan lancar.
          </p>
        </div>

        <div class="flex w-full flex-col items-start justify-center gap-6">
          <!-- QRIS Image -->
          <div class="flex justify-center items-center w-full">
            <div class="w-64 h-96 bg-black"></div>
            <!-- <img src="" alt="" /> -->
          </div>

          <!-- Account Details -->
          <div
            class="flex flex-col justify-center items-center font-bold text-center w-full"
          >
            <h1>BCA</h1>
            <p>1234123400</p>
            <p>A/n Christopher Nathanael Tessy</p>
          </div>

          <!-- Account Number -->
          <div class="input-container mt-2">
            <label
              for="account_number"
              class="text-base font-medium text-secondary-500 sm:text-lg"
            >
              Nomor Rekening
            </label>

            <input
              type="text"
              id="account_number"
              name="account_number"
              placeholder="Masukkan nomor rekening Anda"
            />
            <p id="account-number-error-message" class="error-message"></p>
          </div>

          <!-- Account Name -->
          <div class="input-container mt-2">
            <label
              for="account_name"
              class="text-base font-medium text-secondary-500 sm:text-lg"
            >
              Nama Rekening
            </label>

            <input
              type="text"
              id="account_name"
              name="account_name"
              placeholder="Masukkan nama rekening Anda"
            />
            <p id="account-name-error-message" class="error-message"></p>
          </div>

          <!-- Proof of payment -->
          <div class="input-container mt-2">
            <label
              for="proof_of_payment"
              class="text-base font-medium text-secondary-500 sm:text-lg"
            >
              Bukti Transfer
            </label>

            <input
              type="file"
              id="proof_of_payment"
              name="proof_of_payment"
              placeholder="Masukkan nama rekening Anda"
            />
            <p id="proof-of-payment-error-message" class="error-message"></p>
          </div>
        </div>

        <div class="flex items-center justify-center gap-4">
          <button class="btn-secondary" type="button" @click="closeFormDana">
            Tutup
          </button>
          <button class="btn-primary" type="submit">Kirim</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
defineProps({
  isFormDanaOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["closeFormDana"]);

function closeFormDana() {
  emit("closeFormDana");
}
</script>

<style scoped>
/* Add any specific styles for this component here */
</style>
