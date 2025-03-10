const API_URL = import.meta.env.VITE_API_URL;

export async function fetchAllDonatur() {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/api/v1/donatur/view`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch donation data. Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
