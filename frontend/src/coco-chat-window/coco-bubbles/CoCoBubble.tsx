import React, { useState, useEffect } from "react";
import { autorun } from "mobx";
import { BubbleParams } from "../types";
import { ChatBubbleParams } from "@conversationalcomponents/chat-window/types";
import { ChatBubble } from "@conversationalcomponents/chat-window";

export const CoCoBubble = (p: ChatBubbleParams) => {
  const [paramsOut, setParamsOut] = useState<BubbleParams[]>([]);

  useEffect(
    () =>
      autorun(() =>
        setParamsOut(
          !p.entry.isUser && !p.entry.isLoading && p.bubbleExtraParams
            ? [
                ...p.bubbleExtraParams.params.filter(
                  (param: BubbleParams) => param.messageId === p.entry.id
                )
              ]
            : []
        )
      ),
    []
  );
  return (
    <>
      <ChatBubble
        {...{
          entry: p.entry
        }}
      />
    </>
  );
};
