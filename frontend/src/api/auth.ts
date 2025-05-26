import { API_BASE_URL, getHeaders, handleResponse } from './config';

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData extends LoginData {
    name: string;
}

export const login = async (data: LoginData) => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

export const register = async (data: RegisterData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

export const fetchUserProfile = async () => {
    const response = await fetch(`${API_BASE_URL}/auth/user/`, {
        headers: getHeaders(),
    });
    return handleResponse(response);
}; 