export const formatDate = (dateString) => {
  if (!dateString) return "Tanggal tidak tersedia";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};