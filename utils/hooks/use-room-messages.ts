import { useAlert } from "@context/Alert";
import { AxiosError } from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IAxiosError, IMessage } from "types";
import { axiosInstance, showErrorAlert } from "..";

export const useRoomMessages = (roomId: string | undefined) => {
  const { setAlerts } = useAlert();

  const [messages, setMessages] = useState<IMessage[]>([]);

  const [messagesLoading, setMessagesLoading] = useState(false);

  const [sendingLoading, setSendingLoading] = useState(false);

  const sortedMessages = useMemo(() => {
    const sortedMessages = [...messages].sort(
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

      setMessages((oldMessages) => {
        if (oldMessages.length === messages.length) return oldMessages;
        return messages;
      });
    } catch (error) {
      showErrorAlert(error as AxiosError<IAxiosError>, setAlerts);
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
      } catch (error) {
        showErrorAlert(error as AxiosError<IAxiosError>, setAlerts);
      } finally {
        setSendingLoading(false);
      }
    },
    [roomId]
  );

  useEffect(() => {
    // if (roomId) getMessages();
    const interval = setInterval(() => {
      if (roomId) getMessages();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [getMessages, roomId]);

  return { messages: sortedMessages, getMessages, sendMessage, messagesLoading, sendingLoading, setMessages };
};
