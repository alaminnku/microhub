import { useUser } from "@context/User";
import { useRouter } from "next/router";
import styles from "@styles/Messages.module.css";
import { RiSendPlaneFill } from "react-icons/ri";
import { FormEvent, useEffect, useState } from "react";

export default function MessagesPage() {
  // Hooks
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const [message, setMessage] = useState("");

  // Check user
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [isUserLoading, user]);

  async function handleSendMessage(e: FormEvent) {
    e.preventDefault();

    console.log(message);
  }

  return (
    <main className={styles.messages}>
      <h2>Messages</h2>

      {!isUserLoading && user && (
        <section>
          <div className={styles.texts}>
            <p className={styles.client_message}>Hello there</p>
            <p className={styles.my_message}>Hi, nice to meet you</p>
          </div>

          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
            />
            <RiSendPlaneFill onClick={handleSendMessage} />
          </form>
        </section>
      )}
    </main>
  );
}
