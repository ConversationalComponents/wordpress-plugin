import React, { useState } from "react";

import { ChatFab } from "./ChatFab";
import { ChatWindow } from "./ChatWindow";
import { CoCoChatWindowParams } from "../coco-chat-window/types";

export const ChatWindowContainer: React.FC<CoCoChatWindowParams> = (params) => {
  const { is_open_on_start, is_fabless } = params;

  const [isOpen, setIsOpen] = useState(is_open_on_start || is_fabless);

  const toggleIsOpen = () => setIsOpen((open) => !open);

  return (
    <>
      <ChatFab
        {...{
          ...params,
          isOpen: !isOpen,
          avatarUrl: "",
          onClick: toggleIsOpen,
        }}
      />
      <ChatWindow {...params} />
    </>
  );
};
