import axios from "axios";
import { API_BASE_URL } from "./config";

export const sendMessage = async (message: string) => {
  if (!API_BASE_URL) {
    console.error("API_BASE_URL is not defined. Please check your .env file.");
    throw new Error("Server configuration error.");
  }

  try {
    // Make request to AI endpoint (GET or POST depending on your backend logic)
    const response = await axios.get(`${API_BASE_URL}/learn-with-ai/`, {
      params: { message },
    });

    return { response: response.data.text };
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as {
        response: { data: { error?: string; [key: string]: any } };
      };
      // Log full response for debugging
      console.error("AI API Response Error:", err.response.data);
      throw new Error(err.response.data.error || "Failed to get AI response");
    }

    if (error instanceof Error) {
      console.error("Network or server error:", error.message);
      throw new Error("Network error occurred");
    }

    console.error("An unknown error occurred");
    throw new Error("An unknown error occurred");
  }
};
