import { useUser } from "@context/User";
import { useNitritionistList } from "@utils/hooks";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { io } from "socket.io-client";

import styles from "@styles/Message.module.css";

const socket = io("https://microhubbackend.microhubltd.com.au/", {
  transports: ["websocket", "polling", "flashsocket"],
});

export default function MessagePage() {
  const router = useRouter();

  const roomId = router.query.message as string;

  const { user, isUserLoading } = useUser();
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

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
    <main className={styles.message}>
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
