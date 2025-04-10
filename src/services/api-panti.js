const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export async function fetchAllPanti() {
  try {
    const response = await fetch(`${API_URL}/api/v1/panti/view`, {
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

export async function fetchPantiById(id) {
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

export async function deletePanti(id) {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/panti/delete/${id}`,
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

export async function createPanti(pantiData) {
  const formData = new FormData();

  formData.append("name", pantiData.name);
  formData.append("email", pantiData.email);
  formData.append("password", pantiData.password);
  formData.append("confirmationPassword", pantiData.confrimation_password);
  formData.append("description", pantiData.description);
  formData.append("phone", pantiData.phone);
  formData.append("isUrgent", pantiData.is_urgent);
  formData.append("address", pantiData.address);
  formData.append("region", pantiData.region);
  formData.append("bankName", pantiData.bank_name);
  formData.append("bankAccountNumber", pantiData.bank_account_number);
  formData.append("bankAccountName", pantiData.bank_account_name);
  formData.append("maps", pantiData.maps);

  if (pantiData.donation_types.length > 0) {
    pantiData.donation_types.forEach(type => {
      formData.append("donationTypes", type);
    });
  }

  if (pantiData.qris) {
    formData.append("qris", pantiData.qris);
  }

  if (Array.isArray(pantiData.image) && pantiData.image.length > 0) {
    pantiData.image.forEach(file => {
      formData.append("image", file);
    });
  }

  try {
    const response = await fetch(`${API_URL}/api/v1/panti/create`, {
      method: "POST",
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
