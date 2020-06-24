import React, { useState, useEffect } from "react";
import { autorun } from "mobx";
import { BubbleParams } from "../types";
import { ChatBubbleParams } from "@conversationalcomponents/chat-window/types";
import { ChatBubble } from "@conversationalcomponents/chat-window";

export const CoCoBubble = (p: ChatBubbleParams) => {
  return (
    <ChatBubble
      {...{
        entry: p.entry,
      }}
    />
  );
};
