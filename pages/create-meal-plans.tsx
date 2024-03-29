import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "@context/User";
import { axiosInstance } from "@utils/index";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "@styles/CreateMealPlans.module.css";

export default function CreateMealPlansPage() {
  // Initial state
  const initialState = {
    name: "",
    weeks: 4,
    description: "",
    preference: "",
    meals: [
      {
        week: 0,
        day: "",
        food_items: [
          {
            food: "",
            cals: 0,
            fat: 0,
            carbs: 0,
            notes: "",
            title: "",
            protein: 0,
            course: "",
            recipe_id: "",
            serving: "",
            quantity: "",
          },
        ],
      },
    ],
  };

  // Hooks
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const [recipes, setRecipes] = useState([]);
  const [program, setProgram] = useState(initialState);

  // Check user status
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    } else if (user) {
      getRecipe();
    }
  }, [user, isUserLoading, router]);

  // Get recipe
  async function getRecipe() {
    try {
      // make request to the backend
      const response = await axiosInstance.get("/recipes/self");

      if (response.data.data.recipes.length > 0) {
        // Update state
        setRecipes(response.data.data.recipes);
      } else {
        // Push to the recipes page
        router.push("/pre-built-recipes");
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Set food item
  function setFoodItem(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    mealIndex: number,
    foodItemIndex: number
  ) {
    const targetId = e.target.id;
    const targetValue = e.target.value;

    const newProgram = { ...program };

    let foodItem = newProgram.meals[mealIndex].food_items[foodItemIndex];

    if (targetId === "recipe") {
      foodItem.food = targetValue;
      foodItem.recipe_id = JSON.parse(targetValue).id;
      foodItem.fat = +JSON.parse(targetValue).fat;
      foodItem.cals = +JSON.parse(targetValue).calories;
      foodItem.protein = +JSON.parse(targetValue).protein;
      foodItem.carbs = +JSON.parse(targetValue).carbohydrates;
    } else {
      foodItem = {
        ...foodItem,
        [targetId]: targetId === "quantity" ? +targetValue : targetValue,
      };
    }

    newProgram.meals[mealIndex].food_items[foodItemIndex] = foodItem;

    setProgram(newProgram);
  }

  // Handle add new meal
  function addNewMeal() {
    setProgram((currState) => ({
      ...currState,
      meals: [...currState.meals, initialState.meals[0]],
    }));
  }

  // Handle remove meal
  function removeNewMeal() {
    if (program.meals.length > 1) {
      setProgram((currState) => {
        return {
          ...currState,
          meals: currState.meals.slice(0, currState.meals.length - 1),
        };
      });
    }
  }

  // Handle add food item
  function addFoodItem(index: number) {
    let newProgram = { ...program };

    newProgram.meals[index].food_items.push(
      initialState.meals[0].food_items[0]
    );

    setProgram(newProgram);
  }

  // Handle remove food item
  function removeFoodItem(index: number) {
    let newProgram = { ...program };

    if (newProgram.meals[index].food_items.length > 1) {
      newProgram.meals[index].food_items.pop();

      setProgram(newProgram);
    }
  }

  // Handle save program
  async function saveProgram() {
    console.log(program);
    if (program.name.trim() != "") {
      try {
        const response = await axiosInstance.post("/programs", program);

        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Program must contain a name");
    }
  }

  return (
    <main className={styles.create_meal_plans}>
      <h2>Create meal plan</h2>

      <div className={styles.save_program}>
        <input
          type="text"
          placeholder="Program name"
          onChange={(e) =>
            setProgram((currState) => ({
              ...currState,
              name: e.target.value,
            }))
          }
        />
        <button onClick={saveProgram}>Save Program</button>
      </div>

      {program.meals.map((meal, mealIndex) => (
        <div key={mealIndex} className={styles.controller}>
          <div className={styles.controller_top}>
            <input
              type="number"
              placeholder="Week"
              value={program.meals[mealIndex].week}
              onChange={(e) => {
                const newProgram = { ...program };

                newProgram.meals[mealIndex].week = +e.target.value;

                setProgram(newProgram);
              }}
            />

            <select
              value={program.meals[mealIndex].day}
              onChange={(e) => {
                const newProgram = { ...program };

                newProgram.meals[mealIndex].day = e.target.value;

                setProgram(newProgram);
              }}
            >
              <option value="">--Select--</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>

            <div className={styles.buttons}>
              <button onClick={() => addFoodItem(mealIndex)}>+</button>
              <button onClick={() => removeFoodItem(mealIndex)}>-</button>
            </div>
          </div>

          {meal.food_items.map((foodItem, foodIndex) => (
            <div key={foodIndex} className={styles.items}>
              <div className={styles.item}>
                <p>Title</p>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  value={foodItem.title}
                  onChange={(e) => setFoodItem(e, mealIndex, foodIndex)}
                />
              </div>
              <div className={styles.item}>
                <p>Course</p>
                <select
                  id="course"
                  onChange={(e) => setFoodItem(e, mealIndex, foodIndex)}
                >
                  <option value="">--Select--</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snacks">Snacks</option>
                </select>
              </div>

              <div className={styles.item}>
                <p>Recipe</p>
                <select
                  id="recipe"
                  value={foodItem.food}
                  onChange={(e) => setFoodItem(e, mealIndex, foodIndex)}
                >
                  <option value="">--Select--</option>
                  {recipes.map((recipe: any, index) => (
                    <option key={index} value={JSON.stringify(recipe)}>
                      {recipe.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.item}>
                <p>Notes</p>
                <input
                  type="text"
                  id="notes"
                  placeholder="Notes"
                  value={foodItem.notes}
                  onChange={(e) => setFoodItem(e, mealIndex, foodIndex)}
                />
              </div>
              <div className={styles.item}>
                <p>Quantity</p>
                <input
                  type="number"
                  id="quantity"
                  value={foodItem.quantity}
                  onChange={(e) => setFoodItem(e, mealIndex, foodIndex)}
                />
              </div>
              <div className={styles.item}>
                <p>Servings (g)</p>
                <input
                  type="number"
                  id="serving"
                  value={foodItem.serving}
                  onChange={(e) => setFoodItem(e, mealIndex, foodIndex)}
                />
              </div>

              <div className={styles.item}>
                <p>Fat (g)</p>
                <p>{foodItem.fat}</p>
              </div>
              <div className={styles.item}>
                <p>Protein (g)</p>
                <p>{foodItem.protein}</p>
              </div>
              <div className={styles.item}>
                <p>Calories (g)</p>
                <p>{foodItem.cals}</p>
              </div>
              <div className={styles.item}>
                <p>Carbohydrates (g)</p>
                <p>{foodItem.carbs}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className={styles.add_remove_meal_buttons}>
        <button onClick={addNewMeal}>Add New Meal</button>
        <button onClick={removeNewMeal}>Remove Meal</button>
      </div>
    </main>
  );
}
