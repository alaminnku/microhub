import { usePreBuiltRecipe } from "@context/PreBuiltRecipe";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IPreBuiltRecipeIngredient } from "types";

export default function PreBuiltRecipePage() {
  // Hooks
  const router = useRouter();
  const { preBuiltRecipes } = usePreBuiltRecipe();
  const [ingredients, setIngredients] = useState<IPreBuiltRecipeIngredient[]>(
    []
  );

  // Get pre-built recipe ingredients
  useEffect(() => {
    if (preBuiltRecipes.length > 0 && router.isReady) {
      // Find the recipe
      const recipe = preBuiltRecipes.find(
        (preBuiltRecipe) => preBuiltRecipe.id === +router.query.recipe!
      );

      if (recipe) {
        setIngredients(
          recipe.nutrition.ingredients.map((ingredient) => ({
            id: ingredient.id,
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
            fat: ingredient.nutrients.find(
              (nutrient) => nutrient.name === "Fat"
            )!.amount,
            cals: ingredient.nutrients.find(
              (nutrient) => nutrient.name === "Calories"
            )!.amount,
            carbs: ingredient.nutrients.find(
              (nutrient) => nutrient.name === "Carbohydrates"
            )!.amount,
            protein: ingredient.nutrients.find(
              (nutrient) => nutrient.name === "Protein"
            )!.amount,
            fatPercentage: ingredient.nutrients.find(
              (nutrient) => nutrient.name === "Fat"
            )!.percentOfDailyNeeds,
            carbsPercentage: ingredient.nutrients.find(
              (nutrient) => nutrient.name === "Carbohydrates"
            )!.percentOfDailyNeeds,
            proteinPercentage: ingredient.nutrients.find(
              (nutrient) => nutrient.name === "Protein"
            )!.percentOfDailyNeeds,
          }))
        );
      }
    }
  }, [preBuiltRecipes, router.isReady]);

  console.log(ingredients);

  return <main>Pre built recipe</main>;
}
