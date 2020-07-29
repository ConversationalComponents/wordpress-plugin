import React, { useState, useEffect } from "react";
import { ComponentProperty, CocoResponse } from "../types";
import { sendMessage } from "../../utils/chatComm";

const request = async (
  humanIdOrUrl: string,
  inputParams: ComponentProperty[],
  userInput: string,
  setServerReply: (reply: CocoResponse) => void,
  componentName: string,
  source_language_code?: string,
  user_email?: string
) => {
  const r: CocoResponse = await sendMessage({
    componentIdOrUrl: humanIdOrUrl,
    message: userInput,
    componentName,
    inputParameters: inputParams && inputParams.length > 0 ? inputParams : [],
    source_language_code,
    user_email,
  });
  setServerReply(r);
};

export const useServerReply = (
  humanIdOrUrl: string,
  inputParams: ComponentProperty[],
  userInput: string,
  componentName: string,
  source_language_code?: string,
  user_email?: string
): [
  CocoResponse | undefined,
  React.Dispatch<React.SetStateAction<CocoResponse | undefined>>
] => {
  const [serverReply, setServerReply] = useState<CocoResponse>();

  useEffect(() => {
    if (!userInput) {
      setServerReply(undefined);
      return;
    }
    request(
      humanIdOrUrl,
      inputParams,
      userInput,
      setServerReply,
      componentName,
      source_language_code,
      user_email
    );
  }, [humanIdOrUrl, userInput]);

  return [serverReply, setServerReply];
};
