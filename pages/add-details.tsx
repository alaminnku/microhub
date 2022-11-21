import { IConsumerDetails } from "types";
import { axiosInstance } from "@utils/index";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import SubmitButton from "@components/SubmitButton";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function AddDetailsPage() {
  // Initial state
  const initialState = {
    gender: "",
    weight: 0,
    height: 0,
    allergies: "",
    preferences: "",
    activity_level: "",
    favorite_foods: "",
    least_favorite_foods: "",
  };

  // Hooks
  const router = useRouter();
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState<IConsumerDetails>(initialState);

  // Push to check user details
  // and push to the profile page
  useEffect(() => {
    if (user?.consumer) {
      router.push("/profile");
    }
  });

  // Destructure form data
  const {
    gender,
    weight,
    height,
    allergies,
    preferences,
    activity_level,
    favorite_foods,
    least_favorite_foods,
  } = formData;

  // Handle form data change
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    // Id and value
    const id = e.target.id;
    const value = e.target.value;

    setFormData((currFormData) => ({
      ...currFormData,
      [id]: id === "weight" || id === "height" ? +value : value,
    }));
  }

  // Handle form submit
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Convert text to array
    const convertTextToArray = (text: string) =>
      text.split(",").map((el) => el.trim());

    // Format data
    const data = {
      ...formData,
      allergies: convertTextToArray(formData.allergies),
      favorite_foods: convertTextToArray(formData.favorite_foods),
      least_favorite_foods: convertTextToArray(formData.least_favorite_foods),
    };

    try {
      const response = await axiosInstance.post("/consumers", data);

      console.log(response);

      setUser((currUser) => {
        if (currUser) {
          return {
            ...currUser,
            consumer: response.data.data.consumer,
          };
        } else {
          return null;
        }
      });

      // Push to the profile page
      router.push("/profile");
    } catch (err) {
      console.log(err);
    } finally {
      // Remove loader
    }
  }

  return (
    <main className="px-5 py-4">
      <p className="mb-3 text-xl font-semibold">
        Help us learn about your workout and nutrition goals
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="gender" className={labelStyle}>
          What's your gender?
        </label>
        <select
          id="gender"
          value={gender}
          onChange={handleChange}
          className={selectStyle}
        >
          <option hidden aria-hidden value="Please select one">
            Please select one
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="weight" className={labelStyle}>
          What's your weight - In KG?
        </label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={handleChange}
          className={inputStyle}
        />

        <label htmlFor="weight" className={labelStyle}>
          How tall are you - In CM?
        </label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={handleChange}
          className={inputStyle}
        />

        <label htmlFor="activity_level" className={labelStyle}>
          How active are you?
        </label>
        <select
          id="activity_level"
          value={activity_level}
          onChange={handleChange}
          className={selectStyle}
        >
          <option hidden aria-hidden value="Please select one">
            Please select one
          </option>
          <option value="sedentary">Sedentary</option>
          <option value="lightly active">Lightly active</option>
          <option value="moderate active">Moderate active</option>
          <option value="very active">Very active</option>
          <option value="extremely active">Extremely active</option>
        </select>

        <label htmlFor="preferences" className={labelStyle}>
          Foods preferences
        </label>
        <select
          id="preferences"
          value={preferences}
          onChange={handleChange}
          className={selectStyle}
        >
          <option hidden aria-hidden value="Please select one">
            Please select one
          </option>
          <option value="meat">Meat</option>
          <option value="diet">Diet</option>
          <option value="vegan">Vegan</option>
          <option value="halal">Halal</option>
          <option value="kosher">Kosher</option>
          <option value="standard">Standard</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="pollotarian">Pollotarian</option>
          <option value="gluten free">Gluten free</option>
          <option value="pescetarian">Pescetarian</option>
          <option value="lacto vegetarian">Lacto vegetarian</option>
        </select>

        <label htmlFor="weight" className={labelStyle}>
          Foods you love - Comma separated
        </label>
        <input
          type="text"
          id="favorite_foods"
          value={favorite_foods}
          onChange={handleChange}
          className={inputStyle}
        />

        <label htmlFor="weight" className={labelStyle}>
          Foods you don't like so much - Comma separated
        </label>
        <input
          type="text"
          id="least_favorite_foods"
          value={least_favorite_foods}
          onChange={handleChange}
          className={inputStyle}
        />

        <label htmlFor="weight" className={labelStyle}>
          Foods you are allergic to - Comma separated
        </label>
        <input
          type="text"
          id="allergies"
          value={allergies}
          onChange={handleChange}
          className={inputStyle}
        />

        <SubmitButton />
      </form>
    </main>
  );
}

// Styles
const labelStyle = "mb-2";
const inputStyle = "border border-gray-500 mb-4 py-2 px-2 rounded";
const selectStyle = "border border-gray-500 mb-4 py-3 px-3 rounded";
