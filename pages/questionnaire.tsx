import Image from "next/image";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import logo from "@public/logo-white.svg";
import { IFormData, IQuestionnaireData } from "types";
import ButtonLoader from "@components/ButtonLoader";
import styles from "@styles/Questionnaire.module.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { axiosInstance } from "@utils/index";

export default function QuestionnairePage() {
  // Question
  const question = {
    question: "",
    answer: "",
  };

  // Initial state
  const initialQuestionsState = {
    question_1: question,
    question_2: question,
    question_3: question,
    question_4: question,
    question_5: question,
    question_6: question,
    question_7: question,
  };

  const initialFormState = {
    work_phone_number: "",
    home_phone_number: "",
    date_of_birth: "",
    lowest_weight: 0,
    lowest_height: 0,
  };

  const router = useRouter();
  const { isUserLoading, user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [questionData, setQuestionsData] = useState<IQuestionnaireData>(
    initialQuestionsState
  );
  const [formData, setFormData] = useState<IFormData>(initialFormState);

  // Destructure form data
  const {
    question_1,
    question_2,
    question_3,
    question_4,
    question_5,
    question_6,
    question_7,
  } = questionData;

  const {
    work_phone_number,
    home_phone_number,
    date_of_birth,
    lowest_weight,
    lowest_height,
  } = formData;

  // Check user
  useEffect(() => {
    if (!isUserLoading && !user && router.isReady) {
      router.push("/login");
    } else if (user?.questionnaire && router.isReady) {
      router.push("/profile");
    }
  }, [isUserLoading, user, router.isReady]);

  // Handle question data change
  function handleChangeQuestion(
    e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setQuestionsData({
      ...questionData,
      [e.target.id]: {
        question: e.target.previousElementSibling?.textContent as string,
        answer: e.target.value,
      },
    });
  }

  // Handle form data change
  function handleChangeForm(e: ChangeEvent<HTMLInputElement>) {
    const id = e.target.id;
    const value = e.target.value;

    setFormData({
      ...formData,
      [id]: id === "lowest_height" || id === "lowest_weight" ? +value : value,
    });
  }

  // Handle form submit
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Convert question object to question array
    const questionArray = Object.entries(questionData);

    // Format questions
    const formattedQuestions = questionArray
      .map((question) => {
        if (question[0] === "question_4") {
          return {
            ...question[1],
            additional_question: questionArray[4][1].question,
            additional_answer: questionArray[4][1].answer,
          };
        } else if (question[0] === "question_6") {
          return {
            ...question[1],
            additional_question: questionArray[6][1].question,
            additional_answer: questionArray[6][1].answer,
          };
        } else {
          return question[1];
        }
      })
      .filter((question, index) => index !== 4 && index !== 6);

    const data = {
      nutritionistId: 1,
      name: `${user?.first_name} ${user?.last_name}`,
      email: user?.email,
      work_phone_number,
      home_phone_number,
      date: new Date().toISOString(),
      date_of_birth: new Date(date_of_birth).toISOString(),
      weight: user?.consumer?.weight,
      height: user?.consumer?.healthy_weight,
      lowest_height,
      lowest_weight,
      questions: formattedQuestions,
    };

    try {
      // Show loader
      setIsLoading(true);

      const response = await axiosInstance.post(
        "/consumers/questionnaire",
        data
      );

      // Update user
      setUser((currState) => {
        if (currState) {
          return {
            ...currState,
            questionnaire: response.data.data.questionnaire,
          };
        } else {
          return null;
        }
      });

      router.push("/profile");
    } catch (err) {
      console.log(err);
    } finally {
      // Remove loader
      setIsLoading(false);
    }
  }

  return (
    <main>
      {isUserLoading && <h2>Loading...</h2>}

      {!isUserLoading && !user?.questionnaire && (
        <>
          <section className={styles.top}>
            <div className={styles.logo}>
              <Image src={logo} priority />
            </div>
          </section>

          <section>
            <div className={styles.content}>
              <p className={styles.title}>Health screening questionnaire</p>
              <p className={styles.description}>
                Help the nutritionist get to know you and your goals by
                answering our questionnaire.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <label htmlFor="work_phone_number">
                What is your work phone number?
              </label>
              <input
                type="text"
                id="work_phone_number"
                value={work_phone_number}
                onChange={handleChangeForm}
              />

              <label htmlFor="home_phone_number">
                What is your home phone number?
              </label>
              <input
                type="text"
                id="home_phone_number"
                value={home_phone_number}
                onChange={handleChangeForm}
              />

              <label htmlFor="date_of_birth">What is your date of birth?</label>
              <input
                type="date"
                id="date_of_birth"
                value={date_of_birth}
                onChange={handleChangeForm}
              />

              <label htmlFor="lowest_weight">
                What is your lowest weight in last 5 years?
              </label>
              <input
                type="number"
                id="lowest_weight"
                value={lowest_weight}
                onChange={handleChangeForm}
              />

              <label htmlFor="lowest_weight">
                What is your lowest height in last 5 years?
              </label>
              <input
                type="number"
                id="lowest_height"
                value={lowest_height}
                onChange={handleChangeForm}
              />

              <label htmlFor="question_1">
                What are you hoping to accomplish by seeing a Microhub
                Nutritionist?
              </label>
              <textarea
                rows={8}
                id="question_1"
                value={question_1.answer}
                onChange={handleChangeQuestion}
              />

              <label htmlFor="question_2">
                What do you believe are your major barriers to achieving
                success?
              </label>
              <textarea
                rows={8}
                id="question_2"
                value={question_2.answer}
                onChange={handleChangeQuestion}
              />

              <label htmlFor="question_3">
                How do you feel about your weight?
              </label>
              <textarea
                rows={8}
                id="question_3"
                value={question_3.answer}
                onChange={handleChangeQuestion}
              />

              <label htmlFor="question_4">
                Has your weight changed over the last year?
              </label>
              <select
                id="question_4"
                value={question_4.answer}
                onChange={handleChangeQuestion}
              >
                <option hidden aria-hidden value="Please select one">
                  Please select one
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <label htmlFor="question_5">If so, by how much and why?</label>
              <textarea
                rows={8}
                id="question_5"
                value={question_5.answer}
                onChange={handleChangeQuestion}
              />

              <label htmlFor="question_6">
                Have you used any diet or weight loss programs in the past (e.g.
                low carb, Weight Watchers)?
              </label>
              <select
                id="question_6"
                value={question_6.answer}
                onChange={handleChangeQuestion}
              >
                <option hidden aria-hidden value="Please select one">
                  Please select one
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <label htmlFor="question_7">
                If so, which programs were successful for you? Why?
              </label>
              <textarea
                rows={8}
                id="question_7"
                value={question_7.answer}
                onChange={handleChangeQuestion}
              />

              <button className={styles.submit_button}>
                {isLoading ? <ButtonLoader /> : "Submit"}
              </button>
            </form>
          </section>
        </>
      )}
    </main>
  );
}
