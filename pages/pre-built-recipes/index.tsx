import Link from "next/link";
import Image from "next/image";
import Search from "@components/Search";
import { FormEvent, useState } from "react";
import { axiosInstance } from "@utils/index";
import styles from "@styles/PreBuiltRecipes.module.css";

import { usePreBuiltRecipe } from "@context/PreBuiltRecipe";

export default function PreBuiltRecipesPage() {
  const [search, setSearch] = useState("");
  const { preBuiltRecipes, setPreBuiltRecipes } = usePreBuiltRecipe();
  const [recipe, setRecipe] = useState({
    name: "",
    fat: 0,
    protein: 0,
    calories: 0,
    imageURL: "",
    ingredients: [],
    carbohydrates: 0,
    fatPercentage: 0,
    proteinPercentage: 0,
    carbohydratesPercentage: 0,
    method: "this test cook method for this recipe",
  });
  const [isLoading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  async function searchRecipes(e: FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `/recipes/search?search=${search}&number=10`
      );

      setPreBuiltRecipes(response.data.data.results);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // function handleClick(index: number) {
  //   const selectedRecipe = recipes[index]?.nutrition.ingredients;

  //   setIngredients(selectedRecipe);

  //   const processedRecipe = selectedRecipe.map((recipe) => {
  //     let obj = {
  //       fat: 0,
  //       cals: 0,
  //       unit: 0,
  //       name: "",
  //       carbs: 0,
  //       amount: 0,
  //       image: "",
  //       protein: 0,
  //       spoon_id: 0,
  //       fatPercentage: 0,
  //       carbsPercentage: 0,
  //       proteinPercentage: 0,
  //     };

  //     obj.spoon_id = recipe.id;
  //     obj.name = recipe.name;
  //     obj.amount = recipe.amount;
  //     obj.unit = recipe.unit || "not found";
  //     obj.image = recipe.image || "image.jpg";
  //     obj.fat = recipe.nutrients.find((item) => item.name == "Fat").amount;
  //     obj.protein = recipe.nutrients.find(
  //       (item) => item.name == "Protein"
  //     ).amount;
  //     obj.carbs = recipe.nutrients.find(
  //       (item) => item.name == "Carbohydrates"
  //     ).amount;
  //     obj.cals = recipe.nutrients.find(
  //       (item) => item.name == "Calories"
  //     ).amount;
  //     obj.proteinPercentage = recipe.nutrients.find(
  //       (item) => item.name == "Protein"
  //     ).percentOfDailyNeeds;
  //     obj.fatPercentage = recipe.nutrients.find(
  //       (item) => item.name == "Fat"
  //     ).percentOfDailyNeeds;
  //     obj.carbsPercentage = recipe.nutrients.find(
  //       (item) => item.name == "Carbohydrates"
  //     ).percentOfDailyNeeds;

  //     return obj;
  //   });

  //   const fatTotal = processedRecipe.reduce((acc, curr) => acc + curr.fat, 0);

  //   const proteinTotal = processedRecipe.reduce(
  //     (acc, curr) => acc + curr.protein,
  //     0
  //   );
  //   const calsTotal = processedRecipe.reduce((acc, curr) => acc + curr.cals, 0);
  //   const carbsTotal = processedRecipe.reduce(
  //     (acc, curr) => acc + curr.carbs,
  //     0
  //   );
  //   const proteinPercentageTotal = processedRecipe.reduce(
  //     (acc, curr) => acc + curr.proteinPercentage,
  //     0
  //   );
  //   const fatPercentageTotal = processedRecipe.reduce(
  //     (acc, curr) => acc + curr.fatPercentage,
  //     0
  //   );
  //   const carbsPercentageTotal = processedRecipe.reduce(
  //     (acc, curr) => acc + curr.carbsPercentage,
  //     0
  //   );

  //   setRecipe({
  //     ...recipe,
  //     fat: fatTotal,
  //     calories: calsTotal,
  //     protein: proteinTotal,
  //     carbohydrates: carbsTotal,
  //     ingredients: processedRecipe,
  //     fatPercentage: fatPercentageTotal,
  //     proteinPercentage: proteinPercentageTotal,
  //     carbohydratesPercentage: carbsPercentageTotal,
  //   });
  // }

  async function saveRecipe() {
    if (recipe.name.trim() != "") {
      try {
        const response = await axiosInstance.post("/recipes", recipe);

        // Show alert that recipe created successfully
      } catch (err) {
        // Show alert
      }
    } else {
      // Show alert that recipe created successfully
      alert("Recipe must contain a name");
    }
  }

  return (
    <main className={styles.pre_built_recipes}>
      <div className={styles.search}>
        <h2>Search recipes</h2>
        <Search handleSearch={searchRecipes} />
      </div>

      {preBuiltRecipes.length > 0 && (
        <div className={styles.recipes}>
          {preBuiltRecipes.map((preBuiltRecipe) => (
            <Link
              key={preBuiltRecipe.id}
              href={`/pre-built-recipes/${preBuiltRecipe.id}`}
            >
              <a className={styles.recipe}>
                <div className={styles.recipe_image}>
                  <Image
                    width={1}
                    height={1}
                    objectFit="cover"
                    layout="responsive"
                    src={preBuiltRecipe.image}
                  />
                </div>
                <p>{preBuiltRecipe.title}</p>
              </a>
            </Link>
          ))}
        </div>
      )}

      {/* <div>
        <Image src={data.image} width={50} height={50} layout="fixed" />
      </div>
      <span className="ms-2">{data.title}</span>

      <thead>
        <tr>
          <th>Ingredient</th>
          <th>Weight</th>
          <th>Fat</th>
          <th>Protein</th>
          <th>Calories</th>
          <th>Carbs</th>
          <th>Protein(%)</th>
          <th>Fat(%)</th>
          <th>Carbs(%)</th>
        </tr>
      </thead>
      <tbody>
        {ingredients.map((recipe, index) => (
          <tr key={index}>
            <td>{recipe.name}</td>
            <td>{recipe.amount}</td>
            <td>
              {recipe.nutrients.find((item) => item.name == "Fat").amount}
            </td>
            <td>
              {recipe.nutrients.find((item) => item.name == "Protein").amount}
            </td>
            <td>
              {recipe.nutrients.find((item) => item.name == "Calories").amount}
            </td>
            <td>
              {
                recipe.nutrients.find((item) => item.name == "Carbohydrates")
                  .amount
              }
            </td>
            <td>
              {
                recipe.nutrients.find((item) => item.name == "Protein")
                  .percentOfDailyNeeds
              }
            </td>
            <td>
              {
                recipe.nutrients.find((item) => item.name == "Fat")
                  .percentOfDailyNeeds
              }
            </td>
            <td>
              {
                recipe.nutrients.find((item) => item.name == "Carbohydrates")
                  .percentOfDailyNeeds
              }
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2} className="text-start ps-3">
            Total
          </td>
          <td>{recipe.fat.toFixed(2)}</td>
          <td>{recipe.protein.toFixed(2)}</td>
          <td>{recipe.calories.toFixed(2)}</td>
          <td>{recipe.carbohydrates.toFixed(2)}</td>
          <td>{recipe.proteinPercentage.toFixed(2)}</td>
          <td>{recipe.fatPercentage.toFixed(2)}</td>
          <td>{recipe.carbohydratesPercentage.toFixed(2)}</td>
          <td> </td>
        </tr>
      </tfoot> */}
    </main>
  );
}
