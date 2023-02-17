import io from "socket.io-client";
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
  const [receivedMessage, setReceivedMessage] = useState("");

  // Socket
  const socket = io("https://microhubbackend.microhubltd.com.au/api/v1");

  // Check user
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }

    // Join room
    socket.emit("joinRoom", "roomId");

    // Receive message
    socket.on("receiveMessage", (data) => setReceivedMessage(data.message));
  }, [isUserLoading, user, socket]);

  // Send message
  function handleSendMessage(e: FormEvent) {
    e.preventDefault();

    socket.emit("sendMessage", {
      message,
      room: "roomId",
      send_side: "consumer",
      consumerId: user?.consumer?.id,
      nutritionistId: "",
    });
  }

  return (
    <main className={styles.messages}>
      <h2>Messages</h2>

      {!isUserLoading && user && (
        <section>
          <div className={styles.texts}>
            {receivedMessage && (
              <p className={styles.client_message}>{receivedMessage}</p>
            )}

            {message && <p className={styles.my_message}>{message}</p>}
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
