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

    if (response.data && typeof response.data === "object" && "text" in response.data) {
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      // Log full response for debugging
      console.error("AI API Response Error:", error.response.data);
  } catch (error: unknown) {
    // Log the full error object for easier debugging
    console.error("Full error object:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as any).response === "object" &&
      (error as any).response !== null &&
      "data" in (error as any).response
    ) {
      const errResponse = (error as { response: { data: { error?: string } } }).response;
      console.error("AI API Response Error:", errResponse.data);
      throw new Error(errResponse.data.error || "Failed to get AI response");
    }

    const message = typeof error === "object" && error !== null && "message" in error
      ? String((error as { message?: unknown }).message)
      : "Network error occurred";
    console.error("Network or server error:", message);
    throw new Error(message);
  }

    console.error("Network or server error:", error.message);
    throw new Error("Network error occurred");
  }
};
