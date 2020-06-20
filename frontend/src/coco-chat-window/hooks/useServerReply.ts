import React, { useState, useEffect } from "react";
import { ComponentProperty, CocoResponse } from "../types";
import { sendMessage } from "../../utils/chatComm";

const request = async (
  humanIdOrUrl: string,
  inputParams: ComponentProperty[],
  userInput: string,
  setServerReply: (reply: CocoResponse) => void
) => {
  const r: CocoResponse = await sendMessage(
    humanIdOrUrl,
    userInput,
    inputParams && inputParams.length > 0 ? inputParams : []
  );
  setServerReply(r);
};

export const useServerReply = (
  humanIdOrUrl: string,
  inputParams: ComponentProperty[],
  userInput: string
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
    request(humanIdOrUrl, inputParams, userInput, setServerReply);
  }, [humanIdOrUrl, userInput]);

  return [serverReply, setServerReply];
};
