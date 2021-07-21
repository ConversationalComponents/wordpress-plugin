import { CoCoSyncMessage, CocoResponse } from "../types";
import { sendMessage, sendMessageComponent } from "../../utils/chatComm";

import { useCallback } from "react";

type RequestParams = {
  bot_name: string;
  channel_id?: string;
  human_id_or_url?: string;
  source_language_code?: string;
  user_email?: string;
  userInput: string;
};

const request = async ({
  bot_name,
  channel_id,
  human_id_or_url,
  source_language_code,
  user_email,
  userInput,
}: RequestParams) => {
  if (human_id_or_url) {
    const r: CocoResponse = await sendMessageComponent({
      message: userInput,
      inputParameters: [],
      bot_name,
      componentIdOrUrl: human_id_or_url,
      source_language_code: source_language_code || "",
      user_email: user_email || "",
    });
    return r;
  } else {
    const r: CoCoSyncMessage[] = await sendMessage({
      channel_id: channel_id || "",
      message: userInput,
      user_email: user_email || "",
    });

    return {
      responses: r.map((message) => message.payload),
      component_done: false,
      component_failed: false,
      confidence: 1.0,
      updated_context: {},
      raw_resp: {},
      idontknow: false,
    };
  }
};

export type ServerReplyParams = {
  channel_id: string;
  bot_name: string;
  human_id_or_url?: string;
  source_language_code?: string;
  user_email?: string;
};

export const useServerReply = ({
  channel_id,
  bot_name,
  human_id_or_url,
  source_language_code,
  user_email,
}: ServerReplyParams) => {
  const call = useCallback(async (userInput: string) => {
    return await request({
      userInput,
      bot_name,
      channel_id,
      human_id_or_url,
      source_language_code,
      user_email,
    });
  }, []);

  return { call } as const;
};
