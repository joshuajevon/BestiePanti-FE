const API_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token");

export async function createDonationDana(id, donationData) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("accountNumber", donationData.accountNumber);
  formData.append("accountName", donationData.accountName);
  formData.append("nominalAmount", donationData.nominalAmount);
  formData.append("image", donationData.image);

  try {
    const response = await fetch(
      `${API_URL}/api/v1/donation/fund/create/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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

export async function createDonationNonDana(id, donationData) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `${API_URL}/api/v1/donation/nonfund/create/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(donationData),
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

export async function fetchAllFundDonation() {
  try {
    const response = await fetch(`${API_URL}/api/v1/donation/fund/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch fund donation data. Status: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function fetchAllNonFundDonation() {
  try {
    const response = await fetch(`${API_URL}/api/v1/donation/nonfund/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch non fund donation data. Status: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function fetchFundDonationsById(id) {
  try {
    const response = await fetch(`${API_URL}/api/v1/donation/fund/view/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch fund donation data. Status: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function fetchNonFundDonationsById(id) {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/donation/nonfund/view/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch non fund donation data. Status: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function fetchFundDonationByDonationId(id) {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/donation/fund/get/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 403) {
      return { forbidden: true };
    }

    if (!response.ok) {
      const errorResponse = await response.json();
      console.log("Error response:", errorResponse);
      return errorResponse;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function fetchNonFundDonationByDonationId(id) {
  try {
    const response = await fetch(
      `${API_URL}/api/v1/donation/nonfund/get/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 403) {
      return { forbidden: true };
    }

    if (!response.ok) {
      const errorResponse = await response.json();
      console.log("Error response:", errorResponse);
      return errorResponse;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function verifyDonationDana(id, donationData) {
  const formData = new FormData();
  formData.append("accountNumber", donationData.accountNumber);
  formData.append("accountName", donationData.accountName);
  formData.append("nominalAmount", String(donationData.nominalAmount));
  formData.append("status", donationData.status);

  try {
    const response = await fetch(
      `${API_URL}/api/v1/donation/fund/verify/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      console.log("Response Error:", errorResponse);
      return errorResponse;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function verifyDonationNonDana(id, donationData) {
  const jsonData = {
    donation_date: donationData.donationDate,
    is_onsite: donationData.isOnsite === "1" ? 1 : 0, 
    donation_types: donationData.donationTypes, 
    pic: donationData.pic,
    active_phone: donationData.activePhone,
    notes: donationData.notes,
    status: donationData.status,
  };

  console.log("Data setelah diproses sebelum dikirim:", jsonData);

  try {
    const response = await fetch(
      `${API_URL}/api/v1/donation/nonfund/verify/${id}`,
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      console.log("Response Error dari backend:", errorResponse);
      return errorResponse;
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}