const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

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
      throw new Error(`Failed to fetch donatur data. Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function deleteDonatur(id) {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/donatur/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

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