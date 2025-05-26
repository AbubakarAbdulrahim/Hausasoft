import { API_BASE_URL, getHeaders, handleResponse } from './config';

export interface PaymentResponse {
    payment_url: string;
    payment_id: string;
}

export interface PaymentStatus {
    status: 'pending' | 'success' | 'failed';
    message?: string;
}

export const initiatePayment = async (courseId: number) => {
    const response = await fetch(`${API_BASE_URL}/payments/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ course: courseId }),
    });
    return handleResponse(response);
};

export const checkPaymentStatus = async (paymentId: string) => {
    const response = await fetch(`${API_BASE_URL}/payments/${paymentId}/status/`, {
        headers: getHeaders(),
    });
    return handleResponse(response);
}; 