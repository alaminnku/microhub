import Image from "next/image";
import Link from "next/link";
import { IMeal } from "types";
import styles from "@styles/MealPlanItem.module.css";

interface IMealPlanItemProps {
  plan: number;
  meal: IMeal;
}

export default function MealPlanItem({ plan, meal }: IMealPlanItemProps) {
  return (
    <div className={styles.item}>
      <input type="checkbox" />
      <Link href={`/${plan}/${meal.id}`}>
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
