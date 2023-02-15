import { useUser } from "@context/User";
import { useRouter } from "next/router";
import { axiosInstance } from "@utils/index";
import styles from "@styles/UpdateWeight.module.css";
import { FormEvent, useEffect, useState } from "react";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";

export default function UpdateWeightPage() {
  // Hooks
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const [weight, setWeight] = useState<number>();

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
      const response = await axiosInstance.patch("/consumers");

      console.log(response);
    } catch (err) {
      console.log(err);
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
              placeholder="Enter your current weight"
              value={weight}
              onChange={(e) => setWeight(+e.target.value)}
            />
            <button onClick={handleAddWeight}>Save</button>
          </form>

          <div className={styles.weight_history}>
            <p className={styles.history_title}>Weight history</p>

            {user.consumer.consumer_details.length > 0 && (
              <>
                {user.consumer.consumer_details.map(
                  (consumerDetails, index) => (
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
                  )
                )}
              </>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
