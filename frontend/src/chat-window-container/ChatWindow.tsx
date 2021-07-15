import { ChatBody } from "../chat-window/ChatBody";
import { ChatControls } from "../chat-window/header/ChatControls";
import { CoCoChatWindowParams } from "../coco-chat-window/types";
import { Footer } from "../chat-window/footer/Footer";
import { Header } from "../chat-window/header/Header";
import React from "react";
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
      background: theme.custom.palette.gradient.main,
      borderRadius: theme.spacing(3),
      pointerEvents: "all",
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      bottom: ({ fab_bottom = theme.spacing(2) }: StyleParams) =>
        `${fab_bottom}px`,
      right: ({
        fab_right = theme.spacing(2),
        is_window_on_left,
      }: StyleParams) => (is_window_on_left ? `` : `${fab_right}px`),
      height: ({ height = 600 }: StyleParams) => height,
      width: ({ width = 300 }: StyleParams) => width,
      overflow: "hidden",
    },
  };
});

export const ChatWindow: React.FC<CoCoChatWindowParams> = (params) => {
  const classes = useStyles(params);

  const onError = () => {};

  const { onSubmit, chat, reset, session_id, isDisabled, isFinished } =
    useCocoChat({
      ...params,
      onError,
    });

  return (
    <div className={classes.container}>
      <ChatControls {...{ reload: reset }} />
      <Header {...{ name: params.bot_name }} />
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
        }}
      />
    </div>
  );
};
