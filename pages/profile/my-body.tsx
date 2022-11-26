import React, { useEffect } from "react";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import styles from "@styles/MyBody.module.css";
import { formatNumber } from "@utils/index";
import BackButton from "@components/BackButton";

export default function MyBodyPage() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user && router.isReady) {
      router.push("/login");
    } else if (!user?.consumer) {
      router.push("/add-details");
    }
  }, [user, router.isReady]);

  return (
    <main>
      {user && (
        <>
          <BackButton url="/profile" />

          <section className={styles.my_body}>
            <h2>My Body</h2>

            <div className={styles.details}>
              <div className={`${styles.item} ${styles.weight}`}>
                <p>
                  {user?.consumer?.weight} <span>KG</span>
                </p>
                <p>Weight</p>
              </div>

              <div className={`${styles.item} ${styles.height}`}>
                <p>
                  {user?.consumer?.height} <span>CM</span>
                </p>
                <p>Height</p>
              </div>

              <div className={`${styles.item} ${styles.bmi}`}>
                <p>
                  {user?.consumer?.bmi} <span>BMI</span>
                </p>
                <p>Body mass index</p>
              </div>

              <div className={`${styles.item} ${styles.tdee}`}>
                <p>
                  {user?.consumer?.tdee} <span>TDEE</span>
                </p>
                <p>TDEE</p>
              </div>

              <div className={`${styles.item} ${styles.lbm}`}>
                <p>
                  {formatNumber(user?.consumer?.body_fat.LEAN_BODY_MASS!)}{" "}
                  <span>LBM</span>
                </p>
                <p>Lean body mass</p>
              </div>

              <div className={`${styles.item} ${styles.bf}`}>
                <p>
                  {formatNumber(user?.consumer?.body_fat.BODY_FAT!)}{" "}
                  <span>BF</span>
                </p>
                <p>Body fat</p>
              </div>

              <div className={`${styles.item} ${styles.bfp}`}>
                <p>
                  {formatNumber(user?.consumer?.body_fat.BODY_FAT_PCT!)}{" "}
                  <span>BFPCT</span>
                </p>
                <p>Body fat PCT</p>
              </div>

              <div className={`${styles.item} ${styles.body_frame}`}>
                <p>
                  {user?.consumer?.body_frame} <span>BF</span>
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
