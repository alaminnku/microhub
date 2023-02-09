import Link from "next/link";
import { IIngredient, ISwapAbleIngredient } from "types";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import Search from "@components/Search";
import { TfiReload } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import styles from "@styles/Ingredient.module.css";

export default function SwapIngredientPage() {
  const router = useRouter();
  const [gap, setGap] = useState<number>();
  const { isUserLoading, user } = useUser();
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
        user.program?.meals
          ?.find((mealPlan) => mealPlan.id === +router.query.meal!)
          ?.food_items.find((foodItem) => foodItem.id === +router.query.food!)
          ?.recipe.ingredients.find(
            (ingredient) => ingredient.id === +router.query.ingredient!
          )
      );
    }
  }, [isUserLoading, user, router.isReady]);

  function handleSwapIngredient() {
    console.log("hello");
  }

  console.log(swapAbleIngredient);

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
                onChange={(e) => setGap(+e.target.value)}
              />
            </div>

            <div className={styles.search}>
              <label>Search ingredients</label>
              <Search
                path={`programs/swaps?ingredient_id=${ingredient.id}&gap=${
                  gap ? gap / 100 : 0.2
                }&swap_ingredient=`}
                setResults={setSwapAbleIngredients}
              />
            </div>

            {swapAbleIngredients.length > 0 && (
              <div className={styles.swap_for}>
                <p>Swap for</p>

                {swapAbleIngredients.map((swapAbleIngredient) => (
                  <div className={styles.swap_for_ingredient}>
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

            <div className={styles.ingredient_details}>
              <div className={styles.protein}>
                <p>0 g</p>
                <span>Protein</span>
              </div>
              <span className={styles.border}></span>
              <div className={styles.fats}>
                <p>0 g</p>
                <span>Fats</span>
              </div>
              <span className={styles.border}></span>
              <div className={styles.carbs}>
                <p>0 g</p>
                <span>Carbs</span>
              </div>
            </div>
          </div>

          <div className={styles.buttons}>
            <Link href={`/${router.query.plan}/${router.query.meal}`}>
              <a>Cancel</a>
            </Link>

            <button onClick={handleSwapIngredient}>Swap</button>
          </div>
        </section>
      )}
    </main>
  );
}
