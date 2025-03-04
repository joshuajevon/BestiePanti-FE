const API_URL = import.meta.env.VITE_API_URL;

export async function fetchPaymentByPantiId(id) {
  try {
    const response = await fetch(`${API_URL}/api/v1/panti/view/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch panti data. Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
