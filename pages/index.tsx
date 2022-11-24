import { useUser } from "@context/User";
import styles from "@styles/HomePage.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user && !user?.consumer && router.isReady) {
      router.push("/add-details");
    }
  }, [user, router.isReady]);

  return (
    <main className={styles.home_page}>
      <h1>Welcome to our application</h1>
    </main>
  );
}
