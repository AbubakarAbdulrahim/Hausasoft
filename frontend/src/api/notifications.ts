import { API_BASE_URL, getHeaders, handleResponse } from './config';

export interface Notification {
    id: number;
    message: string;
    read: boolean;
    created_at: string;
    type: string;
}

export const fetchNotifications = async () => {
    const response = await fetch(`${API_BASE_URL}/notifications/`, {
        headers: getHeaders(),
    });
    return handleResponse(response);
};

export const markAsRead = async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}/mark_read/`, {
        method: 'POST',
        headers: getHeaders(),
    });
    return handleResponse(response);
}; 