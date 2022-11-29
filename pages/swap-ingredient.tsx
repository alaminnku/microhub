import styles from "@styles/SwapIngredient.module.css";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";

export default function SwapIngredientPage() {
  return (
    <main className={styles.swap_ingredient}>
      <div className={styles.top}>
        <div className={styles.header}>
          <TfiReload />
          <p>Swap Ingredient</p>
        </div>

        <Link href="/menu-item">
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
            <input type="radio" />
            <p>Soy Milk</p>
          </div>
          <div className={styles.swap_for_ingredient}>
            <input type="radio" />
            <p>Oat Milk</p>
          </div>
          <div className={styles.swap_for_ingredient}>
            <input type="radio" />
            <p>Full Cream Milk</p>
          </div>
          <div className={styles.swap_for_ingredient}>
            <input type="radio" />
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
        <Link href="/menu-item">
          <a>Cancel</a>
        </Link>

        <Link href="/menu-item">
          <a>Swap</a>
        </Link>
      </div>
    </main>
  );
}
