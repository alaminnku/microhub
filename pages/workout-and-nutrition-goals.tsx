import SubmitButton from "@components/layout/SubmitButton";
import { ChangeEvent, useState } from "react";
import { IFormData } from "types";

export default function WorkoutAndNutritionGoalsPage() {
  const initialState = {
    body_fat: 0,
    sex: "",
    weight: 0,
    wrist: 0,
    waist: 0,
    hip: 0,
    forearm: 0,
    activity_level: "",
  };

  const [formData, setFormData] = useState<IFormData>(initialState);

  const { body_fat, sex, weight, wrist, waist, hip, forearm, activity_level } =
    formData;

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    // Id and value
    const id = e.target.id;
    const value = e.target.value;

    setFormData((currFormData) => ({
      ...currFormData,
      [id]: id === "sex" || id === "activity_level" ? value : +value,
    }));
  }

  async function handleSubmit() {}

  return (
    <main className="px-5 py-4 border">
      <h2 className="mb-3 text-xl font-bold">Workout and nutrition goals</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="body_fat" className={labelStyle}>
          Your body fat
        </label>
        <input
          type="number"
          id="body_fat"
          value={body_fat}
          onChange={handleChange}
          className={inputStyle}
        />

        <label htmlFor="sex" className={labelStyle}>
          Your sex
        </label>
        <select
          id="sex"
          value={sex}
          onChange={handleChange}
          className={selectStyle}
        >
          <option hidden aria-hidden value="Please select your sex">
            Please select your sex
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="weight" className={labelStyle}>
          Your weight
        </label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={handleChange}
          className={inputStyle}
        />

        <label htmlFor="wrist" className={labelStyle}>
          Wrist measurement
        </label>
        <input
          type="number"
          id="wrist"
          value={wrist}
          onChange={handleChange}
          className={inputStyle}
        />

        <label htmlFor="waist" className={labelStyle}>
          Waist measurement
        </label>
        <input
          type="number"
          id="waist"
          value={waist}
          onChange={handleChange}
          className={inputStyle}
        />

        <label htmlFor="hip" className={labelStyle}>
          Hip measurement
        </label>
        <input
          type="number"
          id="hip"
          value={hip}
          onChange={handleChange}
          className={inputStyle}
        />

        <label htmlFor="forearm" className={labelStyle}>
          Forearm measurement
        </label>
        <input
          type="number"
          id="forearm"
          value={forearm}
          onChange={handleChange}
          className={inputStyle}
        />

        <label htmlFor="activity_level" className={labelStyle}>
          Your activity level
        </label>
        <select
          id="activity_level"
          value={activity_level}
          onChange={handleChange}
          className={selectStyle}
        >
          <option hidden aria-hidden value="Please select your activity level">
            Please select your activity level
          </option>
          <option value="light">Light (1-3 days/week)</option>
          <option value="moderate">Moderate (3-5 days/week)</option>
          <option value="very_active">Very active (6-7 days/week)</option>
          <option value="extremely_active">
            Extremely active (Several times per day)
          </option>
        </select>

        <SubmitButton />
      </form>
    </main>
  );
}

// Styles
const labelStyle = "mb-2";
const inputStyle = "border border-gray-500 mb-4 py-2 px-2 rounded";
const selectStyle = "border border-gray-500 mb-4 py-3 px-3 rounded";
