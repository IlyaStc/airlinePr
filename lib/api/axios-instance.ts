import axios from "axios"
import { getFromStorage } from "../utils";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001",
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    const token = getFromStorage("jwtToken", "");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance