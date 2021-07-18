import {
  CoCoSyncMessage,
  CocoResponse,
  ComponentProperty,
} from "../chat-window/types";

import { randomString } from "./randomString";

const apiKey = "master_key";
const url = "https://cocohub.ai";

export let sessionId = randomString(8);

export const resetSession = () => {
  sessionId = randomString(8);
  return sessionId;
};

export const sendMessage: (p: {
  message: string;
  channel_id?: string;
  newSessionId?: string;
  user_email?: string;
}) => Promise<CoCoSyncMessage[]> = async ({
  channel_id,
  message,
  newSessionId,
  user_email,
}) => {
  const headers = new Headers({ "api-key": apiKey });
  if (newSessionId) {
    sessionId = newSessionId;
  }
  try {
    const reply = await fetch(
      `https://cocohub.ai/v2/bot/channel/sync_exchange`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          message_id: randomString(8),
          created_at: new Date().toISOString(),
          author_id: user_email || sessionId,
          recipient: {
            channel_name: "cocohub",
            room_id: channel_id,
          },
          sender: {
            channel_name: "wordpress",
            room_id: sessionId,
          },
          payload: {
            text: message,
          },
        }),
      }
    );
    const json = await reply.json();
    return json;
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};

export const sendMessageComponent: (p: {
  message: string;
  inputParameters: ComponentProperty[];
  bot_name: string;
  componentIdOrUrl?: string;
  newSessionId?: string;
  source_language_code?: string;
  user_email?: string;
}) => Promise<CocoResponse> = async ({
  componentIdOrUrl,
  message,
  inputParameters,
  newSessionId,
  bot_name,
  source_language_code,
  user_email,
}) => {
  const headers = new Headers({ "api-key": apiKey });
  if (newSessionId) {
    sessionId = newSessionId;
  }
  try {
    const isUrl =
      componentIdOrUrl?.startsWith("http:") ||
      componentIdOrUrl?.startsWith("https:");
    const reply = await fetch(
      isUrl
        ? `${componentIdOrUrl}/${sessionId}`
        : url + `/api/exchange/${componentIdOrUrl}/${sessionId}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          source_language_code,
          user_input: message,
          flatten_context: true,
          context: {
            bot_name,
            owner: { email: user_email },
            ...inputParameters.reduce((acc, cur) => {
              // @ts-ignore
              acc[cur.name] = cur.value;
              return acc;
            }, {}),
          },
        }),
      }
    );
    const json = await reply.json();
    return json;
  } catch (e) {
    console.error(e);
    return { error: e };
  }
};
