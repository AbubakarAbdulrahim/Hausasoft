import axios from 'axios';
import { API_BASE_URL } from './config';

export const sendMessage = async (message: string) => {
  try {
    const response: any = await axios.get(`${API_BASE_URL}/learn-with-ai/`, {
      params: { prompt: message },
    });
    return { response: response.data.text };
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Failed to get AI response');
    }
    throw new Error('Network error occurred');
  }
}; 