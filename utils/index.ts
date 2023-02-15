import axios, { AxiosError } from "axios";
import { IAlert, IAxiosError, IFoodItem } from "types";
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
  err: AxiosError<IAxiosError> | string,
  setAlerts: Dispatch<SetStateAction<IAlert[]>>
) {
  setAlerts((currState) =>
    typeof err === "string"
      ? [...currState, { message: err, type: "failed" }]
      : [
          ...currState,
          { message: err.response?.data.message as string, type: "failed" },
        ]
  );
}

// Week days
export const days: { [key: number]: string } = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

// Calculate macro
export const calculateMacro = (foodItems: IFoodItem[], unit: string) =>
  foodItems.reduce((acc, curr) => acc + curr.recipe[unit as keyof object], 0);
