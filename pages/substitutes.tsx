import styles from "@styles/Substitutes.module.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function SubstitutesPage() {
  return (
    <main className={styles.substitutes}>
      <h2>Substitutes</h2>

      <div className={styles.substitute}>
        <p>
          <span className={`${styles.circle} ${styles.carbs}`}></span>{" "}
          Carbohydrate options
        </p>

        <AiOutlineMinus />
      </div>

      <div className={styles.details}>
        <p>Enter the amount of carbs in grams or calories</p>

        <div className={styles.inputs}>
          <div className={styles.input}>
            <input type="number" value="25" />
            <span>g</span>
          </div>

          <div className={styles.slash}>/</div>

          <div className={styles.input}>
            <input type="number" value="150" />
            <span>kcal</span>
          </div>
        </div>
      </div>

      <div className={styles.items}>
        <div className={styles.item}>
          <p>Potato</p>
          <p>220 g</p>
        </div>

        <div className={styles.item}>
          <p>Pumpkin</p>
          <p>340 g</p>
        </div>

        <div className={styles.item}>
          <p>Lentils</p>
          <p>45 g</p>
        </div>

        <div className={styles.item}>
          <p>Chickpeas</p>
          <p>45 g</p>
        </div>

        <div className={styles.item}>
          <p>Kidney Beans</p>
          <p>45 g</p>
        </div>
      </div>

      <div className={styles.substitute}>
        <p>
          <span className={`${styles.circle} ${styles.protein}`}></span> Protein
          options
        </p>
        <AiOutlinePlus />
      </div>

      <div className={styles.substitute}>
        <p>
          <span className={`${styles.circle} ${styles.fat}`}></span> Fat options
        </p>

        <AiOutlinePlus />
      </div>
    </main>
  );
}
