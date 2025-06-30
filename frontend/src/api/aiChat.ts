import axios from "axios";
import { API_BASE_URL } from "./config";

export const sendMessage = async (message: string) => {
  if (!API_BASE_URL) {
    console.error("API_BASE_URL is not defined. Please check your .env file.");
    throw new Error("Server configuration error.");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/learn-with-ai/`, {
      params: { message },
    });

    return { response: response.data.text };
  } catch (error: any) {
    if (error.response) {
      // Log full response for debugging
      console.error("AI API Response Error:", error.response.data);
      throw new Error(error.response.data.error || "Failed to get AI response");
    }

    console.error("Network or server error:", error.message);
    throw new Error("Network error occurred");
  }
};
