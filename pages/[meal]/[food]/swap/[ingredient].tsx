import Link from "next/link";
import { AxiosError } from "axios";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import Search from "@components/Search";
import { useAlert } from "@context/Alert";
import { TfiReload } from "react-icons/tfi";
import { IoCloseOutline } from "react-icons/io5";
import styles from "@styles/Ingredient.module.css";
import { FormEvent, useEffect, useState } from "react";
import { axiosInstance, showErrorAlert } from "@utils/index";
import { IAxiosError, IIngredient, ISwapAbleIngredient } from "types";

export default function SwapIngredientPage() {
  const router = useRouter();
  const { setAlerts } = useAlert();
  const { isUserLoading, user } = useUser();
  const [gap, setGap] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [ingredient, setIngredient] = useState<IIngredient>();
  const [swapAbleIngredient, setSwapAbleIngredient] =
    useState<ISwapAbleIngredient>();
  const [swapAbleIngredients, setSwapAbleIngredients] = useState<
    ISwapAbleIngredient[]
  >([]);

  // Get the ingredient
  useEffect(() => {
    if (!isUserLoading && !user && router.isReady) {
      router.push("/login");
    } else if (user && router.isReady) {
      setIngredient(
        user.program.meals
          .find((mealPlan) => mealPlan.id === +router.query.meal!)
          ?.food_items.find((foodItem) => foodItem.id === +router.query.food!)
          ?.recipe.ingredients.find(
            (ingredient) => ingredient.id === +router.query.ingredient!
          )
      );
    }
  }, [isUserLoading, user, router.isReady]);

  // Handle search
  async function searchSwapAbleIngredients(e: FormEvent, searchValue: string) {
    e.preventDefault();

    try {
      setIsSearching(true);

      // Make request to the backend
      const response = await axiosInstance.get(
        `/programs/swaps?ingredient_id=${ingredient?.id}&gap=${
          gap ? +gap / 100 : 0.2
        }&swap_ingredient=${searchValue}`
      );

      if (response.data.data.data.length === 0) {
        // Show alert
        showErrorAlert("No swap able ingredients found", setAlerts);
      } else {
        // Update state
        setSwapAbleIngredients(response.data.data.data);
      }
    } catch (err) {
      // Show alert
      showErrorAlert(err as AxiosError<IAxiosError>, setAlerts);
    } finally {
      setIsSearching(false);
    }
  }

  // Handle swap ingredient
  async function handleSwapIngredient() {
    try {
      const response = await axiosInstance.post("/programs/swaps", {
        foodItemId: router.query.food,
        ingredientId: ingredient?.id,
        swapIngredientId: swapAbleIngredient?.id,
      });

      console.log(response);

      // console.log(JSON.parse(response.data.data.swap.ingredientInfo));
    } catch (err) {
      console.log(err);
    }
  }

  console.log(swapAbleIngredient, ingredient);

  return (
    <main className={styles.swap_ingredient}>
      {!ingredient && <h2>No ingredient found</h2>}

      {ingredient && (
        <section>
          <div className={styles.top}>
            <div className={styles.header}>
              <TfiReload />
              <h2>Swap Ingredient</h2>
            </div>

            <Link href={`/${router.query.meal}/${router.query.food}`}>
              <a>
                <IoCloseOutline className={styles.close_icon} />
              </a>
            </Link>
          </div>

          <div className={styles.ingredient}>
            <div className={styles.ingredient_header}>
              <p>{ingredient.name}</p>
              <span>{ingredient.cals} Calories</span>
            </div>

            <div className={styles.ingredient_details}>
              <div className={styles.protein}>
                <p>{ingredient.protein} g</p>
                <span>Protein</span>
              </div>

              <span className={styles.border}></span>

              <div className={styles.fats}>
                <p>{ingredient.fat} g</p>
                <span>Fats</span>
              </div>

              <span className={styles.border}></span>

              <div className={styles.carbs}>
                <p>{ingredient.carbs} g</p>
                <span>Carbs</span>
              </div>
            </div>

            <div className={styles.gap}>
              <label htmlFor="gap">Select macro gap</label>
              <input
                id="gap"
                type="number"
                value={gap}
                placeholder="E.g 20"
                onChange={(e) => setGap(e.target.value)}
              />
            </div>

            <div className={styles.search}>
              <label>Search ingredients</label>
              <Search
                isSearching={isSearching}
                handleSearch={searchSwapAbleIngredients}
              />
            </div>

            {swapAbleIngredients.length > 0 && (
              <div className={styles.swap_for}>
                <p>Swap for</p>

                {swapAbleIngredients.map((swapAbleIngredient) => (
                  <div
                    key={swapAbleIngredient.id}
                    className={styles.swap_for_ingredient}
                  >
                    <input
                      type="radio"
                      name="swapAbleIngredient"
                      onChange={() => setSwapAbleIngredient(swapAbleIngredient)}
                    />
                    <label>{swapAbleIngredient.name}</label>
                  </div>
                ))}
              </div>
            )}

            {swapAbleIngredient && (
              <div className={styles.ingredient_details}>
                <div className={styles.protein}>
                  <p>
                    {/* {swapAbleIngredient.nutrition.caloricBreakdown.percentFat} */}
                    0 g
                  </p>
                  <span>Protein</span>
                </div>
                <span className={styles.border}></span>
                <div className={styles.fats}>
                  <p>
                    {/* {
                      swapAbleIngredient.nutrition.caloricBreakdown
                        .percentProtein
                    } */}
                    0 g
                  </p>
                  <span>Fats</span>
                </div>
                <span className={styles.border}></span>
                <div className={styles.carbs}>
                  <p>
                    {/* {swapAbleIngredient.nutrition.caloricBreakdown.percentCarbs} */}
                    0 g
                  </p>
                  <span>Carbs</span>
                </div>
              </div>
            )}
          </div>

          <div className={styles.buttons}>
            <Link href={`/${router.query.plan}/${router.query.meal}`}>
              <a>Cancel</a>
            </Link>

            <button
              onClick={handleSwapIngredient}
              disabled={!swapAbleIngredient}
            >
              Swap
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
