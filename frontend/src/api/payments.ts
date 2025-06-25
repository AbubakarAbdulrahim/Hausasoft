// src/api/payments.ts

import { API_BASE_URL, getHeaders, handleResponse } from "./config";

export interface PaymentResponse {
  payment_url: string;
  payment_id: string;
}

export interface PaymentStatus {
  status: "pending" | "success" | "failed";
  message?: string;
}

// Initiate payment for a specific course
export const initiatePayment = async (
  courseId: number
): Promise<PaymentResponse> => {
  const response = await fetch(`${API_BASE_URL}/payments/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ course: courseId }),
  });
  return handleResponse(response);
};

// Check the status of a specific payment
export const checkPaymentStatus = async (
  paymentId: string
): Promise<PaymentStatus> => {
  const response = await fetch(
    `${API_BASE_URL}/payments/${paymentId}/status/`,
    {
      headers: getHeaders(),
    }
  );
  return handleResponse(response);
};
