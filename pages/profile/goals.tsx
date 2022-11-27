import BackButton from "@components/BackButton";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "@styles/Goals.module.css";
import { formatNumber } from "@utils/index";
import { BsArrowRightShort } from "react-icons/bs";

export default function GoalsPage() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user && router.isReady) {
      router.push("/login");
    } else if (!user?.consumer) {
      router.push("/add-details");
    }
  }, [user, router.isReady]);

  console.log(user?.consumer);

  return (
    <main>
      {user && (
        <>
          <BackButton url="/profile" />

          <section className={styles.goals}>
            <h2>Goals</h2>

            <div className={styles.details}>
              <p className={styles.weight_target}>
                {user.consumer?.healthy_weight! - user.consumer?.weight! > 0
                  ? "Gain Weight"
                  : "Loose Weight"}
              </p>

              <div className={styles.weight}>
                <p>
                  {user.consumer?.weight} <span>KG</span>
                </p>
                <BsArrowRightShort />
                <p>
                  {formatNumber(user.consumer?.healthy_weight!)} <span>KG</span>
                </p>
              </div>
            </div>

            <div className={styles.items}>
              <div className={styles.item}>
                <p>
                  {user.consumer?.daily_targets.daily_calorie}{" "}
                  <span>kcals</span>
                </p>
                <p>Daily calorie</p>
              </div>

              <div className={styles.item}>
                <p>
                  {user.consumer?.daily_targets.daily_protein} <span>gm</span>
                </p>
                <p>Daily protein</p>
              </div>
              <div className={styles.item}>
                <p>
                  {user.consumer?.daily_targets.daily_carbs} <span>gm</span>
                </p>
                <p>Daily carbs</p>
              </div>
              <div className={styles.item}>
                <p>
                  {user.consumer?.daily_targets.daily_fat} <span>gm</span>
                </p>
                <p>Daily fat</p>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
