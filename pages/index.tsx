import { IFoodItem } from "types";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import Macros from "@components/Macros";
import { axiosInstance, calculateMacro, days } from "@utils/index";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "@styles/HomePage.module.css";
import MealPlanItem from "@components/MealPlanItem";
import { MdKeyboardArrowRight } from "react-icons/md";
import MealPlanSectionHeader from "@components/MealPlanSectionHeader";

export default function HomePage() {
  const router = useRouter();
  const [currentDay, setCurrentDay] = useState(0);
  const { isUserLoading, user, setUser } = useUser();

  // Check user
  useEffect(() => {
    if (!isUserLoading && !user && router.isReady) {
      router.push("/login");
    } else if (user && !user?.consumer && router.isReady) {
      router.push("/add-details");
    }
  }, [user, isUserLoading, router.isReady]);

  // Groups foodItems by course
  const groupFoodItems = (foodItems: IFoodItem[], groupBy: string) =>
    foodItems.filter((meal) => meal.course === groupBy);

  // Go to the next day
  function nextDay(mealPlansLength: number) {
    if (currentDay < mealPlansLength - 1) {
      setCurrentDay((currState) => currState + 1);
      console.log("first");
    } else {
      setCurrentDay((currState) => currState);
      console.log("hello");
    }
  }

  // Go to the previous day
  function previousDay() {
    if (currentDay > 0) {
      setCurrentDay((currState) => currState - 1);
      console.log("first");
    } else {
      setCurrentDay((currState) => currState);
      console.log("hello");
    }
  }

  console.log(user?.program);

  return (
    <main className={styles.home_page}>
      {isUserLoading && <h2>Loading...</h2>}

      {!isUserLoading && user && !user.program && <h2>No assigned program</h2>}

      {!isUserLoading && user && user.program && (
        <>
          {/* Day shifter */}
          <section className={styles.top}>
            <div
              className={`${styles.left_arrow} ${
                currentDay === 0 && styles.disabled
              }`}
              onClick={previousDay}
            >
              <MdKeyboardArrowRight />
            </div>
            <p>{days[user.program.meals[currentDay].day]}</p>
            <div
              className={`${styles.right_arrow} ${
                user.program.meals.length - 1 === currentDay && styles.disabled
              }`}
              onClick={() => nextDay(user.program.meals.length)}
            >
              <MdKeyboardArrowRight />
            </div>
          </section>

          <Macros
            text="Total Macros"
            calories={calculateMacro(
              user?.program.meals[currentDay].food_items,
              "calories"
            )}
            carbs={calculateMacro(
              user?.program.meals[currentDay].food_items,
              "carbohydrates"
            )}
            fat={calculateMacro(
              user?.program.meals[currentDay].food_items,
              "fat"
            )}
            protein={calculateMacro(
              user?.program.meals[currentDay].food_items,
              "protein"
            )}
          />

          {/* Breakfast */}
          {groupFoodItems(
            user.program.meals[currentDay].food_items,
            "breakfast"
          ).length > 0 && (
            <section className={styles.breakfast}>
              <MealPlanSectionHeader
                course="breakfast"
                foodItems={user.program.meals[currentDay].food_items}
              />

              {groupFoodItems(
                user.program.meals[currentDay].food_items,
                "breakfast"
              ).map((foodItem, index) => (
                <MealPlanItem
                  foodItem={foodItem}
                  key={index}
                  plan={user.program.meals[currentDay].id}
                />
              ))}
            </section>
          )}

          {/* Lunch */}
          {groupFoodItems(user.program.meals[currentDay].food_items, "lunch")
            .length > 0 && (
            <section className={styles.lunch}>
              <MealPlanSectionHeader
                course="lunch"
                foodItems={user.program.meals[currentDay].food_items}
              />

              {groupFoodItems(
                user.program.meals[currentDay].food_items,
                "lunch"
              ).map((foodItem, index) => (
                <MealPlanItem
                  foodItem={foodItem}
                  key={index}
                  plan={user.program.meals[currentDay].id}
                />
              ))}
            </section>
          )}

          {/* Dinner */}
          {groupFoodItems(user.program.meals[currentDay].food_items, "dinner")
            .length > 0 && (
            <section className={styles.dinner}>
              <MealPlanSectionHeader
                course="dinner"
                foodItems={user.program.meals[currentDay].food_items}
              />

              {groupFoodItems(
                user.program.meals[currentDay].food_items,
                "dinner"
              ).map((foodItem, index) => (
                <MealPlanItem
                  foodItem={foodItem}
                  key={index}
                  plan={user.program.meals[currentDay].id}
                />
              ))}
            </section>
          )}

          {/* Snacks */}
          {groupFoodItems(user.program.meals[currentDay].food_items, "snacks")
            .length > 0 && (
            <section className={styles.snacks}>
              <MealPlanSectionHeader
                course="snacks"
                foodItems={user.program.meals[currentDay].food_items}
              />

              {groupFoodItems(
                user.program.meals[currentDay].food_items,
                "snacks"
              ).map((foodItem, index) => (
                <MealPlanItem
                  foodItem={foodItem}
                  key={index}
                  plan={user.program.meals[currentDay].id}
                />
              ))}
            </section>
          )}

          <button className={styles.add_item}>
            <AiOutlinePlus /> Add Item
          </button>
        </>
      )}
    </main>
  );
}
