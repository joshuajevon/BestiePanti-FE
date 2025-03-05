const API_URL = import.meta.env.VITE_API_URL;

export async function createDonationDana(id, donation) {
  const token = localStorage.getItem("token");

  const requestBody = {
    donation: donation,
  };

  try {
    const response = await fetch(`${API_URL}/api/v1/donation/create/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.log(errorResponse);
      return errorResponse;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
