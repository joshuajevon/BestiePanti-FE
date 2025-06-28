<template>
  <section
    v-show="isDonationReportOpen"
    class="c-container fixed z-[100] h-screen w-screen bg-black/80 top-0 left-0"
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
            Laporan
            <span class="font-bold text-primary-300">Donasi</span>
          </h1>
          <p class="text-center text-base sm:text-lg">
            Berikut adalah daftar donasi yang telah diterima oleh panti asuhan.
          </p>
        </div>

        <div class="max-h-80 overflow-y-auto overscroll-none rounded-md">
          <div v-if="isFetching" class="flex justify-center items-center">
            <LoadingIndicator
              text="Memuat data laporan donasi panti asuhan..."
              color="text-secondary-500"
            />
          </div>

          <div
            v-else-if="combinedDonations.length > 0"
            class="flex flex-col gap-4"
          >
            <p class="text-s">
              Total donasi dana diterima:
              {{ formatRupiah(totalFundDonationAmount) }}
            </p>

            <table
              class="min-w-full bg-white text-sm text-secondary-500 border border-secondary-100"
            >
              <thead class="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th class="px-4 py-2">Tanggal Donasi</th>
                  <th class="px-4 py-2">Jenis Donasi</th>
                  <th class="px-4 py-2">Catatan</th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="donation in combinedDonations"
                  :key="donation.donation_date"
                  class="odd:bg-gray-50"
                >
                  <td class="px-4 py-2 font-medium">
                    {{ formatDate(donation.donation_date) }}
                  </td>
                  <td class="px-4 py-2">
                    {{ donation.donation_types }}
                  </td>
                  <td class="px-4 py-2">
                    {{ donation.notes }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="flex justify-center items-center">
            <p class="error-message text-center">
              Panti asuhan ini belum pernah menerima donasi
            </p>
          </div>
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
  fetchFundDonationsTotalAmountById,
} from "@/services/api-donation";
import LoadingIndicator from "../loading/LoadingIndicator.vue";
import { formatDate } from "@/utils/date";
import { formatRupiah } from "@/utils/amount";

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
const totalFundDonationAmount = ref(0);

const emit = defineEmits(["closeDonationReport"]);

const closeDonationReport = () => {
  emit("closeDonationReport");
};

onMounted(async () => {
  try {
    const fundDonationsData = await fetchFundDonationsById(props.id);
    const nonfundDonationsData = await fetchNonFundDonationsById(props.id);
    const fundDonationTotalAmount = await fetchFundDonationsTotalAmountById(
      props.id
    );

    // Create the combined list
    combinedDonations.value = [
      ...fundDonationsData.fund_donation_responses
        .filter((donation) => donation.status === "COMPLETED") // Filter only "COMPLETED" donations
        .map((donation) => ({
          donation_date: donation.donation_date,
          donation_types: "Donasi Dana",
          notes: formatRupiah(donation.nominal_amount),
        })),
      ...nonfundDonationsData.nonfund_donation_responses
        .filter((donation) => donation.status === "COMPLETED") // Filter only "COMPLETED" donations
        .map((donation) => ({
          donation_date: donation.donation_date,
          donation_types: "Donasi Non Dana",
          notes: donation.notes,
        })),
    ];

    // Sort by date (latest first)
    combinedDonations.value.sort(
      (a, b) => new Date(b.donation_date) - new Date(a.donation_date)
    );

    totalFundDonationAmount.value = fundDonationTotalAmount.total_amount;
  } catch (error) {
    console.error("Error fetching donation data:", error);
  } finally {
    isFetching.value = false;
  }
});
</script>

<style scoped></style>
