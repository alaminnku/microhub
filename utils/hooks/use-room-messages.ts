import { useCallback, useEffect, useMemo, useState } from "react";
import { IMessage } from "types";
import { axiosInstance } from "..";

export const useRoomMessages = (roomId: string | undefined) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const [messagesLoading, setMessagesLoading] = useState(false);

  const [sendingLoading, setSendingLoading] = useState(false);

  const sortedMessages = useMemo(() => {
    const filteredMessages = messages.filter((message) => Boolean(message.message));
    const sortedMessages = filteredMessages.sort(
      (prev, curr) => new Date(prev.createdAt).valueOf() - new Date(curr.createdAt).valueOf()
    );

    return sortedMessages;
  }, [messages]);

  const getMessages = useCallback(async () => {
    try {
      setMessagesLoading(true);
      const {
        data: {
          data: { messages },
        },
      } = await axiosInstance.get<{ data: { messages: IMessage[] } }>(`messages/${roomId}`);

      setMessages(messages);

      return messages;
    } finally {
      setMessagesLoading(false);
    }
  }, [roomId]);

  const sendMessage = useCallback(
    async (message: string) => {
      try {
        setSendingLoading(true);

        const { data } = await axiosInstance.post<{ data: { message: IMessage } }>(`messages/${roomId}`, { message });

        setMessages((messages) => [...messages, data.data.message]);

        getMessages();
      } finally {
        setSendingLoading(false);
      }
    },
    [roomId]
  );

  useEffect(() => {
    if (roomId) getMessages();
  }, [getMessages, roomId]);

  return { messages: sortedMessages, getMessages, sendMessage, messagesLoading, sendingLoading, setMessages };
};
