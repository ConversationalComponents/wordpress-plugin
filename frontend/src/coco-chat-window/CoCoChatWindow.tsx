import { BubbleParams, CoCoChatWindowParams } from "./types";
import {
  Button,
  Fab,
  Theme,
  Typography,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import {
  ChatEntry,
  MessageContent,
} from "@conversationalcomponents/chat-window/types";
import {
  ChatWindow,
  useBotTyping,
  useUserTyping,
} from "@conversationalcomponents/chat-window";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { isMobile, isTablet } from "react-device-detect";

import { ChatIcon } from "./ChatIcon";
import { CoCoBubble } from "./coco-bubbles/CoCoBubble";
import { CoCoHeader } from "./header/CoCoHeader";
import { FooterStateful } from "./footer/FooterStateful";
import { ReplyDetailsDialog } from "./ReplyDetailsDialog";
import { observable } from "mobx";
import { resetSession } from "../utils/chatComm";
import { useServerReply } from "./hooks/useServerReply";
import { uuid } from "../utils/uuid";

const useStyles = makeStyles((theme: Theme) => ({
  chatFab: {
    position: "fixed",
    right: isMobile ? theme.spacing(2) : theme.spacing(5),
    bottom: isMobile ? theme.spacing(2) : theme.spacing(6),
    zIndex: 10,
    fontSize: "24px",
    transform: isMobile ? "scale(1)" : "scale(1.5)",
  },

  chatWindowOpen: {
    height: "100%",
    transition: "all 0.3s",
    overflow: "hidden",
    boxShadow: "0 0 5px 2px rgba(0,0,0,0.3)",
    borderRadius: "10px",
    zIndex: 9999,
  },

  chatWindowClosed: {
    height: "0%",
    transition: "all 0.3s",
    overflow: "hidden",
  },
}));

export const CoCoChatWindow: React.FC<CoCoChatWindowParams> = ({
  fab_right,
  fab_bottom,
  is_window_on_left = false,
  is_rtl,
  user_email = "",
  human_id_or_url: componentId = "coco_bot_vp3",
  input_parameters: inputParams = [],
  bot_name: componentName = "CoCoHub Demo Bot",
  is_open_on_start,
  is_fabless,
  source_language_code,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();

  // deafult settings
  const [height, setHeight] = useState<string>(
    isMobile && !is_fabless
      ? `${window.innerHeight}px`
      : `${rest.height ? rest.height : 500}px`
  );
  const [width, setWidth] = useState<string>(
    isMobile ? "100%" : `${rest.width ? rest.width : 300}px`
  );

  const [botGreeting, setBotGreeting] = useState<MessageContent | null>(
    { text: rest.bot_greeting as string, image: "" } || {
      text: "Type anything to get started!",
      image: "",
    }
  );
  // deafult settings

  const [content, setContent] = useState<ChatEntry[]>([]);
  const [isAwaitingReply, setIsAwaitingReply] = useState(false);
  const [isLastError, setIsLastError] = useState(false);
  const [lastInputValue, setLastInputValue] = useState<
    MessageContent[] | string
  >();
  const [lastUnsubmittedInput, setLastUnsubmittedInput] = useState("");
  const [lastBotMessage, setLastBotMessage] = useState<
    MessageContent[] | string
  >();
  const [lastResultData, setLastResultData] = useState<any>({});
  const [replyDetails, setReplyDetails] = useState<Object | undefined>(
    undefined
  );
  const [headerHeight, setHeaderHeight] = useState<number>(56);
  const [windowYPosition, setWindowYPosition] = useState<number>();
  const [windowHeight, setWindowHeight] = useState<number>();

  const [isChatOpen, setIsChatOpen] = useState(
    Boolean(is_fabless || (!isMobile && is_open_on_start))
  );
  const [isShowFab, setIsShowFab] = useState(is_fabless ? false : !isChatOpen);
  const [is_showing_last_component, setIs_showing_last_component] = useState(
    !rest.is_not_showing_last_component ||
      rest.is_not_showing_last_component === "false"
  );

  const fabRef = useRef<HTMLButtonElement | null>(null);

  const showDetails = (id: string) => {
    const entry = chatState.rawRepliesData.find((rrd) => rrd.messageId === id);
    if (!entry) return;
    setReplyDetails(entry.data);
  };

  // toggle chat - toggler is disabled when "hiding fab" feature is active
  const toggleChat = useCallback((): void => {
    if (!is_fabless) {
      setIsChatOpen(!isChatOpen);
      if (isMobile) {
        /* on mobile -       
        on open  -  when chat opens window will scroll to the bottom of the page to get window.innerHeight correct and will lock body scroll
        on close -  will return to the same place it was opened and will release all body scroll locks
        */
        if (!isChatOpen) {
          setWindowYPosition(window.pageYOffset);
          window.scrollTo(0, document.body.clientHeight);
        } else {
          clearAllBodyScrollLocks();
          window.scrollTo(0, windowYPosition as number);
        }
      }
    }
  }, [isChatOpen]);

  // get current window height
  const getCurrentWindowHeight = () => {
    return window.innerHeight;
  };

  const [chatState] = useState(
    observable({
      params: [] as BubbleParams[],
      rawRepliesData: [] as { messageId: string; data: Object }[],
      showDetails,
      vp3_last_handler_called: "",
    })
  );

  // did mount
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    // set default height for tablet size
    if (isTablet) {
      setHeight("400px");
      setWidth("250px");
    }
  }, []);

  ///// ***** /////

  useEffect(
    () =>
      setIs_showing_last_component(
        !rest.is_not_showing_last_component ||
          rest.is_not_showing_last_component === "false"
      ),
    [rest.is_not_showing_last_component]
  );

  useEffect(() => setIsShowFab(is_fabless ? false : !isChatOpen), [isChatOpen]);

  useUserTyping(
    content,
    setContent,
    lastUnsubmittedInput as MessageContent[] | string,
    lastInputValue as MessageContent[]
  );

  const isBotDoneTyping = useBotTyping(
    content,
    setContent,
    (lastInputValue as MessageContent[]) || botGreeting
  );

  const [serverReply, setServerReply, resend] = useServerReply(
    componentId,
    inputParams || [],
    lastInputValue as string,
    componentName,
    source_language_code,
    user_email
  );

  useEffect(() => {
    setIsAwaitingReply(false);
  }, [serverReply]);

  useEffect(() => {
    if (botGreeting && isBotDoneTyping) {
      setServerReply({
        action_name: "greeting",
        response: botGreeting.text as string,
        component_done: false,
        responses: [botGreeting],
        component_failed: false,
        updated_context: {},
        confidence: 1,
        idontknow: false,
        raw_resp: {},
      });
    }
  }, [botGreeting, isBotDoneTyping]);

  useEffect(() => {
    if (isBotDoneTyping && serverReply) {
      setBotGreeting(null);

      // @ts-ignore
      const isError = !!serverReply.error;

      setIsLastError(isError);
      if (isError) return;

      setLastBotMessage(serverReply.responses || " ");
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
    lastEntry.message = lastBotMessage as string;
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
          messageId: lastEntry.id,
        });
        return acc;
      }, [] as BubbleParams[]),
    ];
    chatState.rawRepliesData.push({
      messageId: lastEntry.id,
      data: lastResultData,
    });
  }, [lastBotMessage, content, lastResultData, is_showing_last_component]);

  ///// ******* ///////

  // on submit handler
  const onSubmit = (value: string) => {
    if (value && !value.match(/^\s*$/)) {
      setLastInputValue(value);
      setIsAwaitingReply(true);
    }
    setLastBotMessage("");
    setLastUnsubmittedInput("");
  };

  // on change handler
  const onChange = (value: string) => {
    setLastUnsubmittedInput(value);
  };

  // on reset handler
  const onReset = () => {
    setContent([]);
    resetSession();
    setLastBotMessage("");
    setLastInputValue("");
    setLastUnsubmittedInput("");
  };

  const chatBody = document.getElementById(
    "coco_chat_window_body"
  ) as HTMLElement;
  const textarea = document.getElementById(
    "coco_chat_window_textarea"
  ) as HTMLElement;

  // on focus handler
  const onFocus = () => {
    if (isMobile && !isTablet && !is_fabless) {
      setHeaderHeight(() => 40);
      disableBodyScroll(chatBody);
      disableBodyScroll(textarea);
      setTimeout(() => {
        setHeight(() => `${getCurrentWindowHeight()}px`);
      }, 300);
    }
  };

  // on blur handler
  const onBlur = () => {
    if (isMobile && !isTablet && !is_fabless) {
      setHeight(`${windowHeight}px`);
      setTimeout(() => {
        setHeaderHeight(() => 56);
      }, 350);
    }
  };

  const footer = !isLastError ? (
    <FooterStateful
      {...{
        onChange,
        onReset,
        onSubmit,
        onFocus,
        onBlur,
        disabled: !isBotDoneTyping || isAwaitingReply,
        isRtl: !!is_rtl,
      }}
    />
  ) : (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Typography align="center" variant="caption">
        could not reach bot
      </Typography>
      <Button fullWidth variant="contained" onClick={resend}>
        click to resend
      </Button>
    </div>
  );

  const header = (
    <CoCoHeader
      {...{
        title: componentName,
        state: chatState,
        height: headerHeight,
        closeChat: toggleChat,
        isFabless: !!is_fabless,
        isRtl: !!is_rtl,
      }}
    />
  );

  // is_window_on_left

  const posStyle = is_window_on_left
    ? {
        left: isMobile && !isTablet ? 0 : theme.spacing(5),
      }
    : {
        right: isMobile && !isTablet ? 0 : theme.spacing(5),
      };

  const baseStyle = {
    transition: "all 0.3s",
    maxHeight: windowHeight,
    overflow: "hidden",
    bottom: isMobile && !isTablet ? 0 : theme.spacing(6),
    ...posStyle,
  };

  const fabStylePos = is_window_on_left
    ? {
        left:
          !isMobile && typeof fab_right !== "undefined"
            ? `${fab_right}px`
            : "0px",
      }
    : {
        right:
          !isMobile && typeof fab_right !== "undefined"
            ? `${fab_right}px`
            : "0px",
      };

  const fabStyle = {
    position: "fixed",
    display: isShowFab ? "flex" : "none",
    bottom:
      !isMobile && typeof fab_bottom !== "undefined" ? `${fab_bottom}px` : "",
    ...fabStylePos,
  } as React.CSSProperties;

  return (
    <>
      <div
        className={
          isChatOpen ? classes.chatWindowOpen : classes.chatWindowClosed
        }
        style={
          !is_fabless
            ? {
                // style with Fab
                position: "fixed",
                height: isChatOpen ? height : "0px",
                width: isChatOpen ? width : "0px",
                ...baseStyle,
              }
            : {
                // style without Fab
                position: isMobile ? "relative" : "fixed",
                height: height,
                width: width,
                ...baseStyle,
              }
        }
      >
        <ChatWindow
          {...{
            title: componentName,
            header: header,
            bubbleExtraParams: chatState,
            bubble: CoCoBubble,
            content,
            footer,
            isRtl: !!is_rtl,
          }}
        />
      </div>
      <ReplyDetailsDialog
        {...{ data: replyDetails, onClose: () => setReplyDetails(undefined) }}
      />
      {is_fabless ? null : (
        <Fab
          ref={fabRef}
          color={!isChatOpen ? "primary" : "default"}
          className={classes.chatFab}
          onClick={toggleChat}
          style={fabStyle}
        >
          <ChatIcon />
        </Fab>
      )}
    </>
  );
};
