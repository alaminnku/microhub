import { useUser } from "@context/User";
import { useRouter } from "next/router";
import { axiosInstance, showErrorAlert } from "@utils/index";
import styles from "@styles/UpdateWeight.module.css";
import { FormEvent, useEffect, useState } from "react";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";
import { useAlert } from "@context/Alert";
import { AxiosError } from "axios";
import { IAxiosError, IWeightHistory } from "types";
import BackButton from "@components/BackButton";
import ButtonLoader from "@components/ButtonLoader";
import { PuffLoader } from "react-spinners";

export default function UpdateWeightPage() {
  // Initial state
  const initialState = {
    weight: "",
    height: "",
  };

  // Hooks
  const router = useRouter();
  const { setAlerts } = useAlert();
  const { user, setUser, isUserLoading } = useUser();
  const [isSavingWeight, setIsSavingWeight] = useState(false);
  const [weightHistory, setWeightHistory] = useState<IWeightHistory[]>([]);
  const [consumerDetails, setConsumerDetails] = useState(initialState);

  // Destructure data
  const { weight, height } = consumerDetails;

  // Check user and get weight history
  useEffect(() => {
    if (!isUserLoading && !user && router.isReady) {
      router.push("/login");
    } else if (user?.consumer) {
      setWeightHistory(
        user.consumer.consumer_details.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    }
  }, [isUserLoading, user, router.isReady]);

  // Add weight to consumer details
  async function handleAddWeight(e: FormEvent) {
    e.preventDefault();

    try {
      // Show loader
      setIsSavingWeight(true);

      // Make request to the backend
      const response = await axiosInstance.patch("/consumers", {
        weight: +weight,
        height: +height,
      });

      // Updated consumer
      const updatedConsumer = response.data.data.consumer;

      // Update the user
      setUser((currState) =>
        currState?.consumer
          ? {
              ...currState,
              consumer: {
                ...updatedConsumer,
                consumer_details: [
                  ...currState.consumer.consumer_details,
                  updatedConsumer.consumer_details[0],
                ],
              },
            }
          : currState
      );

      setConsumerDetails(initialState);
    } catch (err) {
      // Show alert
      showErrorAlert(err as AxiosError<IAxiosError>, setAlerts);
    } finally {
      // Remove loader
      setIsSavingWeight(false);
    }
  }

  return (
    <main>
      <BackButton url="/profile" />

      <>
        {!isUserLoading && user?.consumer && (
          <section className={styles.update_weight}>
            <h2>Update weight</h2>
            <form>
              <input
                type="number"
                value={weight}
                placeholder="Enter your current weight"
                onChange={(e) =>
                  setConsumerDetails((currState) => ({
                    ...currState,
                    weight: e.target.value,
                  }))
                }
              />
              <input
                type="number"
                value={height}
                placeholder="Enter your current height"
                onChange={(e) =>
                  setConsumerDetails((currState) => ({
                    ...currState,
                    height: e.target.value,
                  }))
                }
              />
              <button onClick={handleAddWeight} disabled={isSavingWeight}>
                {isSavingWeight ? <ButtonLoader /> : "Save"}
              </button>
            </form>

            <div className={styles.weight_history}>
              <p className={styles.history_title}>Weight history</p>

              {weightHistory.length > 0 && (
                <>
                  {weightHistory.map((consumerDetails, index) => (
                    <div className={styles.history} key={index}>
                      <div>
                        <p>{consumerDetails.weight} kg</p>
                        <span>
                          {new Date(consumerDetails.createdAt).toDateString()}
                        </span>
                      </div>

                      {user.consumer && index < weightHistory.length - 1 && (
                        <>
                          {weightHistory[index].weight -
                            weightHistory[index + 1].weight >
                          0 ? (
                            <HiArrowNarrowUp className={styles.up} />
                          ) : (
                            <HiArrowNarrowDown className={styles.down} />
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </section>
        )}
      </>
    </main>
  );
}
