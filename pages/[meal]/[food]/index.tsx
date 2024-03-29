import Link from "next/link";
import Image from "next/image";
import Macros from "@components/Macros";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IFoodItem, IIngredient } from "types";
import styles from "@styles/FoodItem.module.css";
import { HiOutlineRefresh } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

export default function FoodItemPage() {
  const router = useRouter();
  const { isUserLoading, user } = useUser();
  const [foodItem, setFoodItem] = useState<IFoodItem>();
  const [ingredient, setIngredient] = useState({
    id: 0,
    name: "",
  });
  const [ingredients, setIngredients] = useState<IIngredient[]>();

  useEffect(() => {
    if (!isUserLoading && !user && router.isReady) {
      router.push("/login");
    } else if (user && router.isReady) {
      // Get food item
      const foodItem = user.program.meals
        .find((meal) => meal.id === +router.query.meal!)
        ?.food_items.find((foodItem) => foodItem.id === +router.query.food!);

      if (foodItem) {
        // Swapped and static ingredients
        const swappedIngredients = foodItem.swapers;
        const originalIngredients = foodItem.recipe.ingredients;

        // Update states
        setFoodItem(foodItem);
        setIngredients(
          swappedIngredients?.length > 0
            ? [
                ...originalIngredients.filter((ingredient) =>
                  swappedIngredients.some(
                    (swapper) => swapper.ingredientId !== ingredient.id
                  )
                ),
                // Return the ingredients of swapped items
                ...swappedIngredients.map((swappedIngredient) =>
                  JSON.parse(swappedIngredient.ingredientInfo)
                ),
              ]
            : originalIngredients
        );
      }
    }
  }, [isUserLoading, user, router.isReady]);

  return (
    <main>
      {isUserLoading && <h2>Loading...</h2>}

      {user && foodItem && (
        <>
          <section className={styles.top}>
            <Image
              src="/food-placeholder.jpg"
              width={1}
              height={1}
              layout="responsive"
            />

            <Link href="/">
              <a className={styles.back_button}>
                <IoCloseOutline />
              </a>
            </Link>
          </section>

          <section className={styles.content}>
            <div className={styles.header}>
              <p>{foodItem.title}</p>
              <span>10 mins prep. 0 mins cook</span>
            </div>

            <Macros
              text="Macros"
              calories={foodItem.recipe.calories}
              carbs={foodItem.recipe.carbohydrates}
              fat={foodItem.recipe.fat}
              protein={foodItem.recipe.protein}
            />

            <div className={styles.ingredients_top}>
              <p>Ingredients</p>
              <p>{foodItem.serving} Servings</p>
            </div>

            {ingredients && ingredients.length > 0 && (
              <div className={styles.ingredients}>
                {ingredients?.map((ing) => (
                  <p
                    key={ing.id}
                    onClick={(e) => {
                      setIngredient({
                        id: ing.id,
                        name: e.currentTarget.textContent as string,
                      });
                    }}
                  >
                    {ing.name}{" "}
                    {ing.id === ingredient.id && <HiOutlineRefresh />}
                  </p>
                ))}
              </div>
            )}

            <div className={styles.preparation}>
              <p>Method</p>
              <p>{foodItem.recipe.method}</p>
            </div>

            <Link
              href={`/${router.query.meal}/${router.query.food}/swap/${ingredient.id}`}
            >
              <a className={styles.button}>Change Item</a>
            </Link>
          </section>
        </>
      )}
    </main>
  );
}
