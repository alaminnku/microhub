import { useUser } from "@context/User";
import styles from "@styles/HomePage.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { IMeal, IUser } from "types";
import Macros from "@components/Macros";
import { axiosInstance } from "@utils/index";
import MealPlanItem from "@components/MealPlanItem";
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

  // Handle nutritionist invitation
  async function handleInvite(status: number) {
    // Push to the questionnaire page if the
    // client hasn't submitted the questionnaire yet
    if (!user?.questionnaire) {
      router.push("/questionnaire");
    } else {
      // Accept or reject invitation only when
      // the client has submitted the questionnaire
      try {
        await axiosInstance.post("/consumers/trainer/accept", {
          status,
          nutritionistId: user.requested_nutritionists[0].id,
        });

        // Update user
        setUser((currState) => {
          if (currState) {
            // Destructure user data
            const { requested_nutritionists, ...rest } = currState;

            // Return all but requested nutritionist
            return rest as IUser;
          } else {
            return null;
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

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

      {!isUserLoading && user && (
        <>
          {/* Invitation popup */}
          {user?.requested_nutritionists?.length > 0 && (
            <div className={styles.invitation}>
              <p>
                You've got an invite from{" "}
                {user.requested_nutritionists[0].first_name}{" "}
                {user.requested_nutritionists[0].last_name}
              </p>
              <div className={styles.buttons}>
                <button onClick={() => handleInvite(1)}>Confirm</button>
                <button onClick={() => handleInvite(-1)}>Reject</button>
              </div>
            </div>
          )}

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
