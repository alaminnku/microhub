import io from "socket.io-client";
import { useUser } from "@context/User";
import { useRouter } from "next/router";
import styles from "@styles/Messages.module.css";
import { RiSendPlaneFill } from "react-icons/ri";
import { FormEvent, useEffect, useMemo, useState } from "react";

const socket = io("https://microhubbackend.microhubltd.com.au/", {
  transports: ["websocket", "polling", "flashsocket"],
});

export default function MessagesPage() {
  // Hooks
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  // Socket

  // Check user
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }

    // Join room
    socket.emit("joinRoom", "asasdasdaffasf");

    // Receive message
    socket.on("messages", (data) => {
      console.log(data, "messages");
      setReceivedMessage(data.message);
    });
  }, [isUserLoading, user, socket]);

  // Send message
  function handleSendMessage(e: FormEvent) {
    e.preventDefault();

    console.log("message");

    socket.emit("sendMessage", {
      message,
      room: "asasdasdaffasf",
      send_side: "consumer",
      consumerId: user?.consumer?.id,
      nutritionistId: 3,
    });
  }

  return (
    <main className={styles.messages}>
      <h2>Messages</h2>

      {!isUserLoading && user && (
        <section>
          <div className={styles.texts}>
            {receivedMessage && <p className={styles.client_message}>{receivedMessage}</p>}

            {message && <p className={styles.my_message}>{message}</p>}
          </div>

          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
            />

            <RiSendPlaneFill onClick={handleSendMessage} style={{ cursor: "pointer", userSelect: "none" }} />
          </form>
        </section>
      )}
    </main>
  );
}
