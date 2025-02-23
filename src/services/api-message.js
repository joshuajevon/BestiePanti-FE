const API_URL = import.meta.env.VITE_API_URL;

export async function createMessage(id, message){
    const token = localStorage.getItem("token");
  
    const requestBody = {
      message: message
    };
  
    try {
      const response = await fetch(`${API_URL}/api/v1/message/create/${id}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok){
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
}