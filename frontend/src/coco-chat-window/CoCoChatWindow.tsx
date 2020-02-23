import React, { useState, useEffect, useRef } from "react";
import { BubbleParams, CoCoChatWindowParams } from "./types";
import { FooterStateful } from "./footer/FooterStateful";
import { observable, autorun } from "mobx";
import { CoCoBubble } from "./coco-bubbles/CoCoBubble";
import { uuid } from "../utils/uuid";
import { ReplyDetailsDialog } from "./ReplyDetailsDialog";
import { useServerReply } from "./hooks/useServerReply";
import { useVoiceRecorder } from "./hooks/useVoiceRecorder";
import { useVoiceNarrator } from "./hooks/useVoiceNarrator";
import { resetSession } from "../utils/chatComm";
import {
  ChatWindow,
  useUserTyping,
  useBotTyping
} from "@conversationalcomponents/chat-window";
import { ChatEntry } from "@conversationalcomponents/chat-window/types";
import { CoCoHeader } from "./header/CoCoHeader";
import { Fab, makeStyles, Theme } from "@material-ui/core";
import { ChatIcon } from "./ChatIcon";

const useStyles = makeStyles((theme: Theme) => ({
  chatFab: {
    position: "fixed",
    right: theme.spacing(1),
    bottom: theme.spacing(1),
    zIndex: 10
  },
  chatWindowOpen: {
    height: "100%",
    transition: "all 0.3s",
    overflow: "hidden"
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

  const height = `${p.height || defaultHeight}px`;
  const width = `${p.width || defaultWidth}px`;

  console.log(`humanIdOrUrl: ${p.human_id_or_url}`);
  const [componentId, setComponentId] = useState(p.human_id_or_url);
  useEffect(() => setComponentId(p.human_id_or_url), [p.human_id_or_url]);

  console.log(`inputParameters: ${p.input_parameters}`);
  const [inputParams, setInputParams] = useState(p.input_parameters || []);
  useEffect(() => setInputParams(p.input_parameters || []), [p.input_parameters]);
  console.log(`name: ${p.name}`);

  const [componentName, setComponentName] = useState(p.name);
  useEffect(() => setComponentName(p.name), [p.name]);

  console.log(`botGreeting: ${p.bot_greeting}`);
  const [botGreeting, setBotGreeting] = useState(
    p.bot_greeting || "Type anything to get started!"
  );
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
  }, [lastBotMessage, content, lastResultData]);

  const showDetails = (id: string) => {
    const entry = chatState.rawRepliesData.find(rrd => rrd.messageId === id);
    if (!entry) return;
    setReplyDetails(entry.data);
  };

  const [chatState] = useState(
    observable({
      isShowingJson: true,
      isVoice: false,
      params: [] as BubbleParams[],
      rawRepliesData: [] as { messageId: string; data: Object }[],
      showDetails
    })
  );

  const [isVoice, setIsVoice] = useState(chatState.isVoice);
  useEffect(
    () =>
      autorun(() => {
        chatState.isVoice &&
          navigator.mediaDevices.getUserMedia({ audio: true });
        setIsVoice(chatState.isVoice);
      }),
    []
  );

  useVoiceNarrator(lastBotMessage, isVoice);

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

  const [onVoiceDown, onVoiceConfirm] = useVoiceRecorder(onChange, onSubmit);
  const [isChatOpen, setIsChatOpen] = useState(p.is_fabless);
  const fabRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <div
        className={
          isChatOpen ? classes.chatWindowOpen : classes.chatWindowClosed
        }
        style={
          fabRef.current
            ? {
                position: fabRef.current ? "fixed" : "relative",
                bottom: fabRef.current.clientTop + fabRef.current.clientHeight,
                right: fabRef.current.clientLeft + fabRef.current.clientWidth,
                height: isChatOpen ? height : "0px",
                width: isChatOpen ? width : "0px",
                transition: "all 0.3s",
                overflow: "hidden"
              }
            : {}
        }
      >
        <ChatWindow
          {...{
            title: componentName,
            header: (
              <CoCoHeader
                {...{
                  title: componentName,
                  state: chatState
                }}
              />
            ),
            bubbleExtraParams: chatState,
            bubble: CoCoBubble,
            content,
            footer: (
              <FooterStateful
                {...{
                  onVoiceDown,
                  onVoiceConfirm,
                  isFailed,
                  onChange,
                  isSucceeded,
                  onReset,
                  onSubmit,
                  state: chatState,
                  disabled: !isBotDoneTyping
                }}
              />
            )
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
          className={classes.chatFab}
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <ChatIcon />
        </Fab>
      )}
    </>
  );
};
