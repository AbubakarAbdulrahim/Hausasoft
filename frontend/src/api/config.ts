// src/api/config.ts

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getHeaders = () => {
  const access =
    typeof window !== "undefined" ? localStorage.getItem("access") : null;
  return {
    "Content-Type": "application/json",
    ...(access ? { Authorization: `Bearer ${access}` } : {}),
  };
};

export const handleResponse = async (response: Response) => {
  let responseData;
  try {
    responseData = await response.json();
  } catch (e) {
    responseData = null;
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
