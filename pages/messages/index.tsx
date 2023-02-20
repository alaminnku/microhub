import { useUser } from "@context/User";
import { useRouter } from "next/router";
import styles from "@styles/Messages.module.css";
import { useEffect } from "react";
import { useNitritionistList } from "@utils/hooks";
import Link from "next/link";

export default function MessagesPage() {
  const router = useRouter();

  const { user, isUserLoading } = useUser();

  const { nutritionistList, nutritionistLoading } = useNitritionistList();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [isUserLoading, user]);

  return (
    <main className={styles["nutritionist"]}>
      <h2>Messages</h2>

      <div className={styles["nutritionist__section"]}>
        {nutritionistList.length === 0 && !nutritionistLoading && (
          <h3 className={styles["nutritionist__empty"]}>
            We're Sorry! Messaging is only available to clients who are working
            with a Nutritionist on the MicroHUB Platform
          </h3>
        )}

        {!isUserLoading && user && (
          <ul className={styles["nutritionist__list"]}>
            {nutritionistList.map((nutritionist) => (
              <li
                key={nutritionist.id}
                className={styles["nutritionist__item"]}
              >
                <Link href={`/messages/${nutritionist.room}`}>
                  <a className={styles["nutritionist__link"]}>
                    <h3>
                      {nutritionist.first_name} {nutritionist.last_name}
                    </h3>

                    <p>{nutritionist.email}</p>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
