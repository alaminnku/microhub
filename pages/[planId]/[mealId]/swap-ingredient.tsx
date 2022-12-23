import { useUser } from "@context/User";
import styles from "@styles/SwapIngredient.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import { IMeal } from "types";

export default function SwapIngredientPage() {
  const router = useRouter();
  const { isUserLoading, user } = useUser();
  const [meal, setMeal] = useState<IMeal>();

  useEffect(() => {
    if (!isUserLoading && !user && router.isReady) {
      router.push("/login");
    } else if (user && router.isReady) {
      setMeal(
        user.program?.mealplan_foods
          ?.find((mealPlan) => mealPlan.id === +router.query.planId!)
          ?.meals.find((meal) => meal.id === +router.query.mealId!)
      );
    }
  }, [isUserLoading, user, router.isReady]);

  function handleSwapIngredient() {
    console.log("hello");
  }

  return (
    <main className={styles.swap_ingredient}>
      <div className={styles.top}>
        <div className={styles.header}>
          <TfiReload />
          <h2>Swap Ingredient</h2>
        </div>

        <Link href={`/${router.query.planId}/${router.query.mealId}`}>
          <a>
            <IoCloseOutline className={styles.close_icon} />
          </a>
        </Link>
      </div>

      <div className={styles.ingredient}>
        <div className={styles.ingredient_header}>
          <p>1/2 Cup Almond Milk</p>
          <span>452 Calories</span>
        </div>

        <div className={styles.ingredient_details}>
          <div className={styles.protein}>
            <p>3.8 g</p>
            <span>Protein</span>
          </div>

          <span className={styles.border}></span>

          <div className={styles.fats}>
            <p>8.8 g</p>
            <span>Fats</span>
          </div>

          <span className={styles.border}></span>

          <div className={styles.carbs}>
            <p>3.3 g</p>
            <span>Carbs</span>
          </div>
        </div>

        <div className={styles.swap_for}>
          <p className={styles.title}>Swap for</p>
          <div className={styles.swap_for_ingredient}>
            <input type="radio" name="swapForIngredient" />
            <p>Soy Milk</p>
          </div>
          <div className={styles.swap_for_ingredient}>
            <input type="radio" name="swapForIngredient" />
            <p>Oat Milk</p>
          </div>
          <div className={styles.swap_for_ingredient}>
            <input type="radio" name="swapForIngredient" />
            <p>Full Cream Milk</p>
          </div>
          <div className={styles.swap_for_ingredient}>
            <input type="radio" name="swapForIngredient" />
            <p>Coconut Milk</p>
          </div>
        </div>

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
        <Link href={`/${router.query.planId}/${router.query.mealId}`}>
          <a>Cancel</a>
        </Link>

        <button onClick={handleSwapIngredient}>Swap</button>
      </div>
    </main>
  );
}
