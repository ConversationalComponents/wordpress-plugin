import React, { useCallback, useEffect, useState } from "react";
import { resetSession, sessionId } from "../../utils/chatComm";

import { ChatEntry } from "../types";
import { uuid } from "../../utils/uuid";

export const useChat = (bot_greeting?: string) => {
  const [chat, setChat] = useState([] as ChatEntry[]);
  const [session_id, setSessionId] = useState(sessionId);

  const reset = useCallback(() => {
    setSessionId(resetSession());
    setChat([
      {
        id: uuid(),
        text: bot_greeting || "Type anything to get started",
        isOwn: false,
        isLoading: false,
        data: {},
      },
    ]);
  }, [chat]);

  const onUserSubmit = useCallback(
    (v: string) => {
      if (!v) {
        setChat((prev) => {
          const last = prev[prev.length - 1];
          if (!last || !last.isLoading) return prev;
          prev.pop();
          return [...prev];
        });
      } else if (!chat.length || !chat[chat.length - 1].isOwn) {
        setChat((prev) => [
          ...prev,
          {
            id: uuid(),
            text: v,
            isOwn: true,
            isLoading: false,
            data: {},
          },
        ]);
      } else {
        setChat((prev) => {
          prev[prev.length - 1].isLoading = false;
          prev[prev.length - 1].text = v;
          return [...prev];
        });
      }
    },
    [chat]
  );

  const onBotEntryStart = useCallback(
    (v?: string) => {
      if (!chat.length || chat[chat.length - 1].isOwn) {
        setChat((prev) => [
          ...prev,
          {
            id: uuid(),
            text: v || "",
            isOwn: false,
            isLoading: true,
            data: {},
          },
        ]);
      }
    },
    [chat]
  );

  const onBotEntryComplete = useCallback(
    (v: string = "", data: Object = {}) => {
      setChat((prev) => {
        if (
          !prev.length ||
          prev[prev.length - 1].isOwn ||
          !prev[prev.length - 1].isLoading
        ) {
          return [
            ...prev,
            {
              id: uuid(),
              text: v || "",
              isOwn: false,
              isLoading: false,
              data: { ...data },
            },
          ];
        } else {
          prev[prev.length - 1].isLoading = false;
          prev[prev.length - 1].text = v || "";
          prev[prev.length - 1].data = data;
          return [...prev];
        }
      });
    },
    [chat]
  );

  useEffect(() => {
    reset();
  }, []);

  return {
    chat,
    reset,
    onUserSubmit,
    onBotEntryStart,
    onBotEntryComplete,
    session_id,
  };
};
