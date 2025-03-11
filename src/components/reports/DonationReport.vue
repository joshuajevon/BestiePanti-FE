<template>
  <section
    v-show="isDonationReportOpen"
    class="c-container fixed z-[100] h-screen w-screen bg-black/80"
  >
    <div class="flex h-full w-full items-center justify-center relative">
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

        <div class="overflow-x-auto">
          <div v-if="isFetching">
            <LoadingIndicator text="Memuat data donasi panti asuhan..." />
          </div>

          <table
            v-else
            class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-secondary-500"
          >
            <thead class="ltr:text-left rtl:text-right font-bold">
              <tr>
                <th class="whitespace-nowrap px-4 py-2">Tanggal Donasi</th>
                <th class="whitespace-nowrap px-4 py-2">Jenis Donasi</th>
                <th class="whitespace-nowrap px-4 py-2">Catatan</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="donation in combinedDonations"
                :key="donation.donation_date"
                class="odd:bg-gray-50"
              >
                <td class="whitespace-nowrap px-4 py-2 font-medium">
                  {{ donation.donation_date }}
                </td>
                <td class="whitespace-nowrap px-4 py-2">
                  {{ donation.donation_types }}
                </td>
                <td class="whitespace-nowrap px-4 py-2">
                  {{ donation.notes }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-center justify-center gap-4">
          <button
            class="btn-secondary"
            type="button"
            @click="closeDonationReport"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  fetchFundDonationsById,
  fetchNonFundDonationsById,
} from "@/services/api-donation";
import LoadingIndicator from "../loading/LoadingIndicator.vue";

const props = defineProps({
  isDonationReportOpen: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

const combinedDonations = ref([]);
const isFetching = ref(true);

const emit = defineEmits(["closeDonationReport"]);

const closeDonationReport = () => {
  emit("closeDonationReport");
};

onMounted(async () => {
  try {
    const fundDonationsData = await fetchFundDonationsById(props.id);
    const nonfundDonationsData = await fetchNonFundDonationsById(props.id);

    // Create the combined list
    combinedDonations.value = [
      ...fundDonationsData.fund_donation_responses
        .filter((donation) => donation.status === "COMPLETED") // Filter only "COMPLETED" donations
        .map((donation) => ({
          donation_date: donation.donation_date,
          donation_types: "Fund Donation",
          notes: donation.nominal_amount,
        })),
      ...nonfundDonationsData.nonfund_donation_responses
        .filter((donation) => donation.status === "COMPLETED") // Filter only "COMPLETED" donations
        .map((donation) => ({
          donation_date: donation.donation_date,
          donation_types: "Non-Fund Donation",
          notes: donation.notes,
        })),
    ];

    // Sort by date (latest first)
    combinedDonations.value.sort(
      (a, b) => new Date(b.donation_date) - new Date(a.donation_date)
    );
  } catch (error) {
    console.error("Error fetching donation data:", error);
  } finally {
    isFetching.value = false;
  }
});
</script>

<style scoped></style>
