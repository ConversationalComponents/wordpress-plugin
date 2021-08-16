import { ChatEntry, ChatParams, CoCoChatWindowParams } from "../types";
import React, { useEffect, useRef } from "react";
import { Typography, makeStyles } from "@material-ui/core";

import Loading from "../loading/Loading";

type ThemeParams = {
  isUser: boolean;
  isSelected: boolean;
  isInteractiveBubble: boolean;
  config: CoCoChatWindowParams;
};

const useBubbleStyles = makeStyles((theme) => {
  return {
    container: {
      animation: "$open 250ms linear",
      display: "flex",
      paddingBottom: theme.spacing(1),
      justifyContent: (p: ThemeParams) =>
        `${p.isUser ? "flex-end" : "flex-start"}`,
      marginRight: (p: ThemeParams) => (p.isUser ? "" : theme.spacing(5)),
      marginLeft: (p: ThemeParams) => (!p.isUser ? "" : theme.spacing(5)),
    },
    bubble: {
      padding: theme.spacing(1),
      cursor: (p: ThemeParams) => (p.isInteractiveBubble ? "pointer" : "arrow"),
      boxShadow: (p: ThemeParams) =>
        p.isSelected
          ? `0px 0px 0px 3px ${theme.custom.palette.a.secondary}`
          : "0 1px 2px 0 rgba(0, 0, 0, 0.15)",
      fontSize: "14px",
      minWidth: theme.spacing(5),
      display: "flex",
      boxSizing: "border-box",
      justifyContent: "center",
      position: "relative",
      wordBreak: "break-word",
      border: "0px solid white",
      backgroundColor: (p: ThemeParams) =>
        `${
          p.isUser
            ? p.config.palette?.userBubble || theme.custom.palette.d.alt
            : p.config.palette?.botBubble || theme.custom.palette.a.main
        }`,
      transformOrigin: (p: ThemeParams) =>
        `${p.isUser ? "bottom right" : "bottom left"}`,
      borderRadius: (p: ThemeParams) =>
        `${p.isUser ? "18px 18px 0px 18px" : "18px 18px 18px 0px"}`,
      color: (p: ThemeParams) =>
        `${
          p.isUser
            ? p.config.palette?.userBubbleFontColor ||
              theme.custom.palette.e.main
            : p.config.palette?.botBubbleFontColor ||
              theme.custom.palette.d.main
        }`,
      height: "fit-content",
      alignSelf: "flex-end",
      transition: `box-shadow 250ms linear`,
    },
    "@keyframes open": {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
  };
});

export const ChatBubble: React.FC<{
  config: CoCoChatWindowParams;
  params: ChatParams;
  entry: ChatEntry;
  onHover?: (entry: ChatEntry) => void;
  onUnhover?: (entry: ChatEntry) => void;
  onSelectToggle?: (entry: ChatEntry) => void;
}> = ({ params, config, entry, onHover, onUnhover, onSelectToggle }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isSelected =
    entry.id === params.hoverBubbleId || entry.id === params.selectedBubbleId;

  const classes = useBubbleStyles({
    isUser: entry.isOwn,
    isSelected,
    isInteractiveBubble: !!(onHover || onUnhover || onSelectToggle),
    config,
  });

  useEffect(() => {
    const c = ref.current;
    if (!c || params.chat.indexOf(entry) !== params.chat.length - 1) return;
    c.offsetParent && (c.offsetParent.scrollTop = c.offsetParent.scrollHeight);
  }, [ref, entry.isLoading, entry.text]);

  const mouseOn = () => {
    onHover && onHover(entry);
  };

  const mouseOff = () => {
    onUnhover && onUnhover(entry);
  };

  const onClick = () => {
    onSelectToggle && onSelectToggle(entry);
  };

  return (
    <div ref={ref} className={classes.container}>
      <div
        className={classes.bubble}
        onMouseOver={onHover && mouseOn}
        onMouseOut={onUnhover && mouseOff}
        onMouseLeave={onUnhover && mouseOff}
        onClick={onClick}
      >
        {entry.isLoading ? <Loading /> : <Typography>{entry.text}</Typography>}
      </div>
    </div>
  );
};
