import { IConsumerDetails } from "types";
import { axiosInstance } from "@utils/index";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import logo from "@public/logo-white.svg";
import SubmitButton from "@components/SubmitButton";
import styles from "@styles/AddDetails.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";

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

  // Check user details
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user?.consumer) {
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

    // Add consumer data
    try {
      const response = await axiosInstance.post("/consumers", data);

      // Update user
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
    <main className={styles.add_details}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Image src={logo} priority />
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.title}>Welcome to MicroHub!</p>
        <p className={styles.description}>
          We're excited to help you kick start your journey to better nutrition.
          Help us get to know you and your goals by answering our questionnaire.
          Please be as honest as possible as it will help us to serve you
          better.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={`${user?.first_name} ${user?.last_name}`}
          readOnly
        />

        <label htmlFor="gender">What's your gender?</label>
        <select id="gender" value={gender} onChange={handleChange}>
          <option hidden aria-hidden value="Please select one">
            Please select one
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="weight">What's your weight (kg)?</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={handleChange}
        />

        <label htmlFor="weight">How tall are you (cm)?</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={handleChange}
        />

        <label htmlFor="activity_level">How active are you?</label>
        <select
          id="activity_level"
          value={activity_level}
          onChange={handleChange}
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

        <label htmlFor="preferences">Foods preferences</label>
        <select id="preferences" value={preferences} onChange={handleChange}>
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

        <label htmlFor="weight">Foods you love (comma separated)</label>
        <input
          type="text"
          id="favorite_foods"
          value={favorite_foods}
          onChange={handleChange}
        />

        <label htmlFor="weight">
          Foods you don't like so much (comma separated)
        </label>
        <input
          type="text"
          id="least_favorite_foods"
          value={least_favorite_foods}
          onChange={handleChange}
        />

        <label htmlFor="weight">
          Foods you are allergic to (comma separated)
        </label>
        <input
          type="text"
          id="allergies"
          value={allergies}
          onChange={handleChange}
        />

        <input type="submit" className={styles.submit_button} />
      </form>
    </main>
  );
}
