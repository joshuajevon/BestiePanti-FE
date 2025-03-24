<template>
  <section
    v-show="isFormNonDanaOpen"
    class="c-container fixed z-[100] h-screen w-screen bg-black/80 py-8"
  >
    <!-- Loading Overlay -->
    <div
      v-if="isSubmitting"
      class="absolute inset-0 m-auto z-[200] w-screen h-screen bg-black/50 flex justify-center items-center"
    >
      <div class="bg-white rounded-xl p-8">
        <LoadingIndicator
          text="Mengirim donasi..."
          class="text-secondary-500"
        />
      </div>
    </div>

    <form
      method="POST"
      class="flex h-full w-full items-center justify-center"
      @submit.prevent="submitForm"
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
            <span class="font-bold text-primary-300">Donasi Non Dana</span>
          </h1>
          <p class="text-center text-base sm:text-lg">
            Silakan isi formulir berikut untuk melakukan donasi non dana.
            <span class="font-bold"
              >Pastikan semua informasi yang Anda masukkan akurat</span
            >
            agar proses donasi dapat berjalan dengan lancar.
          </p>
        </div>

        <div class="flex w-full flex-col items-start justify-center gap-6">
          <!-- Donation Date -->
          <div class="input-container mt-2">
            <label
              for="donation_date"
              class="text-base font-medium text-secondary-500 sm:text-lg"
              >Tanggal Donasi</label
            >

            <input
              type="date"
              id="donation_date"
              name="donation_date"
              placeholder="Masukkan tanggal donasi"
              v-model="donationData.donation_date"
              :min="new Date().toISOString().split('T')[0]"
            />

            <p
              v-if="errorMessages.donation_date"
              id="donation-date-error-message"
              class="error-message"
            >
              {{ errorMessages.donation_date }}
            </p>
          </div>

          <!-- Donation Method -->
          <div class="input-container mt-2">
            <label class="text-base font-medium text-secondary-500 sm:text-lg"
              >Metode Donasi</label
            >
            <div
              class="mt-1 flex w-full items-center justify-start gap-8 text-sm sm:text-base"
            >
              <div class="flex items-center gap-2">
                <input
                  type="radio"
                  id="onsite"
                  name="donation-method"
                  v-model="donationData.is_onsite"
                  value="1"
                />
                <label for="onsite">Onsite</label>
              </div>
              <div class="flex items-center gap-2">
                <input
                  type="radio"
                  id="online"
                  name="donation-method"
                  v-model="donationData.is_onsite"
                  value="0"
                />
                <label for="online">Online (Kurir / Gosend, dll)</label>
              </div>
            </div>

            <p
              v-if="errorMessages.is_onsite"
              id="donation-method-error-message"
              class="error-message"
            >
              {{ errorMessages.is_onsite }}
            </p>
          </div>

          <!-- Donation Types -->
          <div class="input-container mt-2">
            <label class="text-base font-medium text-secondary-500 sm:text-lg"
              >Tipe Donasi</label
            >

            <div class="flex flex-wrap gap-4">
              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="makanan"
                  name="donation-type"
                  v-model="donationData.donation_types"
                  value="Pangan"
                />
                <label for="makanan">Makanan</label>
              </div>

              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="barang"
                  name="donation-type"
                  v-model="donationData.donation_types"
                  value="Barang"
                />
                <label for="barang">Barang</label>
              </div>

              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="tenaga"
                  name="donation-type"
                  v-model="donationData.donation_types"
                  value="Tenaga"
                />
                <label for="tenaga">Tenaga</label>
              </div>
            </div>

            <p
              v-if="errorMessages.donation_types"
              id="donation-types-error-message"
              class="error-message"
            >
              {{ errorMessages.donation_types }}
            </p>
          </div>

          <!-- PIC -->
          <div class="input-container mt-2">
            <label class="text-base font-medium text-secondary-500 sm:text-lg"
              >Nama Orang Yang Dapat Dihubungi</label
            >

            <input
              type="text"
              id="pic"
              name="pic"
              placeholder="Masukkan nama orang yang dapat dihubungi"
              v-model="donationData.pic"
            />

            <p
              v-if="errorMessages.pic"
              id="pic-error-message"
              class="error-message"
            >
              {{ errorMessages.pic }}
            </p>
          </div>

          <!-- Nomor Telepon -->
          <div class="input-container mt-2">
            <label class="text-base font-medium text-secondary-500 sm:text-lg"
              >Nomor Telepon Yang Dapat Dihubungi</label
            >

            <div class="relative">
              <div
                class="absolute left-5 sm:left-6 top-0 bottom-0 my-auto h-fit text-sm sm:text-base"
              >
                <p>+62</p>
              </div>

              <input
                type="text"
                id="active_phone"
                name="active_phone"
                placeholder="Masukkan nomor telepon yang dapat dihubungi"
                v-model="donationData.active_phone"
                class="pl-14 sm:pl-16"
                inputmode="numeric"
                @input="
                  donationData.active_phone = $event.target.value.replace(
                    /\D/g,
                    ''
                  )
                "
              />
            </div>

            <p
              v-if="errorMessages.active_phone"
              id="active-phone-error-message"
              class="error-message"
            >
              {{ errorMessages.active_phone }}
            </p>
          </div>

          <!-- Notes -->
          <div class="input-container mt-2">
            <label
              for="notes"
              class="text-base font-medium text-secondary-500 sm:text-lg"
            >
              Catatan (Dekripsi donasi yang ingin diberikan)
            </label>

            <textarea
              name="notes"
              id="notes"
              placeholder="Masukkan catatan untuk donasi yang akan diberikan"
              rows="5"
              v-model="donationData.notes"
            ></textarea>

            <p
              v-if="errorMessages.notes"
              id="notes-error-message"
              class="error-message"
            >
              {{ errorMessages.notes }}
            </p>
          </div>
        </div>

        <div class="flex items-center justify-center gap-4">
          <button class="btn-secondary" type="button" @click="closeFormNonDana">
            Tutup
          </button>
          <button class="btn-primary" type="submit">Kirim</button>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup>
import { createDonationNonDana } from "@/services/api-donation";
import { reactive, ref } from "vue";
import LoadingIndicator from "../loading/LoadingIndicator.vue";

const props = defineProps({
  isFormNonDanaOpen: { type: Boolean, required: true },
  id: { type: String, required: true },
});

const emit = defineEmits(["closeFormNonDana", "success"]);

const donationData = reactive({
  donation_date: "",
  is_onsite: "",
  donation_types: [],
  pic: "",
  active_phone: "",
  notes: "",
});

const errorMessages = reactive({
  donation_date: "",
  is_onsite: "",
  donation_types: "",
  pic: "",
  active_phone: "",
  notes: "",
});

const isSubmitting = ref(false);

const validateForm = () => {
  Object.keys(errorMessages).forEach((key) => {
    errorMessages[key] = "";
  });

  let isValid = true;

  if (!donationData.donation_date.trim()) {
    errorMessages.donation_date = "Tanggal Donasi tidak boleh kosong";
    isValid = false;
  }

  if (!donationData.is_onsite.trim()) {
    errorMessages.is_onsite = "Metode Donasi tidak boleh kosong";
    isValid = false;
  }

  if (donationData.donation_types.length === 0) {
    errorMessages.donation_types = "Tipe Donasi tidak boleh kosong";
    isValid = false;
  }

  if (!donationData.pic.trim()) {
    errorMessages.pic = "Nama Orang Yang Dapat Dihubungi tidak boleh kosong";
    isValid = false;
  }

  if (!donationData.active_phone.trim()) {
    errorMessages.active_phone =
      "Nomor Telepon Yang Dapat Dihubungi tidak boleh kosong";
    isValid = false;
  } else if (!/^\d+$/.test(donationData.active_phone)) {
    errorMessages.active_phone = "Nomor Telepon hanya boleh mengandung angka";
    isValid = false;
  } else if (donationData.active_phone.startsWith("0")) {
    errorMessages.active_phone = "Nomor Telepon tidak boleh diawali dengan 0";
    isValid = false;
  } else if (
    donationData.active_phone.length < 10 ||
    donationData.active_phone.length > 13
  ) {
    errorMessages.active_phone =
      "Nomor Telepon harus memiliki 10 hingga 13 digit";
    isValid = false;
  }

  if (!donationData.notes.trim()) {
    errorMessages.notes = "Catatan tidak boleh kosong";
    isValid = false;
  }

  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    const response = await createDonationNonDana(props.id, donationData);

    if (response.message && !response.id) {
      errorMessages.message = response.message;
      return;
    }

    donationData.donation_date = "";
    donationData.is_onsite = "";
    donationData.donation_types = [];
    donationData.pic = "";
    donationData.active_phone = "";
    donationData.notes = "";
    Object.keys(errorMessages).forEach((key) => (errorMessages[key] = ""));

    emit("success");
    closeFormNonDana();
  } catch (error) {
    console.error("Error sending donation:", error);
    errorMessages.message = "Terjadi kesalahan. Silakan coba lagi.";
  } finally {
    isSubmitting.value = false;
  }
};

const closeFormNonDana = () => {
  emit("closeFormNonDana");
};
</script>

<style scoped></style>
