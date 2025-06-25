// src/api/config.ts
// NOTE: This file assumes usage with Create React App (CRA) for process.env.REACT_APP_* variables.
// If you are not using CRA, adjust to your build tool's environment variable system.
export const API_BASE_URL =
  (typeof process !== "undefined" && process.env.REACT_APP_API_BASE_URL) ||
  "http://localhost:8000/api";

export const getHeaders = () => {
  const access = typeof window !== "undefined" ? localStorage.getItem("access") : null;
  return {
    "Content-Type": "application/json",
    ...(access ? { Authorization: `Bearer ${access}` } : {}),
  };
};

export try {
    const error = await response.json();
    errorDetail = error.detail || errorDetail;
  } catch (e) {
    // response is not valid JSON, keep default error message
  }
  
  if (!response.ok) {
    const errorDetail =
      (responseData && responseData.detail) || "An error occurred";
    throw new Error(
      `Error ${response.status} ${response.statusText}: ${errorDetail}`
    );
  }
  return responseData;
};
