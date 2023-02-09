import Link from "next/link";
import { IFoodItem } from "types";
import Image from "next/image";
import Macros from "@components/Macros";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@styles/Meal.module.css";
import { HiOutlineRefresh } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

export default function MealPage() {
  const router = useRouter();
  const { isUserLoading, user } = useUser();
  const [meal, setMeal] = useState<IFoodItem>();
  const [ingredient, setIngredient] = useState({
    index: 0,
    name: "",
  });

  useEffect(() => {
    if (!isUserLoading && !user && router.isReady) {
      router.push("/login");
    } else if (user && router.isReady) {
      setMeal(
        user.program?.meals
          ?.find((meal) => meal.id === +router.query.meal!)
          ?.food_items.find((foodItem) => foodItem.id === +router.query.food!)
      );
    }
  }, [isUserLoading, user, router.isReady]);

  const ingredients = [
    "20g Chia seeds",
    "1/2 Cup Almost Milk",
    "50g Fresh Mango",
    "3 tbs Low Fat Greek Yoghurt",
  ];

  console.log(meal);

  return (
    <main>
      {isUserLoading && <h2>Loading...</h2>}

      {user && meal && (
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
              <p>{meal.title}</p>
              <span>10 mins prep. 0 mins cook</span>
            </div>

            <Macros
              text="Macros"
              calories={meal.cals}
              carbs={meal.carbs}
              fat={meal.fat}
              protein={meal.protein}
            />

            <div className={styles.ingredients_top}>
              <p>Ingredients</p>
              <p>
                {meal.quantity} {meal.quantity > 1 ? "Servings" : "Serving"}
              </p>
            </div>

            {ingredients.length > 0 && (
              <div className={styles.ingredients}>
                {ingredients.map((ingredientName, index) => (
                  <p
                    key={index}
                    onClick={(e) => {
                      setIngredient({
                        index,
                        name: e.currentTarget.textContent as string,
                      });
                    }}
                  >
                    {ingredientName}{" "}
                    {index === ingredient.index && <HiOutlineRefresh />}
                  </p>
                ))}
              </div>
            )}

            <div className={styles.preparation}>
              <p>Prep</p>
              <p>
                Combine Chia Seeds with your choice of milk in a bowl. Put in
                the fridge overnight. Top with fresh fruit and a dollop of
                yoghurt.
              </p>
            </div>

            <Link
              href={`/${router.query.meal}/${
                router.query.food
              }/swap/${ingredient.name.toLowerCase().split(" ").join("-")}`}
            >
              <a className={styles.button}>Change Item</a>
            </Link>
          </section>
        </>
      )}
    </main>
  );
}
