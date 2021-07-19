import { ChatBody } from "../chat-window/ChatBody";
import { ChatControls } from "../chat-window/header/ChatControls";
import { CoCoChatWindowParams } from "../chat-window/types";
import { Footer } from "../chat-window/footer/Footer";
import { Header } from "../chat-window/header/Header";
import { PoweredBy } from "./PoweredBy";
import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { useCocoChat } from "../chat-window/hooks/useCocoChat";

type StyleParams = {
  width?: number;
  height?: number;
  fab_right?: number;
  fab_bottom?: number;
  is_window_on_left?: boolean;
};

const useStyles = makeStyles((theme) => {
  return {
    container: {
      boxShadow: theme.shadows[6],
      background: `${theme.custom.palette.gradient.main} !important`,
      borderRadius: theme.spacing(3),
      pointerEvents: "all",
      position: "absolute",
      transition: theme.transitions.create("all"),
      bottom: ({ fab_bottom = theme.spacing(2) }: StyleParams) =>
        `${fab_bottom}px  !important`,
      right: ({
        fab_right = theme.spacing(2),
        is_window_on_left,
      }: StyleParams) => (is_window_on_left ? `` : `${fab_right}px !important`),
      left: ({
        fab_right = theme.spacing(2),
        is_window_on_left,
      }: StyleParams) =>
        !is_window_on_left ? `` : `${fab_right}px !important`,
      overflow: "hidden",
      paddingBottom: `${theme.spacing(3)} !important`,
    },
    innerContainer: {
      display: "flex !important" as "flex",
      flexDirection: "column !important" as "column",
      overflow: "hidden",
      height: ({ height = 600 }: StyleParams) => `${height}px !important`,
      width: ({ width = 300 }: StyleParams) => `${width}px !important`,
      top: "0px",
      left: "0px",
    },
    open: {
      height: ({ height = 600 }: StyleParams) => `${height}px`,
      width: ({ width = 300 }: StyleParams) => `${width}px`,
      opacity: 1,
    },
    closed: {
      height: "0px",
      width: "0px",
      opacity: 0,
    },
  };
});

export const ChatWindow: React.FC<
  CoCoChatWindowParams & {
    close?: () => void;
    isOpen?: boolean;
    avatar: string;
    name: string;
  }
> = ({ close, isOpen = true, avatar, name, ...params }) => {
  const classes = useStyles(params);

  const onError = () => {};

  const { onSubmit, chat, reset, session_id, isDisabled, isFinished } =
    useCocoChat({
      ...params,
      onError,
    });

  return (
    <div
      className={clsx(classes.container, {
        [classes.open]: isOpen,
        [classes.closed]: !isOpen,
      })}
    >
      <div className={classes.innerContainer}>
        <Header {...{ name, avatar }}>
          <ChatControls {...{ reload: reset, close }} />
        </Header>
        <ChatBody
          {...{
            params: {
              chat,
            },
          }}
        />
        <Footer
          {...{
            convoEndMessage: "Conversation Completed",
            sessionId: session_id,
            disabled: isDisabled,
            onSubmit,
            result: { done: isFinished, success: true },
            reset,
            ...params,
          }}
        />
        <PoweredBy />
      </div>
    </div>
  );
};
