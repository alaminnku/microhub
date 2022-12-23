import React from "react";
import { IMeal } from "types";
import { TfiReload } from "react-icons/tfi";
import styles from "@styles/MealPlanSectionHeader.module.css";

interface IMealPlanSectionHeaderProps {
  meals: IMeal[];
  course: string;
}

export default function MealPlanSectionHeader({
  meals,
  course,
}: IMealPlanSectionHeaderProps) {
  // Calculate total calories of each group
  const groupTotalCalories = () =>
    meals
      .filter((meal) => meal.course === course)
      .reduce((acc, curr) => acc + curr.cals, 0);

  return (
    <div className={styles.header}>
      <div>
        <p>{course}</p>
        <span>{groupTotalCalories()} Calories</span>
      </div>
      <TfiReload />
    </div>
  );
}
