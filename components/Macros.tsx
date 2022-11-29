import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPieChartFill } from "react-icons/bs";
import styles from "@styles/Macros.module.css";

interface IMacrosProps {
  text: string;
  calories: number;
}

export default function Macros({ text, calories }: IMacrosProps) {
  return (
    <div className={styles.macros}>
      <div className={styles.chart_and_details}>
        <BsPieChartFill />

        <div>
          <p>{text}</p>
          <span>{calories} Calories</span>
        </div>
      </div>

      <AiOutlinePlus />
    </div>
  );
}
