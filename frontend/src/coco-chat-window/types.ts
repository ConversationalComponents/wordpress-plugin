export type CoCoChatWindowParams = {
  name: string;
  inputParameters?: {
    type: ComponentPropertyType;
    value: string | number | Date;
    name: string;
    description: string;
    id: string;
  }[];
  humanIdOrUrl: string;
  botGreeting?: string;
  isFabless?: boolean;
  height?: number;
  width?: number;
};

export type BubbleParams = {
  name: string;
  value: string;
  id: string;
  messageId: string;
};

export type CocoResponse = {
  action_name?: string;
  response: string;
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
