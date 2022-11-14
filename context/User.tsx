import { axiosInstance } from "@utils/index";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { IContextProviderProps, IUser, IUserContext } from "types";

// Create context
const UserContext = createContext({} as IUserContext);

// Create hook
export const useUser = () => useContext(UserContext);

// Provider function
export default function UserProvider({ children }: IContextProviderProps) {
  // Hooks
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);

  console.log(user);

  // Fetch user on app reload
  useEffect(() => {
    async function getUser() {
      try {
        // Make request to the backend
        const response = await axiosInstance.get("/users/self", {
          headers: {
            "Cache-Control": "no-cache",
          },
        });

        // Update state
        setUser(response.data.data.user);
      } catch (err) {
        console.log(err);
      }
    }

    getUser();
  }, [router.isReady]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
