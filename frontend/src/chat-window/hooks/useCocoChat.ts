import React, { useEffect, useState } from "react";

import { CoCoChatWindowParams } from "../types";
import { useChat } from "./useChat";
import { useServerReply } from "./useServerReply";

export const useCocoChat = ({
  onError,
  ...params
}: CoCoChatWindowParams & { onError: (e: Error) => void }) => {
  const {
    chat,
    reset,
    onUserSubmit,
    onBotEntryStart,
    onBotEntryComplete,
    session_id,
  } = useChat(params.bot_greeting);

  const [isDisabled, setIsDisabled] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const { call } = useServerReply(params);

  useEffect(() => {
    if (!chat.length) return;
    const lastEntry = chat[chat.length - 1];
    if (!lastEntry.isOwn || !lastEntry.text) return;
    onBotEntryStart();
    setIsDisabled(true);
  }, [onBotEntryStart]);

  useEffect(() => {
    if (chat.length < 2) return;
    const lastEntry = chat[chat.length - 1];
    const lastUserEntry = chat[chat.length - 2];
    if (lastEntry.isOwn || !lastUserEntry.text || !lastEntry.isLoading) return;
    call(lastUserEntry.text)
      .then((r) => {
        r.responses.forEach((response) => {
          onBotEntryComplete(response.text || "", {});
          if (response.conversation_end) setIsFinished(true);
        });
        setIsDisabled(false);
      })
      .catch(onError);
  }, [onBotEntryComplete]);

  const localReset = () => {
    setIsDisabled(false);
    setIsFinished(false);
    reset();
  };

  return {
    onSubmit: onUserSubmit,
    chat,
    isDisabled,
    reset: localReset,
    session_id,
    isFinished,
  };
};
