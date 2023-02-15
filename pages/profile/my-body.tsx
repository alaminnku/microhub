import { useRouter } from "next/router";
import { useUser } from "@context/User";
import React, { useEffect } from "react";
import { formatNumber } from "@utils/index";
import styles from "@styles/MyBody.module.css";
import BackButton from "@components/BackButton";

export default function MyBodyPage() {
  const router = useRouter();
  const { isUserLoading, user } = useUser();

  useEffect(() => {
    if (!isUserLoading && !user && router.isReady) {
      router.push("/login");
    } else if (!user?.consumer) {
      router.push("/add-details");
    }
  }, [isUserLoading, user, router.isReady]);

  return (
    <main>
      {!isUserLoading && user && user.consumer && (
        <>
          <BackButton url="/profile" />

          <section className={styles.my_body}>
            <h2>My Body</h2>

            <div className={styles.details}>
              <div className={styles.item}>
                <p>
                  {user.consumer.consumer_details[0].weight} <span>kg</span>
                </p>
                <p>Weight</p>
              </div>

              <div className={styles.item}>
                <p>
                  {user.consumer.consumer_details[0].height} <span>cm</span>
                </p>
                <p>Height</p>
              </div>

              <div className={styles.item}>
                <p>
                  {user?.consumer?.bmi} <span>bmi</span>
                </p>
                <p>Body mass index</p>
              </div>

              <div className={styles.item}>
                <p>
                  {user?.consumer?.tdee} <span>tdee</span>
                </p>
                <p>TDEE</p>
              </div>

              <div className={styles.item}>
                <p>
                  {formatNumber(user?.consumer?.body_fat.LEAN_BODY_MASS!)}{" "}
                  <span>lbm</span>
                </p>
                <p>Lean body mass</p>
              </div>

              <div className={styles.item}>
                <p>
                  {formatNumber(user?.consumer?.body_fat.BODY_FAT!)}{" "}
                  <span>bf</span>
                </p>
                <p>Body fat</p>
              </div>

              <div className={styles.item}>
                <p>
                  {formatNumber(user?.consumer?.body_fat.BODY_FAT_PCT!)}{" "}
                  <span>bfpct</span>
                </p>
                <p>Body fat PCT</p>
              </div>

              <div className={`${styles.item} ${styles.body_frame}`}>
                <p>
                  {user?.consumer?.body_frame} <span>bf</span>
                </p>
                <p>Body frame</p>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
