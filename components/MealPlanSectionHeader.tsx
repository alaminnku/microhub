import React from "react";
import { IFoodItem, IMeal } from "types";
import { TfiReload } from "react-icons/tfi";
import styles from "@styles/MealPlanSectionHeader.module.css";

interface IMealPlanSectionHeaderProps {
  foodItems: IFoodItem[];
  course: string;
}

export default function MealPlanSectionHeader({
  foodItems,
  course,
}: IMealPlanSectionHeaderProps) {
  // Calculate total calories of each group
  const groupTotalCalories = () =>
    foodItems
      .filter((meal) => meal.course === course)
      .reduce((acc, curr) => acc + curr.recipe.calories, 0);

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
