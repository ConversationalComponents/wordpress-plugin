import {randomString} from "./randomString";
import {ComponentProperty} from "../coco-chat-window/types";

const apiKey = "master_key";
const url = "https://marketplace.conversationalcomponents.com";

let sessionId = randomString(8);

export const resetSession = () => {
    sessionId = randomString(8);
};

export const sendMessage = async (
    componentIdOrUrl: string,
    message: string,
    inputParameters: ComponentProperty[],
    newSessionId?: string
) => {
    const headers = new Headers({"api-key": apiKey});
    if (newSessionId) {
        sessionId = newSessionId;
    }
    try {
        const isUrl = componentIdOrUrl.startsWith("http:") || componentIdOrUrl.startsWith("https:");
        const reply = await fetch(
            isUrl ? `${componentIdOrUrl}/${sessionId}` : url + `/api/exchange/${componentIdOrUrl}/${sessionId}`,
            {
                method: "POST",
                headers,
                body: JSON.stringify({
                    user_input: message,
                    flatten_context: true,
                    context: inputParameters.reduce((acc, cur) => {
                        // @ts-ignore
                        acc[cur.name] = cur.value;
                        return acc;
                    }, {})
                })
            }
        );
        const json = await reply.json();
        return json;
    } catch (e) {
        console.error(e);
        return {error: e};
    }
};
