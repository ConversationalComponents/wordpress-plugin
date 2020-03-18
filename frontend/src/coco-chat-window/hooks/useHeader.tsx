import React, { useState, useEffect } from "react";
import { HeaderParams } from "@conversationalcomponents/chat-window/types";
import { CoCoHeader, CoCoHeaderParams } from "./../header/CoCoHeader";

export function useHeader(p: HeaderParams & CoCoHeaderParams) {
  const [header, setHeader] = useState(<CoCoHeader {...p} />);

  useEffect(() => {
    setHeader(<CoCoHeader {...p} />);
  }, [p.title, p.state, p.closeChat, p.height]);

  return header;
}
