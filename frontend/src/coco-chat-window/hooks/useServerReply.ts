import { CocoResponse, ComponentProperty } from "../types";
import React, { useEffect, useState } from "react";

import { sendMessage, sendMessageComponent } from "../../utils/chatComm";

const request = async (
  inputParams: ComponentProperty[],
  userInput: string,
  setServerReply: (reply: CocoResponse) => void,
  componentName: string,
  channel_id?: string,
  humanIdOrUrl?: string,
  source_language_code?: string,
  user_email?: string
) => {
  if (humanIdOrUrl) {
    const r: CocoResponse = await sendMessageComponent({
      componentIdOrUrl: humanIdOrUrl,
      message: userInput,
      componentName,
      inputParameters: inputParams && inputParams.length > 0 ? inputParams : [],
      source_language_code,
      user_email,
    });
  } else {
    const r: CocoResponse = await sendMessage({
      channel_id: channel_id,
      message: userInput,
      componentName,
      user_email,
    });
  }

  setServerReply(r);
};

export const useServerReply = (
  channel_id: string,
  inputParams: ComponentProperty[],
  userInput: string,
  componentName: string,
  humanIdOrUrl?: string,
  source_language_code?: string,
  user_email?: string
): [
  CocoResponse | undefined,
  React.Dispatch<React.SetStateAction<CocoResponse | undefined>>,
  () => void
] => {
  const [serverReply, setServerReply] = useState<CocoResponse>();

  const resend = () => {
    request(
      inputParams,
      userInput,
      setServerReply,
      componentName,
      channel_id,
      humanIdOrUrl,
      source_language_code,
      user_email
    );
  };

  useEffect(() => {
    if (!userInput) {
      setServerReply(undefined);
      return;
    }
    request(
      inputParams,
      userInput,
      setServerReply,
      componentName,
      channel_id,
      humanIdOrUrl,
      source_language_code,
      user_email
    );
  }, [channel_id, userInput]);

  return [serverReply, setServerReply, resend];
};
