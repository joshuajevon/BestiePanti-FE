export function formatRupiah(amount) {
  if (!amount) return "Rp. 0";

  return "Rp. " + parseInt(amount, 10).toLocaleString("id-ID");
}