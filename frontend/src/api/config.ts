export const API_BASE_URL = 'http://localhost:8000/api';

export const getHeaders = () => {
    const access = localStorage.getItem('access');
    return {
        'Content-Type': 'application/json',
        ...(access ? { 'Authorization': `Bearer ${access}` } : {})
    };
};

export const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'An error occurred');
    }
    return response.json();
}; 