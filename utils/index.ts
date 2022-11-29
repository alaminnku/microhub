import axios from "axios";

// Create axios instance
export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://microhubbackend.microhubltd.com.au/api/v1",
});

// Current year
export const currentYear = new Date().getFullYear();

export const formatNumber = (number: number) => +number.toFixed(2);
