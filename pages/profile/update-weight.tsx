import { useUser } from "@context/User";
import { useRouter } from "next/router";
import { axiosInstance, showErrorAlert } from "@utils/index";
import styles from "@styles/UpdateWeight.module.css";
import { FormEvent, useEffect, useState } from "react";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";
import { useAlert } from "@context/Alert";
import { AxiosError } from "axios";
import { IAxiosError } from "types";

export default function UpdateWeightPage() {
  // Hooks
  const router = useRouter();
  const { setAlerts } = useAlert();
  const { user, setUser, isUserLoading } = useUser();

  const [consumerDetails, setConsumerDetails] = useState({
    weight: "",
    height: "",
  });

  // Destructure data
  const { weight, height } = consumerDetails;

  // Check user
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [isUserLoading, user]);

  // Add weight to consumer details
  async function handleAddWeight(e: FormEvent) {
    e.preventDefault();

    try {
      // Make request to the backend
      const response = await axiosInstance.patch("/consumers", {
        weight: +weight,
        height: +height,
      });

      console.log(response);

      // Update the user
      // setUser((currState) =>
      //   currState?.consumer
      //     ? { ...currState, consumer: response.data.data }
      //     : currState
      // );
    } catch (err) {
      // Log error
      console.log(err);
      showErrorAlert(err as AxiosError<IAxiosError>, setAlerts);
    }
  }

  return (
    <main className={styles.update_weight}>
      <h2>Update weight</h2>

      {!isUserLoading && user?.consumer && (
        <section>
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
            <button onClick={handleAddWeight}>Save</button>
          </form>

          <div className={styles.weight_history}>
            <p className={styles.history_title}>Weight history</p>

            {user.consumer.consumer_details.length > 0 && (
              <>
                {user.consumer.consumer_details
                  .sort(
                    (a, b) =>
                      new Date(b.to_date).getTime() -
                      new Date(a.to_date).getTime()
                  )
                  .map((consumerDetails, index) => (
                    <div className={styles.history} key={index}>
                      <div>
                        <p>{consumerDetails.weight} kg</p>
                        <span>
                          {new Date(consumerDetails.to_date).toDateString()}
                        </span>
                      </div>

                      {user.consumer &&
                        index < user.consumer.consumer_details.length - 1 && (
                          <>
                            {user.consumer.consumer_details[index].weight -
                              user.consumer.consumer_details[
                                user.consumer.consumer_details.length - 1
                              ].weight >
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
    </main>
  );
}
