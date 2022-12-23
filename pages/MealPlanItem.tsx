import Image from "next/image";
import Link from "next/link";
import styles from "@styles/MealPlanItem.module.css";
import { IMeal } from "types";

interface IMealPlanItemProps {
  planId: number;
  meal: IMeal;
}

export default function MealPlanItem({ planId, meal }: IMealPlanItemProps) {
  return (
    <div className={styles.item}>
      <input type="checkbox" />
      <Link href={`/${planId}/${meal.id}`}>
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
  );
}
