export type ChatParams = {
  ownAvatar?: string;
  otherAvatar?: string;
  greeting?: string;
  selectedBubbleId?: string;
  hoverBubbleId?: string;
  chat: ChatEntry[];
};

export type ChatEntry = {
  id: string;
  text: string;
  isOwn: boolean;
  isLoading: boolean;
  data?: any;
};

export declare type MessageContent = {
  text: string;
  image?: string | File;
  conversation_end?: boolean;
};

export declare type HeaderParams = {
  title: string;
  extraContent?: JSX.Element;
  height: number | string;
};

export declare type ChatBubbleParams = {
  isRtl?: boolean;
  entry: ChatEntry;
  endElement?: JSX.Element;
  bubbleExtraParams?: any;
};

export type FabParams = {
  fab_right?: number;
  fab_bottom?: number;
  is_fabless?: boolean;
  is_window_on_left?: boolean;
  is_open_on_start?: boolean;
};

export type Palette = {
  fabBackground?: string;
  windowBackground?: string;
  headerFontColor?: string;
  headerButtonsColor?: string;
  userBubble?: string;
  userBubbleFontColor?: string;
  botBubble?: string;
  botBubbleFontColor?: string;
  chatBackground?: string;
  footerBackground?: string;
  footerFontColor?: string;
  footerButton?: string;
};

export type ColorParams = {
  palette?: Palette;
};

export type CoCoChatWindowParams = ColorParams &
  FabParams & {
    bot_name: string;
    is_not_showing_last_component?: string;
    human_id_or_url?: string;
    channel_id: string;
    bot_greeting?: string;
    user_email?: string;
    source_language_code?: string;
    is_rtl?: boolean;
    height?: number;
    width?: number;
    input_parameters?: {
      type: ComponentPropertyType;
      value: string | number | Date;
      name: string;
      description: string;
      id: string;
    }[];
  };

export type BubbleParams = {
  name: string;
  value: string;
  id: string;
  messageId: string;
};

export type CocoResponse = {
  action_name?: string;
  response?: string;
  responses: MessageContent[];
  component_done: boolean;
  component_failed: boolean;
  updated_context: { [key: string]: any };
  confidence: number;
  idontknow: boolean;
  raw_resp: { [key: string]: any };
};

export type CoCoSyncMessage = {
  payload: MessageContent;
  created_at: string;
  author_id: string;
  sender: { channel_name: string; room_id: string };
  recipient: {
    channel_name: string;
    room_id: string;
  };
};

export type ComponentProperty = {
  type: ComponentPropertyType;
  value: string | number | Date;
  name: string;
  description: string;
  id: string;
};

enum ComponentPropertyType {
  "text" = "text",
  "number" = "number",
  "date" = "date",
}
