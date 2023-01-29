import axios, { AxiosError } from "axios";
import { IAlert, IAxiosError } from "types";
import { Dispatch, SetStateAction } from "react";

// Create axios instance
export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://microhubbackend.microhubltd.com.au/api/v1",
});

// Current year
export const currentYear = new Date().getFullYear();

// Format number
export const formatNumber = (number: number) => +number.toFixed(2);

// Success alert
export function showSuccessAlert(
  message: string,
  setAlerts: Dispatch<SetStateAction<IAlert[]>>
) {
  setAlerts((currState) => [...currState, { message, type: "success" }]);
}

// Error alert
export function showErrorAlert(
  err: AxiosError<IAxiosError>,
  setAlerts: Dispatch<SetStateAction<IAlert[]>>
) {
  setAlerts((currState) =>
    err.response
      ? [
          ...currState,
          { message: err.response?.data.message as string, type: "failed" },
        ]
      : [...currState, { message: "Something wen't wrong", type: "failed" }]
  );
}
