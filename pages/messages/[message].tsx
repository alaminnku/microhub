import { useUser } from "@context/User";
import { useRoomMessages } from "@utils/hooks";
import { useRouter } from "next/router";
import { useState, useEffect, FormEvent, useRef } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { io } from "socket.io-client";

import styles from "@styles/Message.module.css";
import BackButton from "@components/BackButton";
import clsx from "clsx";
import { dateToRelative } from "@utils/helpers/date";

const socket = io("https://microhubbackend.microhubltd.com.au/", {
  transports: ["websocket", "polling", "flashsocket"],
});

export default function MessagePage() {
  const router = useRouter();

  const roomId = router.query.message as string | undefined;

  const { user, isUserLoading } = useUser();

  const { messages, sendMessage, setMessages } = useRoomMessages(roomId);

  const [message, setMessage] = useState("");

  const scrollRef = useRef<HTMLLIElement>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView();
  };

  const handleMessageSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await sendMessage(message);
    setMessage("");
  };

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }

    socket.emit("join", roomId);

    socket.on("messages", (data) => {
      if (data) setMessages(data);
    });
  }, [isUserLoading, user, socket, roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className={styles.message}>
      <header className={styles.message__header}>
        <div className={styles.message__back}>
          <BackButton url="/messages" />
        </div>

        <h2 className={styles["message__title"]}>Message</h2>
      </header>

      {!isUserLoading && user && (
        <section className={styles.message__section}>
          <div className={styles["message__list-wrapper"]}>
            <ul className={styles.message__list}>
              {messages.map((message, index) => (
                <li
                  className={clsx(styles["message__list-item"], {
                    [styles.received]: user.role !== message.send_side,
                    [styles.sent]: user.role === message.send_side,
                  })}
                  key={message.id}
                >
                  <div>{message.message}</div>
                  <div className={styles["message__item-date"]}>{dateToRelative(new Date(message.createdAt))}</div>
                </li>
              ))}

              <li ref={scrollRef}></li>
            </ul>
          </div>

          <form onSubmit={handleMessageSend} className={styles.message__form} autoComplete="off">
            <input
              name="message"
              className={styles.message__input}
              type="text"
              placeholder="Type your message"
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

            <button className={styles.message__send}>
              <RiSendPlaneFill />
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
