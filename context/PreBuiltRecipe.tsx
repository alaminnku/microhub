import { createContext, useContext, useEffect, useState } from "react";
import {
  IContextProviderProps,
  IPreBuiltRecipe,
  IPreBuiltRecipeContext,
} from "types";

// Create context
const PreBuiltRecipeContext = createContext({} as IPreBuiltRecipeContext);

// Create hooks
export const usePreBuiltRecipe = () => useContext(PreBuiltRecipeContext);

// Provider function
export default function PreBuiltRecipeProvider({
  children,
}: IContextProviderProps) {
  const [preBuiltRecipes, setPreBuiltRecipes] = useState<IPreBuiltRecipe[]>([]);
  return (
    <PreBuiltRecipeContext.Provider
      value={{ preBuiltRecipes, setPreBuiltRecipes }}
    >
      {children}
    </PreBuiltRecipeContext.Provider>
  );
}
