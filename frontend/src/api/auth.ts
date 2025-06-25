// src/api/auth.ts

// getHeaders: returns headers for API requests (e.g., with auth tokens)
// handleResponse: processes fetch responses (e.g., parses JSON, handles errors)
import { API_BASE_URL, getHeaders, handleResponse } from './config';

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData extends LoginData {
    name: string;
}

/**
 * Sends a login request to the API with the provided user credentials.
 * @param {LoginData} data - The user's login credentials (email and password).
 * @returns {Promise<any>} The response from the API after attempting to log in.
 */
export const login = async (data: LoginData) => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};
 * @returns {Promise<any>} The response from the API after attempting to register the user.
 */
export const register = async (data: RegisterData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};
        body: JSON.stringify(data),
/**
 * Fetches the authenticated user's profile information from the API.
 * @returns {Promise<any>} The user's profile data from the API.
 */
export const fetchUserProfile = async () => {
    const response = await fetch(`${API_BASE_URL}/users/me/`, {
        method: 'GET',
        headers: getHeaders(),
    });
    return handleResponse(response);
};
        headers: getHeaders(),
    });
    return handleResponse(response);
};
