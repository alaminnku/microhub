import { IMeal, IUser } from "types";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import Macros from "@components/Macros";
import { axiosInstance } from "@utils/index";
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

  // Groups meals by course
  const groupMeals = (meals: IMeal[], groupBy: string) =>
    meals.filter((meal) => meal.course === groupBy);

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

  // Calculate macro
  const calculateMacro = (meals: IMeal[], unit: string) =>
    meals.reduce((acc, curr) => acc + curr[unit as keyof object], 0);

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
            <p>{user.program.mealplan_foods[currentDay].day}</p>
            <div
              className={`${styles.right_arrow} ${
                user.program.mealplan_foods.length - 1 === currentDay &&
                styles.disabled
              }`}
              onClick={() => nextDay(user.program.mealplan_foods.length)}
            >
              <MdKeyboardArrowRight />
            </div>
          </section>

          <Macros
            text="Total Macros"
            calories={calculateMacro(
              user?.program.mealplan_foods[currentDay].meals,
              "cals"
            )}
            carbs={calculateMacro(
              user?.program.mealplan_foods[currentDay].meals,
              "carbs"
            )}
            fat={calculateMacro(
              user?.program.mealplan_foods[currentDay].meals,
              "fats"
            )}
            protein={calculateMacro(
              user?.program.mealplan_foods[currentDay].meals,
              "protein"
            )}
          />

          {/* Breakfast */}
          {groupMeals(
            user.program.mealplan_foods[currentDay].meals,
            "breakfast"
          ).length > 0 && (
            <section className={styles.breakfast}>
              <MealPlanSectionHeader
                course="breakfast"
                meals={user.program.mealplan_foods[currentDay].meals}
              />

              {groupMeals(
                user.program.mealplan_foods[currentDay].meals,
                "breakfast"
              ).map((meal, index) => (
                <MealPlanItem
                  meal={meal}
                  key={index}
                  plan={user.program.mealplan_foods[currentDay].id}
                />
              ))}
            </section>
          )}

          {/* Lunch */}
          {groupMeals(user.program.mealplan_foods[currentDay].meals, "lunch")
            .length > 0 && (
            <section className={styles.lunch}>
              <MealPlanSectionHeader
                course="lunch"
                meals={user.program.mealplan_foods[currentDay].meals}
              />

              {groupMeals(
                user.program.mealplan_foods[currentDay].meals,
                "lunch"
              ).map((meal, index) => (
                <MealPlanItem
                  meal={meal}
                  key={index}
                  plan={user.program.mealplan_foods[currentDay].id}
                />
              ))}
            </section>
          )}

          {/* Dinner */}
          {groupMeals(user.program.mealplan_foods[currentDay].meals, "dinner")
            .length > 0 && (
            <section className={styles.dinner}>
              <MealPlanSectionHeader
                course="dinner"
                meals={user.program.mealplan_foods[currentDay].meals}
              />

              {groupMeals(
                user.program.mealplan_foods[currentDay].meals,
                "dinner"
              ).map((meal, index) => (
                <MealPlanItem
                  meal={meal}
                  key={index}
                  plan={user.program.mealplan_foods[currentDay].id}
                />
              ))}
            </section>
          )}

          {/* Snacks */}
          {groupMeals(user.program.mealplan_foods[currentDay].meals, "snacks")
            .length > 0 && (
            <section className={styles.snacks}>
              <MealPlanSectionHeader
                course="snacks"
                meals={user.program.mealplan_foods[currentDay].meals}
              />

              {groupMeals(
                user.program.mealplan_foods[currentDay].meals,
                "snacks"
              ).map((meal, index) => (
                <MealPlanItem
                  meal={meal}
                  key={index}
                  plan={user.program.mealplan_foods[currentDay].id}
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
