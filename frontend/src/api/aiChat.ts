import axios from "axios";
import { API_BASE_URL } from "./config";

export const sendMessage = async (message: string) => {
  if (!API_BASE_URL) {
    console.error("API_BASE_URL is not defined. Please check your .env file.");
    throw new Error("Server configuration error.");
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/learn-with-ai/`, {
      message,
    });

    if (
      response.data &&
      typeof response.data === "object" &&
      "text" in response.data
    ) {
      return response.data.text; // Or whatever structure your API returns
    } else {
      throw new Error("Invalid response format from AI API.");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const errResponse = error.response.data as { error?: string };
      console.error("AI API Response Error:", errResponse);
      throw new Error(errResponse.error || "Failed to get AI response");
    } else {
      const message =
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: unknown }).message)
          : "Network error occurred";
      console.error("Network or server error:", message);
      throw new Error(message);
    }
  }
};
