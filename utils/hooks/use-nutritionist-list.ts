import { useAlert } from "@context/Alert";
import { useUser } from "@context/User";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IAxiosError, INutritionist } from "types";
import { axiosInstance, showErrorAlert } from "..";

export const useNitritionistList = () => {
  const { setAlerts } = useAlert();

  const [nutritionistList, setNutritionistList] = useState<INutritionist[]>([]);

  const [nutritionistLoading, setNutritionistLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setNutritionistLoading(true);

        const { data } = await axiosInstance.get<{ data: { nutritionists: INutritionist[] } }>("consumers/trainers");
        setNutritionistList(data.data.nutritionists);

        console.log(data);
      } catch (error) {
        showErrorAlert(error as AxiosError<IAxiosError>, setAlerts);
      } finally {
        setNutritionistLoading(false);
      }
    };

    getData();
  }, []);

  return { nutritionistList, nutritionistLoading };
};
