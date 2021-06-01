import { CocoResponse, ComponentProperty } from "../types";
import React, { useEffect, useState } from "react";

import { sendMessage } from "../../utils/chatComm";

const request = async (
  channel_id: string,
  inputParams: ComponentProperty[],
  userInput: string,
  setServerReply: (reply: CocoResponse) => void,
  componentName: string,
  source_language_code?: string,
  user_email?: string
) => {
  const r: CocoResponse = await sendMessage({
    channelId: channel_id,
    message: userInput,
    componentName,
    inputParameters: inputParams && inputParams.length > 0 ? inputParams : [],
    source_language_code,
    user_email,
  });
  setServerReply(r);
};

export const useServerReply = (
  channel_id: string,
  inputParams: ComponentProperty[],
  userInput: string,
  componentName: string,
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
      channel_id,
      inputParams,
      userInput,
      setServerReply,
      componentName,
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
      channel_id,
      inputParams,
      userInput,
      setServerReply,
      componentName,
      source_language_code,
      user_email
    );
  }, [channel_id, userInput]);

  return [serverReply, setServerReply, resend];
};
