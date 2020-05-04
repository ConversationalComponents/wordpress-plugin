import { MessageContent } from "@conversationalcomponents/chat-window/types";

export type CoCoChatWindowParams = {
  name: string;
  is_not_showing_last_component?: string;
  human_id_or_url: string;
  bot_greeting?: string;
  is_fabless?: boolean;
  is_open_on_start?: boolean;
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
  responses: MessageContent[] | string;
  component_done: boolean;
  component_failed: boolean;
  updated_context: { [key: string]: any };
  confidence: number;
  idontknow: boolean;
  raw_resp: { [key: string]: any };
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
  "date" = "date"
}
