import { useUser } from "./User";
import { createContext, useContext, useEffect, useState } from "react";
import { IContextProviderProps, IPreBuiltRecipe, IDataContext } from "types";
import { axiosInstance } from "@utils/index";

// Create context
const DataContext = createContext({} as IDataContext);

// Create hooks
export const useData = () => useContext(DataContext);

// Provider function
export default function DataProvider({ children }: IContextProviderProps) {
  // Hooks
  const { user } = useUser();
  const [programs, setPrograms] = useState({
    isLoading: true,
    data: [],
  });
  const [preBuiltRecipes, setPreBuiltRecipes] = useState<IPreBuiltRecipe[]>([]);

  useEffect(() => {
    if (user) {
      getPrograms();
    }
  }, [user]);

  // Get recipe
  async function getPrograms() {
    try {
      const response = await axiosInstance.get("/programs/self");

      setPrograms((currState) => ({
        ...currState,
        data: response.data.data.programs,
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setPrograms((currState) => ({ ...currState, isLoading: false }));
    }
  }
  return (
    <DataContext.Provider
      value={{ preBuiltRecipes, setPreBuiltRecipes, programs }}
    >
      {children}
    </DataContext.Provider>
  );
}
