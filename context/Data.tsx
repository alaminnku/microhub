import { axiosInstance } from "@utils/index";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { IContextProviderProps, IUser, IUserContext } from "types";

// Create context
const DataContext = createContext({});

// Create hook
export const useUser = () => useContext(DataContext);

// Provider function
export default function DataProvider({ children }: IContextProviderProps) {
  // Hooks
  const router = useRouter();
  const [program, setProgram] = useState({
    isLoading: true,
    data: null,
  });

  // Fetch user on app reload
  useEffect(() => {
    async function getData() {
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

    getData();
  }, [router.isReady]);

  return (
    <DataContext.Provider value={{ program, setProgram }}>
      {children}
    </DataContext.Provider>
  );
}
