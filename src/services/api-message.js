const API_URL = import.meta.env.VITE_API_URL;

export async function createMessage(id, message) {
  const token = localStorage.getItem("token");

  const requestBody = {
    message: message,
  };

  try {
    const response = await fetch(`${API_URL}/api/v1/message/create/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return errorResponse;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function fetchAllMessagesById(id) {
  try {
    const response = await fetch(`${API_URL}/api/v1/message/view/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch panti messages. Status: ${response.status}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
