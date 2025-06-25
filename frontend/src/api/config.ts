// src/api/config.ts
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api";

export const getHeaders = () => {
  const access = typeof window !== "undefined" ? localStorage.getItem("access") : null;
  return {
    "Content-Type": "application/json",
    ...(access ? { Authorization: `Bearer ${access}` } : {}),
  };
};

export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorDetail = "An error occurred";
    throw new Error(
      `Error ${response.status} ${response.statusText}: ${error.detail || "An error occurred"}`
    );
      const error = await response.json();
      errorDetail = error.detail || errorDetail;
    } catch (e) {
      // response is not valid JSON, keep default error message
    }
    throw new Error(errorDetail);
  }
  return response.json();
};
