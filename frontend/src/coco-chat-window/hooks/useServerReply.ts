import React, { useState, useEffect } from "react";
import { ComponentProperty, CocoResponse } from "../types";
import { sendMessage } from "../../utils/chatComm";

const request = async (
  humanIdOrUrl: string,
  inputParams: ComponentProperty[],
  userInput: string,
  setServerReply: (reply: CocoResponse) => void,
  source_language_code?: string
) => {
  const r: CocoResponse = await sendMessage({
    componentIdOrUrl: humanIdOrUrl,
    message: userInput,
    inputParameters: inputParams && inputParams.length > 0 ? inputParams : [],
    source_language_code,
  });
  setServerReply(r);
};

export const useServerReply = (
  humanIdOrUrl: string,
  inputParams: ComponentProperty[],
  userInput: string,
  source_language_code?: string
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
      source_language_code
    );
  }, [humanIdOrUrl, userInput]);

  return [serverReply, setServerReply];
};
