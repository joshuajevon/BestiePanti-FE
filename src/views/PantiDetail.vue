<template>
  <!-- Loading -->
  <section
    v-if="isFetchingDatas"
    class="bg-primary-50 text-secondary-500 min-h-screen flex justify-center items-center"
  >
    <LoadingIndicator
      text="Memuat data panti asuhan..."
      color="text-secondary-500"
    />
  </section>

  <section
    v-else-if="panti"
    class="c-container bg-primary-50 text-secondary-500"
  >
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

    <!-- Donation and Message Buttons -->
    <section
      class="c-container flex flex-col justify-center items-center gap-2 pt-32 lg:pt-40 xl:pt-48 pb-8 lg:pb-12 xl:pb-16"
    >
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

      <div v-if="!authStore.user">
        <p class="error-message">
          *Anda harus login terlebih dahulu untuk melakukan donasi atau kirim
          pesan
        </p>
      </div>

      <div v-else-if="authStore.user.role === 'ROLE_PANTI'">
        <p class="error-message">
          Akun panti asuhan tidak dapat digunakan untuk berdonasi atau mengirim
          pesan
        </p>
      </div>
    </section>

    <!-- Panti Informations -->
    <section
      class="c-container flex flex-col md:flex-row md:gap-8 gap-16 pb-8 lg:pb-12 xl:pb-16"
    >
      <!-- Image Carousel -->
      <div class="flex flex-col gap-4">
        <swiper
          :pagination="{
            clickable: true,
          }"
          :navigation="true"
          :modules="modules"
          :loop="true"
          class="mySwiper aspect-video w-full md:w-[300px] lg:w-[400px] xl:w-[500px]"
        >
          <swiper-slide v-for="(image, index) in panti.image" :key="index">
            <img
              class="h-full w-full object-contain"
              :src="`${apiUrl}/storage/image/${image}`"
              :alt="`${panti.name}'s image ${index + 1}`"
            />
          </swiper-slide>
        </swiper>

        <iframe
          v-if="panti.maps"
          :src="`${panti.maps}`"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="w-full md:w-[300px] lg:w-[400px] xl:w-[500px] aspect-video"
        >
        </iframe>
      </div>

      <!-- Details -->
      <div class="flex flex-col gap-4">
        <h1 class="text-3xl font-bold lg:text-4xl xl:text-5xl">
          {{ panti.name || "" }}
        </h1>

        <span class="flex items-center gap-0.5 text-secondary-500">
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
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>

          <p>
            {{ panti.region }}
          </p>
        </span>

        <p>
          {{ panti.address || "" }}
        </p>

        <p class="text-justify text-secondary-500">
          {{ panti.description }}
        </p>
      </div>
    </section>

    <!-- Pesan -->
    <section
      class="c-container flex flex-col items-center justify-center gap-8 pb-16 lg:pb-20 xl:pb-24"
    >
      <div
        class="flex w-full items-center justify-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8"
      >
        <h1 class="text-xl font-bold lg:text-2xl xl:text-3xl 2xl:text-4xl">
          Pesan dari Donatur
        </h1>
        <div class="h-0.5 flex-1 bg-secondary-500"></div>
      </div>

      <LoadingIndicator
        v-if="isFetchingDatas"
        text="Memuat data pesan dari donatur..."
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

  <section
    v-else
    class="c-container bg-primary-50 text-secondary-500 min-h-screen flex flex-col justify-center items-center gap-8"
  >
    <p class="error-message text-center">
      Maaf, Panti Asuhan ini tidak dapat ditemukan
    </p>

    <a href="/">
      <button class="btn-primary">Kembali ke Beranda</button>
    </a>
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

<style>
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
.swiper-slide {
  background-color: #e5e9f2;
}

span.swiper-pagination-bullet {
  background-color: white;
  opacity: 100;
  border-radius: 9999px;
  width: 8px;
}

span.swiper-pagination-bullet-active {
  background-color: #2547fa;
  width: 32px;
}

div.swiper-button-prev,
div.swiper-button-next {
  border: 5px solid #2547fa;
  border-radius: 999px;
  width: 64px;
  height: 64px;
  color: white;
  background: #2547fa;
  transition-property: all;
  transition-timing-function: var(cubic-bezier(0.4, 0, 0.2, 1));
  transition-duration: 150ms;
  outline-style: solid;
  outline-width: 4px;
  outline-offset: -4px;
  outline-color: transparent;
  scale: 0.8;
}

div.swiper-button-prev:hover,
div.swiper-button-next:hover {
  outline-offset: 0;
  outline-color: rgb(37 71 250 / 0.5);
}

div.swiper-button-prev::after,
div.swiper-button-next::after {
  scale: 0.8;
}

div.swiper-button-prev {
  margin-left: 0.5rem;
}

div.swiper-button-next {
  margin-right: 0.5rem;
}

@media (min-width: 768px) {
  div.swiper-button-prev,
  div.swiper-button-next {
    scale: 0.6;
  }

  div.swiper-button-prev {
    margin-left: 0.3rem;
  }

  div.swiper-button-next {
    margin-right: 0.3rem;
  }
}

@media (min-width: 1024px) {
  div.swiper-button-prev,
  div.swiper-button-next {
    scale: 0.7;
  }

  div.swiper-button-prev {
    margin-left: 0.4rem;
  }

  div.swiper-button-next {
    margin-right: 0.4rem;
  }
}

@media (min-width: 1280px) {
  div.swiper-button-prev,
  div.swiper-button-next {
    scale: 0.8;
  }

  div.swiper-button-prev {
    margin-left: 0.5rem;
  }

  div.swiper-button-next {
    margin-right: 0.5rem;
  }
}
</style>
