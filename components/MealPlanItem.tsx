import Image from "next/image";
import Link from "next/link";
import { IFoodItem } from "types";
import styles from "@styles/MealPlanItem.module.css";

interface IMealPlanItemProps {
  plan: number;
  foodItem: IFoodItem;
}

export default function MealPlanItem({ plan, foodItem }: IMealPlanItemProps) {
  return (
    <div className={styles.item}>
      <input type="checkbox" />
      <Link href={`/${plan}/${foodItem.id}`}>
        <a>
          <div className={styles.image}>
            <Image
              src="/food-placeholder.jpg"
              width={1}
              height={1}
              layout="responsive"
            />
          </div>
          <p>{foodItem.title}</p>
        </a>
      </Link>
    </div>
  );
}
