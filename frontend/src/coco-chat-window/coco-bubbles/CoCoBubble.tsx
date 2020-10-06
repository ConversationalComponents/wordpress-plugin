import React from "react";
import { ChatBubbleParams } from "@conversationalcomponents/chat-window/types";
import { ChatBubble } from "@conversationalcomponents/chat-window";

export const CoCoBubble = (p: ChatBubbleParams) => {
  return (
    <ChatBubble
      {...{
        entry: p.entry,
        isRtl: p.isRtl,
      }}
    />
  );
};
