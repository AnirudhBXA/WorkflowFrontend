// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

// Attach access token
axiosInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Refresh logic
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "/api/v1/auth/refresh-token",
          {},
          { withCredentials: true },
        );

        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
