import io from "socket.io-client";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import styles from "@styles/Messages.module.css";
import { RiSendPlaneFill } from "react-icons/ri";
import { FormEvent, useEffect } from "react";
import { useNitritionistList } from "@utils/hooks";
import Link from "next/link";
import BackButton from "@components/BackButton";

export default function MessagesPage() {
  const router = useRouter();

  const { user, isUserLoading } = useUser();

  const [nutritionistList] = useNitritionistList();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [isUserLoading, user]);

  return (
    <main className={styles["nutritionist"]}>
      <h2>Nutritionolists</h2>

      {!isUserLoading && user && (
        <ul className={styles["nutritionist-list"]}>
          {nutritionistList.map((nutritionist) => (
            <li key={nutritionist.id} className={styles["nutritionist-item"]}>
              <Link href={`/messages/${nutritionist.room}`}>
                <a className={styles["nutritionist-link"]}>
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
    </main>
  );
}
