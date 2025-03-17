<template>
  <section class="bg-primary-50 text-secondary-500">
    <!-- Success Alerts -->
    <div
      class="p-8 fixed z-[100] h-screen w-screen flex justify-end items-end pointer-events-none top-0 left-0"
    >
      <transition name="slide-fade">
        <SuccessAlert
          v-if="showDanaSuccessAlert"
          text1="Donasi Dana telah terkirim"
          text2="Terima kasih! Donasi Dana Anda akan segera diproses."
        />
      </transition>

      <transition name="slide-fade">
        <SuccessAlert
          v-if="showNonDanaSuccessAlert"
          text1="Donasi Non Dana telah terkirim"
          text2="Terima kasih! Donasi Non Dana Anda akan segera diproses."
        />
      </transition>

      <transition name="slide-fade">
        <SuccessAlert
          v-if="showPesanSuccessAlert"
          text1="Pesan telah terkirim"
          text2="Terima kasih! Pesan Anda akan segera diproses."
        />
      </transition>
    </div>

    <!-- Form Dana -->
    <FormDana
      v-if="authStore.user && authStore.user.role !== 'ROLE_PANTI' && panti"
      :isFormDanaOpen="isFormDanaOpen"
      :id="pantiId"
      :qris="panti.qris"
      :pantiName="panti.name"
      :bankAccountName="panti.bank_account_name"
      :bankAccountNumber="panti.bank_account_number"
      :bankName="panti.bank_name"
      @closeFormDana="closeFormDana"
      @success="handleFormDanaSuccess"
    />

    <!-- Form Non Dana -->
    <FormNonDana
      v-if="authStore.user && authStore.user.role !== 'ROLE_PANTI' && panti"
      :isFormNonDanaOpen="isFormNonDanaOpen"
      :id="pantiId"
      @closeFormNonDana="closeFormNonDana"
      @success="handleFormNonDanaSuccess"
    />

    <!-- Form Pesan -->
    <FormPesan
      v-if="authStore.user && authStore.user.role !== 'ROLE_PANTI' && panti"
      :isFormPesanOpen="isFormPesanOpen"
      :id="pantiId"
      @closeFormPesan="closeFormPesan"
      @success="handleFormPesanSuccess"
    />

    <!-- Donation Report -->
    <DonationReport
      :isDonationReportOpen="isDonationReportOpen"
      :id="pantiId"
      @closeDonationReport="closeDonationReport"
    />

    <!-- Go back -->
    <section
      class="c-container flex flex-col items-center justify-center gap-8 pb-8 pt-32 lg:pb-12 lg:pt-36 xl:pb-16 xl:pt-40"
    >
      <div class="flex w-full">
        <button
          class="btn-primary flex justify-center items-center gap-2 lg:gap-3"
          @click="$router.go(-1)"
        >
          <svg
            class="w-5 lg:w-6 h-5 lg:h-6"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
            />
          </svg>
          Kembali
        </button>
      </div>
    </section>

    <!-- Loading -->
    <section
      v-if="isFetchingDatas"
      class="c-container flex flex-col items-center pb-8 lg:pb-12 xl:pb-16 min-h-screen"
    >
      <LoadingIndicator
        text="Memuat data panti asuhan..."
        color="text-secondary-500"
      />
    </section>

    <!-- Title -->
    <section
      v-if="!isFetchingDatas"
      class="c-container flex flex-col items-center justify-center gap-8 pb-8 lg:pb-12 xl:pb-16"
    >
      <div
        class="flex flex-col items-center justify-center gap-2 text-center lg:gap-4 xl:gap-6"
      >
        <h1 v-if="panti" class="text-3xl font-bold lg:text-4xl xl:text-5xl">
          {{ panti.name || "" }}
        </h1>

        <span
          class="flex justify-center items-center gap-0.5 text-secondary-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 lg:size-7 xl:size-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>

          <p class="text-lg lg:text-xl xl:text-2xl">
            {{ panti.region }}
          </p>
        </span>

        <p v-if="panti" class="text-lg lg:text-xl xl:text-2xl">
          {{ panti.address || "" }}
        </p>
      </div>
    </section>

    <!-- Image Carousel -->
    <section v-if="!isFetchingDatas" class="c-container pb-8 lg:pb-12 xl:pb-16">
      <swiper
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        :modules="modules"
        :loop="true"
        class="mySwiper h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[800px]"
      >
        <swiper-slide
          v-if="panti"
          v-for="(image, index) in panti.image"
          :key="index"
        >
          <img
            class="h-full w-full object-contain"
            :src="`${apiUrl}/storage/image/${image}`"
            :alt="`${panti.name}'s image ${index + 1}`"
          />
        </swiper-slide>
      </swiper>
    </section>

    <!-- Details -->
    <section
      v-if="!isFetchingDatas"
      class="c-container flex flex-col items-center justify-center gap-8 pb-8 lg:pb-12 xl:pb-16"
    >
      <!-- Donation and Message Buttons -->
      <div class="flex flex-col justify-center items-center gap-2">
        <div class="flex flex-wrap items-center justify-center gap-4">
          <!-- Dana -->
          <button
            class="btn-primary"
            :class="{
              'pointer-events-none opacity-50':
                !authStore.user ||
                isFetchingDatas ||
                authStore.user.role === 'ROLE_PANTI',
            }"
            @click="openFormDana"
          >
            Donasi Dana
          </button>

          <!-- Non Dana -->
          <button
            class="btn-primary"
            :class="{
              'pointer-events-none opacity-50':
                !authStore.user ||
                isFetchingDatas ||
                authStore.user.role === 'ROLE_PANTI',
            }"
            @click="openFormNonDana"
          >
            Donasi Non Dana
          </button>

          <!-- Message -->
          <button
            class="btn-primary"
            :class="{
              'pointer-events-none opacity-50':
                !authStore.user ||
                isFetchingDatas ||
                authStore.user.role === 'ROLE_PANTI',
            }"
            @click="openFormPesan"
          >
            Kirim Pesan
          </button>

          <!-- Donation Report -->
          <button
            class="flex items-center justify-center rounded-full bg-primary-500 text-center text-base font-bold text-white outline outline-4 -outline-offset-4 outline-transparent transition-all hover:outline-offset-0 hover:outline-primary-500/50 p-3 lg:p-3.5 lg:text-lg"
            @click="openDonationReport"
          >
            <svg
              class="size-6 lg:size-7"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"
              />
            </svg>
          </button>
        </div>

        <div v-if="!authStore.user && !isFetchingDatas">
          <p class="error-message">
            *Anda harus login terlebih dahulu untuk melakukan donasi atau kirim
            pesan
          </p>
        </div>
        <div v-else-if="authStore.user.role === 'ROLE_PANTI'">
          <p class="error-message">
            Akun panti asuhan tidak dapat digunakan untuk berdonasi atau
            mengirim pesan
          </p>
        </div>
      </div>

      <div class="w-full">
        <p v-if="panti" class="text-justify text-lg text-secondary-500">
          {{ panti.description }}
        </p>
      </div>
    </section>

    <!-- Pesan -->
    <section
      v-if="!isFetchingDatas"
      class="c-container flex flex-col items-center justify-center gap-8 pb-16 lg:pb-20 xl:pb-24"
    >
      <div
        class="flex w-full items-center justify-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8"
      >
        <h1 class="text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl">
          Pesan
        </h1>
        <div class="h-0.5 flex-1 bg-secondary-500"></div>
      </div>

      <LoadingIndicator
        v-if="isFetchingDatas"
        text="Memuat data pesan panti asuhan..."
        color="text-secondary-500"
      />

      <div
        v-else-if="messages.length > 0"
        class="flex flex-col justify-center items-center gap-8 w-full"
      >
        <div
          class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          <PesanCard
            v-if="messages"
            v-for="message in messages.slice(0, messagesToShow)"
            :key="message.id"
            :profile="message.donatur_profile"
            :name="message.donatur_name"
            :message="message.message"
          />
        </div>

        <button
          class="btn-primary"
          @click="loadMoreMessages"
          :class="{
            'pointer-events-none opacity-50':
              messages.length <= 4 || messagesToShow >= messages.length,
          }"
          :disabled="messages.length <= 4 || messagesToShow >= messages.length"
        >
          Lihat Lebih Banyak
        </button>
      </div>

      <p v-else class="error-message">Panti asuhan ini belum memiliki pesan</p>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import PesanCard from "@/components/cards/PesanCard.vue";
import { fetchPantiById } from "@/services/api-panti";
import { fetchPaymentByPantiId } from "@/services/api-payment";
import { fetchAllMessagesById } from "@/services/api-message";
import { useAuthStore } from "@/stores/authStore";

import "@/assets/swiper.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import FormDana from "@/components/forms/FormDana.vue";
import FormNonDana from "@/components/forms/FormNonDana.vue";
import FormPesan from "@/components/forms/FormPesan.vue";
import SuccessAlert from "@/components/alerts/SuccessAlert.vue";
import LoadingIndicator from "@/components/loading/LoadingIndicator.vue";
import DonationReport from "@/components/reports/DonationReport.vue";

const modules = [Pagination, Navigation];

const apiUrl = import.meta.env.VITE_API_URL;
const route = useRoute();
const pantiId = route.params.id;
const panti = ref(null);
const payment = ref(null);
const messages = ref([]);
const messagesToShow = ref(4);
const authStore = useAuthStore();

const isFormDanaOpen = ref(false);
const isFormNonDanaOpen = ref(false);
const isFormPesanOpen = ref(false);
const isDonationReportOpen = ref(false);

const showDanaSuccessAlert = ref(false);
const showNonDanaSuccessAlert = ref(false);
const showPesanSuccessAlert = ref(false);

const isFetchingDatas = ref(true);

const handleFormDanaSuccess = () => {
  showDanaSuccessAlert.value = true;

  setTimeout(() => {
    showDanaSuccessAlert.value = false;
  }, 3000);
};

const handleFormNonDanaSuccess = () => {
  showNonDanaSuccessAlert.value = true;

  setTimeout(() => {
    showNonDanaSuccessAlert.value = false;
  }, 3000);
};

const handleFormPesanSuccess = async () => {
  showPesanSuccessAlert.value = true;

  setTimeout(() => {
    showPesanSuccessAlert.value = false;
  }, 3000);
};

function openFormDana() {
  isFormDanaOpen.value = true;
}

function openFormNonDana() {
  isFormNonDanaOpen.value = true;
}

function openFormPesan() {
  isFormPesanOpen.value = true;
}

function openDonationReport() {
  isDonationReportOpen.value = true;
}

function closeFormDana() {
  isFormDanaOpen.value = false;
}

function closeFormNonDana() {
  isFormNonDanaOpen.value = false;
}

function closeFormPesan() {
  isFormPesanOpen.value = false;
}

function closeDonationReport() {
  isDonationReportOpen.value = false;
}

function loadMoreMessages() {
  messagesToShow.value += 4;
}

onMounted(async () => {
  try {
    const pantiData = await fetchPantiById(pantiId);
    panti.value = pantiData;

    const paymentData = await fetchPaymentByPantiId(pantiId);
    payment.value = paymentData;

    const messagesData = await fetchAllMessagesById(pantiId);
    messages.value = messagesData.message_responses.filter(
      (message) =>
        message.panti_id === parseInt(pantiId) && message.is_shown === 1
    );
  } catch (error) {
    console.log(error);
  } finally {
    isFetchingDatas.value = false;
  }
});
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
