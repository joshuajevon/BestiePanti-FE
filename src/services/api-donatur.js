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

export async function updateProileDonaturByUser(donaturData) {
  const formData = new FormData();
  formData.append("name", donaturData.name);
  formData.append("email", donaturData.email);
  formData.append("phone", donaturData.phone);
  formData.append("gender", donaturData.gender);
  formData.append("dob", donaturData.dob);
  formData.append("address", donaturData.address);

  if (donaturData.profile) {
    formData.append("profile", donaturData.profile);
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/donatur/profile/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.log("Response Error:", errorResponse);
      return errorResponse;
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}