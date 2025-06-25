// src/api/notifications.ts

import { API_BASE_URL, getHeaders, handleResponse } from "./config";

export interface Notification {
  id: number;
  message: string;
  read: boolean;
  created_at: string;
  type: string;
}

// Fetch all notifications (requires auth)
export const fetchNotifications = async (): Promise<Notification[]> => {
  const response = await fetch(`${API_BASE_URL}/notifications/`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
};

// Mark a specific notification as read
export const markAsRead = async (id: number): Promise<Notification> => {
  const response = await fetch(
    `${API_BASE_URL}/notifications/${id}/mark_read/`,
    {
      method: "POST",
      headers: getHeaders(),
    }
  );
  return handleResponse(response);
};
