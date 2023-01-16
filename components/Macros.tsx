import React, { useState } from "react";
import styles from "@styles/Macros.module.css";
import { BsPieChartFill } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface IMacrosProps {
  text: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

export default function Macros({
  text,
  calories,
  carbs,
  fat,
  protein,
}: IMacrosProps) {
  const [showMacroDetails, setShowMacroDetails] = useState(false);

  return (
    <div className={styles.macros}>
      <div className={styles.summary}>
        <div className={styles.chart_and_details}>
          <BsPieChartFill />

          <div>
            <p>{text}</p>
            <span>{calories} Calories</span>
          </div>
        </div>

        {!showMacroDetails && (
          <AiOutlinePlus onClick={() => setShowMacroDetails(true)} />
        )}

        {showMacroDetails && (
          <AiOutlineMinus onClick={() => setShowMacroDetails(false)} />
        )}
      </div>

      {showMacroDetails && (
        <div className={styles.macro_details}>
          <div className={styles.protein}>
            <p>{protein} g</p>
            <span>Protein</span>
          </div>

          <span className={styles.border}></span>

          <div className={styles.fats}>
            <p>{fat} g</p>
            <span>Fats</span>
          </div>

          <span className={styles.border}></span>

          <div className={styles.carbs}>
            <p>{carbs} g</p>
            <span>Carbs</span>
          </div>
        </div>
      )}
    </div>
  );
}
