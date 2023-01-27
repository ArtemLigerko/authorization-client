import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export const API_URL = "http://localhost:5000/api";

const instans = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

instans.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

instans.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config.isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return instans.request(originalRequest);
      } catch (e) {
        console.log("Not authorized!");
      }
    }
    throw error;
  }
);

export default instans;
