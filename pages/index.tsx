import { useUser } from "@context/User";
import styles from "@styles/HomePage.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { TfiReload } from "react-icons/tfi";
import Image from "next/image";
import Link from "next/link";
import { IMeal, IUser } from "types";
import Macros from "@components/Macros";
import { axiosInstance } from "@utils/index";

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
        const response = await axiosInstance.post("/consumers/trainer/accept", {
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

  // console.log(user?.program.mealplan_foods.length);

  // Groups meals by course
  const groupMeals = (meals: IMeal[], groupBy: string) =>
    meals.filter((meal) => meal.course === groupBy);

  // Calculate total calories of each group
  const groupTotalCalories = (meals: IMeal[], groupBy: string) =>
    meals
      .filter((meal) => meal.course === groupBy)
      .reduce((acc, curr) => acc + curr.cals, 0);

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

      {!isUserLoading && user && (
        <>
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
            calories={user.program.mealplan_foods[currentDay].meals.reduce(
              (acc, curr) => acc + curr.cals,
              0
            )}
          />

          {/* Breakfast */}
          {groupMeals(
            user.program.mealplan_foods[currentDay].meals,
            "breakfast"
          ).map((meal, index) => (
            <section className={styles.breakfast} key={index}>
              <div className={styles.header}>
                <div>
                  <p>Breakfast</p>
                  <span>
                    {groupTotalCalories(
                      user.program.mealplan_foods[currentDay].meals,
                      "breakfast"
                    )}{" "}
                    Calories
                  </span>
                </div>
                <TfiReload />
              </div>

              <div className={styles.item}>
                <input type="checkbox" />
                <Link href="/menu-item">
                  <a>
                    <div className={styles.image}>
                      <Image
                        src="/food-placeholder.jpg"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                    <p>{meal.title}</p>
                  </a>
                </Link>
              </div>
            </section>
          ))}

          {/* Lunch */}
          {groupMeals(
            user.program.mealplan_foods[currentDay].meals,
            "lunch"
          ).map((meal, index) => (
            <section className={styles.lunch} key={index}>
              <div className={styles.header}>
                <div>
                  <p>Lunch</p>
                  <span>
                    {groupTotalCalories(
                      user.program.mealplan_foods[currentDay].meals,
                      "lunch"
                    )}{" "}
                    Calories
                  </span>
                </div>
                <TfiReload />
              </div>

              <div className={styles.item}>
                <input type="checkbox" />
                <Link href="/menu-item">
                  <a>
                    <div className={styles.image}>
                      <Image
                        src="/food-placeholder.jpg"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                    <p>{meal.title}</p>
                  </a>
                </Link>
              </div>
            </section>
          ))}

          {/* Dinner */}
          {groupMeals(
            user.program.mealplan_foods[currentDay].meals,
            "dinner"
          ).map((meal, index) => (
            <section className={styles.dinner} key={index}>
              <div className={styles.header}>
                <div>
                  <p>Dinner</p>
                  <span>
                    {groupTotalCalories(
                      user.program.mealplan_foods[currentDay].meals,
                      "dinner"
                    )}{" "}
                    Calories
                  </span>
                </div>
                <TfiReload />
              </div>

              <div className={styles.item}>
                <input type="checkbox" />
                <Link href="/menu-item">
                  <a>
                    <div className={styles.image}>
                      <Image
                        src="/food-placeholder.jpg"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                    <p>{meal.title}</p>
                  </a>
                </Link>
              </div>
            </section>
          ))}

          {/* Snacks */}
          {groupMeals(
            user.program.mealplan_foods[currentDay].meals,
            "snacks"
          ).map((meal, index) => (
            <section className={styles.snacks} key={index}>
              <div className={styles.header}>
                <div>
                  <p>Snacks</p>
                  <span>
                    {groupTotalCalories(
                      user.program.mealplan_foods[currentDay].meals,
                      "snacks"
                    )}{" "}
                    Calories
                  </span>
                </div>
                <TfiReload />
              </div>

              <div className={styles.item}>
                <input type="checkbox" />
                <Link href="/menu-item">
                  <a>
                    <div className={styles.image}>
                      <Image
                        src="/food-placeholder.jpg"
                        width={1}
                        height={1}
                        layout="responsive"
                      />
                    </div>
                    <p>{meal.title}</p>
                  </a>
                </Link>
              </div>
            </section>
          ))}

          <button className={styles.add_item}>
            <AiOutlinePlus /> Add Item
          </button>
        </>
      )}
    </main>
  );
}
