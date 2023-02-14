import { createContext, useContext, useEffect, useState } from "react";
import { IContextProviderProps, IPreBuiltRecipe, IDataContext } from "types";

// Create context
const DataContext = createContext({} as IDataContext);

// Create hooks
export const useData = () => useContext(DataContext);

// Provider function
export default function DataProvider({ children }: IContextProviderProps) {
  const [preBuiltRecipes, setPreBuiltRecipes] = useState<IPreBuiltRecipe[]>([]);
  return (
    <DataContext.Provider value={{ preBuiltRecipes, setPreBuiltRecipes }}>
      {children}
    </DataContext.Provider>
  );
}
