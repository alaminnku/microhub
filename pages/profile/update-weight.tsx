import { useUser } from "@context/User";
import { useRouter } from "next/router";
import styles from "@styles/UpdateWeight.module.css";
import { FormEvent, useEffect, useState } from "react";
import {
  HiArrowNarrowDown,
  HiArrowNarrowUp,
  HiArrowSmDown,
  HiArrowSmUp,
} from "react-icons/hi";

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

  async function handleUpdateWeight(e: FormEvent) {
    e.preventDefault();

    console.log(weight);
  }

  const weightHistory = [
    {
      weight: 165,
      date: "Dec 10, 2022",
    },
    {
      weight: 170,
      date: "Jan 10, 2023",
    },
    {
      weight: 160,
      date: "Jan 18, 2023",
    },
  ];
  return (
    <main className={styles.update_weight}>
      <h2>Update weight</h2>

      {!isUserLoading && user && (
        <section>
          <form>
            <input
              type="number"
              placeholder="Enter your current weight"
              value={weight}
              onChange={(e) => setWeight(+e.target.value)}
            />
            <button onClick={handleUpdateWeight}>Save</button>
          </form>

          <div className={styles.weight_history}>
            <p className={styles.history_title}>Weight history</p>

            {weightHistory.length > 0 && (
              <>
                {weightHistory
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((history, index) => (
                    <div className={styles.history} key={index}>
                      <div>
                        <p>{history.weight} lbs</p>
                        <span>{history.date}</span>
                      </div>

                      {index < weightHistory.length - 1 && (
                        <>
                          {weightHistory[index].weight -
                            weightHistory[weightHistory.length - 1].weight >
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
