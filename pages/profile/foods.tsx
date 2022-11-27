import BackButton from "@components/BackButton";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "@styles/Foods.module.css";

export default function FoodsPage() {
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

          <section className={styles.foods}>
            <h2>Foods</h2>

            <div className={styles.details}>
              <p className={styles.preferences}>
                Preferences - <span>{user?.consumer?.preferences}</span>
              </p>

              <div className={styles.item}>
                <p>Favorite foods</p>
                <div className={styles.values}>
                  {user?.consumer?.favorite_foods.map((food, index) => (
                    <p key={index}>{food}</p>
                  ))}
                </div>
              </div>

              <div className={styles.item}>
                <p>Allergies</p>
                <div className={styles.values}>
                  {user?.consumer?.allergies.map((food, index) => (
                    <p key={index}>{food}</p>
                  ))}
                </div>
              </div>

              <div className={styles.item}>
                <p>Least favorite foods</p>
                <div className={styles.values}>
                  {user?.consumer?.least_favorite_foods.map((food, index) => (
                    <p key={index}>{food}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
