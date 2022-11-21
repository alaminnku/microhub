import axios from "axios";

// Create axios instance
export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://shark-app-6h3kz.ondigitalocean.app/api/v1",
});

// Current year
export const currentYear = new Date().getFullYear();
