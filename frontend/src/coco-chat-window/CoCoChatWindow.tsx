import React, { useState, useEffect, useRef, useCallback } from "react";
import { BubbleParams, CoCoChatWindowParams } from "./types";
import { observable, autorun } from "mobx";
import { CoCoBubble } from "./coco-bubbles/CoCoBubble";
import { uuid } from "../utils/uuid";
import { ReplyDetailsDialog } from "./ReplyDetailsDialog";
import { useServerReply } from "./hooks/useServerReply";
import { resetSession } from "../utils/chatComm";
import {
  ChatWindow,
  useUserTyping,
  useBotTyping
} from "@conversationalcomponents/chat-window";
import { ChatEntry } from "@conversationalcomponents/chat-window/types";
import { Fab, makeStyles, Theme, useTheme } from "@material-ui/core";
import { ChatIcon } from "./ChatIcon";

import { isMobile } from "react-device-detect";
import { useFooter } from "./hooks/useFooter";
import { useHeader } from "./hooks/useHeader";

const useStyles = makeStyles((theme: Theme) => ({
  chatFabMobile: {
    position: "fixed",
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    zIndex: 10
  },
  chatFab: {
    position: "fixed",
    right: theme.spacing(5),
    bottom: theme.spacing(8),
    zIndex: 10,
    scale: isMobile ? 1 : 1.4
  },
  chatWindowOpen: {
    height: "100%",
    transition: "all 0.3s",
    overflow: "hidden",
    boxShadow: "0 0 5px 2px rgba(0,0,0,0.3)",
    borderRadius: "10px",
    zIndex: 9999
  },
  chatWindowClosed: {
    height: "0%",
    transition: "all 0.3s",
    overflow: "hidden"
  }
}));

const defaultHeight = 500;
const defaultWidth = 300;

export const CoCoChatWindow = (p: CoCoChatWindowParams) => {
  const classes = useStyles();
  const theme = useTheme();

  const [height] = useState(
    isMobile ? window.innerHeight : `${p.height || defaultHeight}px`
  );

  const [width] = useState(
    isMobile ? window.innerWidth : `${p.width || defaultWidth}px`
  );

  const [componentId, setComponentId] = useState(p.human_id_or_url);
  const [inputParams, setInputParams] = useState(p.input_parameters || []);
  const [componentName, setComponentName] = useState(p.name);

  const [botGreeting, setBotGreeting] = useState(
    p.bot_greeting || "Type anything to get started!"
  );

  const [is_showing_last_component, setIs_showing_last_component] = useState(
    !p.is_not_showing_last_component ||
      p.is_not_showing_last_component === "false"
  );

  useEffect(
    () =>
      setIs_showing_last_component(
        !p.is_not_showing_last_component ||
          p.is_not_showing_last_component === "false"
      ),
    [p.is_not_showing_last_component]
  );
  useEffect(() => setComponentId(p.human_id_or_url), [p.human_id_or_url]);
  useEffect(() => setInputParams(p.input_parameters || []), [
    p.input_parameters
  ]);
  useEffect(() => setComponentName(p.name), [p.name]);

  useEffect(() => {
    setBotGreeting(p.bot_greeting || "Type anything to get started!");
  }, [p.bot_greeting]);

  const [content, setContent] = useState<ChatEntry[]>([]);
  const [lastInputValue, setLastInputValue] = useState("");
  const [lastUnsubmittedInput, setLastUnsubmittedInput] = useState("");
  const [isFailed, setisFailed] = useState(false);
  const [isSucceeded, setisSucceeded] = useState(false);
  const [lastBotMessage, setLastBotMessage] = useState("");
  const [lastResultData, setLastResultData] = useState<any>({});
  const [replyDetails, setReplyDetails] = useState<Object | undefined>(
    undefined
  );
  useUserTyping(content, setContent, lastUnsubmittedInput, lastInputValue);

  const isBotDoneTyping = useBotTyping(
    content,
    setContent,
    lastInputValue || botGreeting
  );

  const [serverReply, setServerReply] = useServerReply(
    componentId,
    inputParams || [],
    lastInputValue
  );

  useEffect(() => {
    if (botGreeting && isBotDoneTyping) {
      setServerReply({
        action_name: "greeting",
        response: botGreeting,
        component_done: false,
        component_failed: false,
        updated_context: {},
        confidence: 1,
        idontknow: false,
        raw_resp: {}
      });
    }
  }, [botGreeting, isBotDoneTyping]);

  useEffect(() => {
    if (isBotDoneTyping && serverReply) {
      setBotGreeting("");
      setLastBotMessage(serverReply.response);
      setisFailed(serverReply.component_failed);
      setisSucceeded(serverReply.component_done);
      setLastResultData({ ...serverReply });
      setLastInputValue("");
      setServerReply(undefined);
    }
  }, [serverReply, isBotDoneTyping]);

  useEffect(() => {
    if (!lastBotMessage) return;
    const lastEntry = content.length ? content[content.length - 1] : undefined;

    if (!lastEntry || lastEntry.isUser || !lastEntry.isLoading) return;

    lastEntry.isLoading = false;
    lastEntry.message = lastBotMessage;
    const lastContext = lastResultData.updated_context || {};
    is_showing_last_component &&
      (chatState.vp3_last_handler_called =
        lastResultData.vp3_last_handler_called || "");

    chatState.params = [
      ...chatState.params,
      ...Object.keys(lastContext).reduce((acc, cur) => {
        acc.push({
          name: cur,
          value: lastContext[cur],
          id: uuid(),
          messageId: lastEntry.id
        });
        return acc;
      }, [] as BubbleParams[])
    ];

    chatState.rawRepliesData.push({
      messageId: lastEntry.id,
      data: lastResultData
    });
  }, [lastBotMessage, content, lastResultData, is_showing_last_component]);

  const showDetails = (id: string) => {
    const entry = chatState.rawRepliesData.find(rrd => rrd.messageId === id);
    if (!entry) return;
    setReplyDetails(entry.data);
  };

  const [chatState] = useState(
    observable({
      params: [] as BubbleParams[],
      rawRepliesData: [] as { messageId: string; data: Object }[],
      showDetails,
      vp3_last_handler_called: ""
    })
  );

  const onSubmit = (value: string) => {
    setLastBotMessage("");
    setLastInputValue(value);
    setLastUnsubmittedInput("");
  };

  const onChange = (value: string) => {
    setLastUnsubmittedInput(value);
  };

  const onReset = () => {
    setContent([]);
    resetSession();
    setisFailed(false);
    setisSucceeded(false);
    setLastBotMessage("");
    setLastInputValue("");
    setLastUnsubmittedInput("");
    setBotGreeting(p.bot_greeting || "");
  };

  const [isChatOpen, setIsChatOpen] = useState(
    Boolean(p.is_fabless || !isMobile)
  );
  const [isShowFab, setIsShowFab] = useState(
    p.is_fabless ? false : !isChatOpen
  );

  const toggleChat = useCallback((): void => {
    setIsChatOpen(!isChatOpen);
  }, [isChatOpen]);

  useEffect(() => setIsShowFab(p.is_fabless ? false : !isChatOpen), [
    isChatOpen
  ]);

  const fabRef = useRef<HTMLButtonElement | null>(null);

  const footer = useFooter({
    isFailed,
    onChange,
    isSucceeded,
    onReset,
    onSubmit,
    disabled: !isBotDoneTyping
  });

  const header = useHeader({
    title: componentName,
    state: chatState,
    closeChat: toggleChat
  });

  return (
    <>
      <div
        className={
          isChatOpen ? classes.chatWindowOpen : classes.chatWindowClosed
        }
        style={{
          position: fabRef.current ? "fixed" : "relative",
          bottom: isMobile ? 0 : theme.spacing(8),
          right: isMobile ? 0 : theme.spacing(5),
          height: isChatOpen ? height : "0px",
          width: isChatOpen ? width : "0px",
          transition: "all 0.3s",
          overflow: "hidden"
        }}
      >
        <ChatWindow
          {...{
            title: componentName,
            header,
            bubbleExtraParams: chatState,
            bubble: CoCoBubble,
            content,
            footer
          }}
        />
      </div>
      <ReplyDetailsDialog
        {...{ data: replyDetails, onClose: () => setReplyDetails(undefined) }}
      />
      {p.is_fabless ? null : (
        <Fab
          ref={fabRef}
          color={!isChatOpen ? "primary" : "default"}
          className={isMobile ? classes.chatFabMobile : classes.chatFab}
          onClick={toggleChat}
          style={{ display: isShowFab ? "flex" : "none" }}
        >
          <ChatIcon />
        </Fab>
      )}
    </>
  );
};
