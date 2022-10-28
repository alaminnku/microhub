import { IContextProviderProps, IUserContext } from "types";
import { createContext, useContext } from "react";

// Create context
const UserContext = createContext({} as IUserContext);

// Create hook
export const useUser = () => useContext(UserContext);

// Provider function
export default function UserProvider({ children }: IContextProviderProps) {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
}
