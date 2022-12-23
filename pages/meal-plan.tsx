import Macros from "@components/Macros";
import styles from "@styles/MealPlan.module.css";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

export default function MealPlanPage() {
  return (
    <main className={styles.meal_plan}>
      <section>
        <h2>Select Meal Plan</h2>

        <div className={styles.search}>
          <div className={styles.icon_and_input}>
            <BiSearch />
            <input type="text" placeholder="Search" />
          </div>
          <BsFilter />
        </div>

        <div className={styles.feature_image}>
          <Image
            src="/food-placeholder.jpg"
            width={16}
            height={9}
            layout="responsive"
          />
        </div>

        <div className={styles.nutritionist_details}>
          <div className={styles.nutritionist_image}>
            <Image
              src="/profile.png"
              width={1}
              height={1}
              layout="responsive"
            />
          </div>
          <p>Nutritionist name</p>
        </div>

        <div className={styles.meal_plan_details}>
          <p className={styles.meal_plan_title}>Title of the meal plan</p>

          <span className={styles.weeks_and_recipes}>6 weeks | 50 Recipes</span>

          <span className={styles.tag}>Gluten Free</span>

          <p className={styles.description}>
            Short description of the Meal Plan goes in here.. Might be useful if
            it’s truncated to a certain number of characters?
          </p>
        </div>

        {/* <Macros text="Daily macros" calories={1850} /> */}

        <div className={styles.buttons}>
          <Link href="/meal-plan/see-details">
            <a className={styles.button}>See Details</a>
          </Link>

          <button className={styles.button}>Select</button>
        </div>
      </section>
    </main>
  );
}
