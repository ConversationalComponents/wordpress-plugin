import { FabParams } from "../coco-chat-window/types";
import React from "react";

export const ChatFab: React.FC<
  FabParams & { isOpen: boolean; onClick: () => void; avatarUrl?: string }
> = ({
  fab_right = 0,
  fab_bottom = 0,
  is_fabless = false,
  is_window_on_left = false,
  is_open_on_start = false,
  isOpen,
  onClick,
  avatarUrl = "",
}) => {
  if (is_fabless) return null;
  return null;
};
