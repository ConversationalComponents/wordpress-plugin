import { randomString } from "./randomString";
import { ComponentProperty } from "../coco-chat-window/types";

const apiKey = "master_key";
const url = "https://marketplace.conversationalcomponents.com";

let sessionId = randomString(8);

export const resetSession = () => {
  sessionId = randomString(8);
};

export const sendMessage: (p: {
  componentIdOrUrl: string;
  message: string;
  inputParameters: ComponentProperty[];
  componentName: string;
  newSessionId?: string;
  source_language_code?: string;
  user_email?: string;
}) => Promise<any> = async ({
  componentIdOrUrl,
  message,
  inputParameters,
  newSessionId,
  componentName,
  source_language_code,
  user_email,
}) => {
  const headers = new Headers({ "api-key": apiKey });
  if (newSessionId) {
    sessionId = newSessionId;
  }
  try {
    const isUrl =
      componentIdOrUrl.startsWith("http:") ||
      componentIdOrUrl.startsWith("https:");
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
            bot_name: componentName,
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
