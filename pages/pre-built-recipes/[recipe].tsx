import { useRouter } from "next/router";
import { useData } from "@context/Data";
import { useEffect, useState } from "react";
import { axiosInstance } from "@utils/index";
import styles from "@styles/PreBuiltRecipe.module.css";
import { INutrient, IPreBuiltRecipe, IPreBuiltRecipeIngredient } from "types";

export default function PreBuiltRecipePage() {
  // Hooks
  const router = useRouter();
  const { preBuiltRecipes } = useData();
  const [preBuiltRecipe, setPreBuiltRecipe] = useState<IPreBuiltRecipe>();
  const [ingredients, setIngredients] = useState<IPreBuiltRecipeIngredient[]>(
    []
  );
  const [saveAbleRecipeName, setSaveAbleRecipeName] = useState<string>("");

  // Get pre-built recipe ingredients
  useEffect(() => {
    if (preBuiltRecipes.length > 0 && router.isReady) {
      // Find the recipe
      const recipe = preBuiltRecipes.find(
        (preBuiltRecipe) => preBuiltRecipe.id === +router.query.recipe!
      );

      // Find unit
      const findUnit = (nutrients: INutrient[], unit: string) =>
        nutrients.find((nutrient) => nutrient.name === unit);

      // Update states
      if (recipe) {
        setPreBuiltRecipe(recipe);
        setIngredients(
          recipe.nutrition.ingredients.map((ingredient) => ({
            spoon_id: ingredient.id,
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
            image: "",
            fat: findUnit(ingredient.nutrients, "Fat")!.amount,
            cals: findUnit(ingredient.nutrients, "Calories")!.amount,
            carbs: findUnit(ingredient.nutrients, "Carbohydrates")!.amount,
            protein: findUnit(ingredient.nutrients, "Protein")!.amount,
            fatPercentage: findUnit(ingredient.nutrients, "Fat")!
              .percentOfDailyNeeds,
            carbsPercentage: findUnit(ingredient.nutrients, "Carbohydrates")!
              .percentOfDailyNeeds,
            proteinPercentage: findUnit(ingredient.nutrients, "Protein")!
              .percentOfDailyNeeds,
          }))
        );
      }
    } else {
      router.push("/pre-built-recipes");
    }
  }, [preBuiltRecipes, router.isReady]);

  // Save recipe
  async function saveRecipe() {
    // Calculate total
    const calculateTotal = (
      ingredients: IPreBuiltRecipeIngredient[],
      unit: string
    ) => ingredients.reduce((acc, curr) => acc + curr[unit as keyof object], 0);

    // Create saveable recipe
    const saveAbleRecipe = {
      image: "",
      ingredients,
      name: saveAbleRecipeName,
      method: "This is a test method",
      fat: calculateTotal(ingredients, "fat"),
      protein: calculateTotal(ingredients, "protein"),
      calories: calculateTotal(ingredients, "cals"),
      carbohydrates: calculateTotal(ingredients, "carbs"),
      fatPercentage: calculateTotal(ingredients, "fatPercentage"),
      proteinPercentage: calculateTotal(ingredients, "proteinPercentage"),
      carbohydratesPercentage: calculateTotal(ingredients, "carbsPercentage"),
    };

    // Make request to the backend
    try {
      const response = await axiosInstance.post(
        "/consumers/programs",
        saveAbleRecipe
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className={styles.pre_built_recipe}>
      {preBuiltRecipe && (
        <section>
          <h2>{preBuiltRecipe.title}</h2>

          <div className={styles.save_recipe}>
            <input
              type="text"
              placeholder="Enter recipe name"
              value={saveAbleRecipeName}
              onChange={(e) => setSaveAbleRecipeName(e.target.value)}
            />
            <button onClick={saveRecipe} disabled={!saveAbleRecipeName}>
              Save
            </button>
          </div>

          <div className={styles.table}>
            {ingredients.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Ingredient</th>
                    <th>Amount</th>
                    <th>Fat</th>
                    <th>Protein</th>
                    <th>Calories</th>
                    <th>Carbs</th>
                    <th>Fat(%)</th>
                    <th>Carbs(%)</th>
                    <th>Protein(%)</th>
                  </tr>
                </thead>

                <tbody>
                  {ingredients.map((ingredient, index) => (
                    <tr key={index}>
                      <td>{ingredient.name}</td>
                      <td>{ingredient.amount}</td>
                      <td>{ingredient.fat}</td>
                      <td>{ingredient.protein}</td>
                      <td>{ingredient.cals}</td>
                      <td>{ingredient.carbs}</td>
                      <td>{ingredient.fatPercentage}</td>
                      <td>{ingredient.carbsPercentage}</td>
                      <td>{ingredient.proteinPercentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
