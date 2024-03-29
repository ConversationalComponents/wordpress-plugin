import React, { useState } from "react";

import { ChatFab } from "./ChatFab";
import { ChatWindow } from "./ChatWindow";
import { CoCoChatWindowParams } from "../chat-window/types";
import { useBotDetails } from "../chat-window/hooks/useBotDetails";

export const ChatWindowContainer: React.FC<CoCoChatWindowParams> = (params) => {
  const { is_open_on_start, is_fabless } = params;

  const [isOpen, setIsOpen] = useState(!!(is_open_on_start || is_fabless));

  const { avatar, name } = useBotDetails(params);

  const toggleIsOpen = () => setIsOpen((open) => !open);

  return (
    <div>
      {is_fabless ? null : (
        <ChatFab
          {...{
            ...params,
            isOpen: !isOpen,
            avatar,
            onClick: toggleIsOpen,
          }}
        />
      )}
      <ChatWindow
        {...{
          ...params,
          avatar,
          name,
          close: is_fabless ? undefined : toggleIsOpen,
          isOpen,
        }}
      />
    </div>
  );
};
