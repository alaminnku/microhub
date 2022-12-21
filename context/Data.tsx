import { IContextProviderProps, IDataContext } from "types";
import { axiosInstance } from "@utils/index";
import { useRouter } from "next/router";
import { useUser } from "@context/User";
import { createContext, useContext, useEffect, useState } from "react";

// Create context
const DataContext = createContext({} as IDataContext);

// Create hook
export const useData = () => useContext(DataContext);

// Provider function
export default function DataProvider({ children }: IContextProviderProps) {
  // Hooks
  const router = useRouter();
  const { user } = useUser();
  const [program, setProgram] = useState({
    isLoading: true,
    data: [],
  });

  // Fetch user on app reload
  useEffect(() => {
    async function getPrograms() {
      try {
        // Make request to the backend
        const response = await axiosInstance.get("/consumers/programs");

        // Update state
        console.log(response.data.data.programs);
      } catch (err) {
        console.log(err);
      } finally {
        // Remove the loader
        setProgram((currState) => ({
          ...currState,
          isLoading: false,
        }));
      }
    }

    // Only call this function if there is an user
    if (user?.requested_nutritionists) {
      getPrograms();
    }
  }, [user, router.isReady]);

  return (
    <DataContext.Provider value={{ program }}>{children}</DataContext.Provider>
  );
}
