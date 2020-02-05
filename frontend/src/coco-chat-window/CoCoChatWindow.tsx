import React, { useState, useEffect } from "react";
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

export const CoCoChatWindow = (p: CoCoChatWindowParams) => {
  const [componentId, setComponentId] = useState(p.humanIdOrUrl);
  useEffect(() => setComponentId(p.humanIdOrUrl), [p.humanIdOrUrl]);

  const [inputParams, setInputParams] = useState(p.inputParameters || []);
  useEffect(() => setInputParams(p.inputParameters || []), [p.inputParameters]);

  const [componentName, setComponentName] = useState(p.name);
  useEffect(() => setComponentName(p.name), [p.name]);

  const [botGreeting, setBotGreeting] = useState(
    p.botGreeting || "Type anything to get started!"
  );
  useEffect(() => {
    setBotGreeting(p.botGreeting || "Type anything to get started!");
  }, [p.botGreeting]);

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
    console.log(`botGreeting is ${botGreeting}`);
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
    setBotGreeting(p.botGreeting || "");
  };

  const [onVoiceDown, onVoiceConfirm] = useVoiceRecorder(onChange, onSubmit);

  return (
    <>
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
      <ReplyDetailsDialog
        {...{ data: replyDetails, onClose: () => setReplyDetails(undefined) }}
      />
    </>
  );
};
