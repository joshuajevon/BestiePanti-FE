const API_URL = import.meta.env.VITE_API_URL;

export async function createDonationDana(id, donationData) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("account_number", donationData.accountNumber);
  formData.append("account_name", donationData.accountName);
  formData.append("image", donationData.image); // Append image file

  try {
    const response = await fetch(
      `${API_URL}/api/v1/donation/fund/create/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Send as FormData
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      console.log(errorResponse);
      return errorResponse;
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
