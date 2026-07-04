import axios, { AxiosError } from "axios";
import { authStore } from "../store/AuthStore";

export const API = axios.create({
  // Ubah menjadi VITE_API_URL
  baseURL: import.meta.env.VITE_API_URL || "https://syubbanul-khoir.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = authStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      authStore.getState().logout();
      window.dispatchEvent(new Event("auth:unauthorized"));
    }
    return Promise.reject(error);
  },
);